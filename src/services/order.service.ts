import { OrderValidator } from "../validators/order.validator";
import * as speechSdk from "microsoft-cognitiveservices-speech-sdk";
import config from '../api/build/config';

export class OrderService 
{

    private static instance: OrderService;
    private speechConfig: speechSdk.SpeechConfig;

    private constructor() {}

    public static getInstance(): OrderService 
    {
        if (!OrderService.instance) 
        {
            OrderService.instance = new OrderService();
            OrderService.instance.speechConfig = speechSdk.SpeechConfig.fromSubscription(config.MsSpeechKey, config.MsSpeechLocation);
            OrderService.instance.speechConfig.speechRecognitionLanguage = "nl-NL";
        }
        return OrderService.instance;
    }

    public async executeOrder(file: any) : Promise<any>
    {
        OrderValidator.getInstance().validateFile(file);

        let command: string;
        try
        {
            command = await this.speechToText(file.buffer.slice(0));
        } 
        catch(error: any)
        {
            throw new Error(error);
        }

    }

    private async speechToText(arrayBuffer: ArrayBuffer): Promise<string>
    {
        let pushStream: speechSdk.PushAudioInputStream = speechSdk.AudioInputStream.createPushStream();
        pushStream.write(arrayBuffer);
        pushStream.close();

        let audioConfig: speechSdk.AudioConfig = speechSdk.AudioConfig.fromStreamInput(pushStream);
        let recognizer: speechSdk.SpeechRecognizer = new speechSdk.SpeechRecognizer(this.speechConfig, audioConfig);
        
        return new Promise((resolve, reject) => {
            recognizer.recognizeOnceAsync(result => {
                switch (result.reason) 
                {
                    case speechSdk.ResultReason.RecognizedSpeech:
                        console.log(`RECOGNIZED: ${result.text}`);
                        resolve(result.text);
                        break;

                    case speechSdk.ResultReason.NoMatch:
                        reject("Speech could not be recognized.");

                    case speechSdk.ResultReason.Canceled:
                        const cancellation = speechSdk.CancellationDetails.fromResult(result);
                
                        if (cancellation.reason === speechSdk.CancellationReason.Error) 
                        {
                            console.log(`CANCELED: ErrorCode=${cancellation.ErrorCode}`);
                            console.log(`CANCELED: ErrorDetails=${cancellation.errorDetails}`);
                            console.log("CANCELED: Did you update the subscription info?");
                        }
                        console.log(`CANCELED: Reason=${cancellation.reason}`)
                        reject("Internal Server error");
                }
            });
        });
    }



}