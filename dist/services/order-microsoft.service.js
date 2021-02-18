"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderMicrosoftService = void 0;
const order_validator_1 = require("../validators/order.validator");
const speechSdk = require("microsoft-cognitiveservices-speech-sdk");
const config_1 = require("../api/build/config");
class OrderMicrosoftService {
    constructor() { }
    static getInstance() {
        if (!OrderMicrosoftService.instance) {
            OrderMicrosoftService.instance = new OrderMicrosoftService();
            OrderMicrosoftService.instance.speechConfig = speechSdk.SpeechConfig.fromSubscription(config_1.default.MsSpeechKey, config_1.default.MsSpeechLocation);
            OrderMicrosoftService.instance.speechConfig.speechRecognitionLanguage = "nl-NL";
        }
        return OrderMicrosoftService.instance;
    }
    async executeOrder(file) {
        order_validator_1.OrderValidator.getInstance().validateFile(file);
        let command;
        try {
            command = await this.speechToText(file.buffer.slice(0));
        }
        catch (error) {
            throw new Error(error);
        }
    }
    async speechToText(arrayBuffer) {
        let pushStream = speechSdk.AudioInputStream.createPushStream();
        pushStream.write(arrayBuffer);
        pushStream.close();
        let audioConfig = speechSdk.AudioConfig.fromStreamInput(pushStream);
        let recognizer = new speechSdk.SpeechRecognizer(this.speechConfig, audioConfig);
        return new Promise((resolve, reject) => {
            recognizer.recognizeOnceAsync(result => {
                switch (result.reason) {
                    case speechSdk.ResultReason.RecognizedSpeech:
                        console.log(`RECOGNIZED: ${result.text}`);
                        resolve(result.text);
                        break;
                    case speechSdk.ResultReason.NoMatch:
                        reject("Speech could not be recognized.");
                    case speechSdk.ResultReason.Canceled:
                        const cancellation = speechSdk.CancellationDetails.fromResult(result);
                        if (cancellation.reason === speechSdk.CancellationReason.Error) {
                            console.log(`CANCELED: ErrorCode=${cancellation.ErrorCode}`);
                            console.log(`CANCELED: ErrorDetails=${cancellation.errorDetails}`);
                            console.log("CANCELED: Did you update the subscription info?");
                        }
                        console.log(`CANCELED: Reason=${cancellation.reason}`);
                        reject("Internal Server error");
                }
            });
        });
    }
}
exports.OrderMicrosoftService = OrderMicrosoftService;
//# sourceMappingURL=order-microsoft.service.js.map