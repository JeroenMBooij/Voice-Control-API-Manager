import { OrderValidator } from "../validators/order.validator";
import * as speechSdk from "microsoft-cognitiveservices-speech-sdk";
import config from '../api/build/config';
import { Order, OrderModel } from "../models/order.model";
import { ApplicationUser } from "../models/user.model";
import { ApiError } from "../common/extensions/error.extention";
import { OrderMap } from "../models/maps/order.map";
import { MapperService } from "./mapper.service";
import { PaginatedOrders } from "../models/order-pagination.model";
import { Invoice, InvoiceModel } from "../models/Invoice.model";
import * as AppUser from "../common/constants/user.constants";
import { Parameter } from "../models/parameter.model";
import { ExecutionResult } from "../models/execution-result.model";
import { exception } from "console";
import { Endpoint } from "../models/endpoint.model";


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
            OrderService.instance.speechConfig = speechSdk.SpeechConfig.fromSubscription(process.env.MsSpeechKey, process.env.MsSpeechLocation);
        }
        return OrderService.instance;
    }

    public async executeOrder(user: ApplicationUser, file: any) : Promise<ExecutionResult>
    {
        OrderValidator.getInstance().validateFile(file);
        
        this.speechConfig.speechRecognitionLanguage = user.language;
        let command: string = (await this.speechToText(file.buffer.slice(0))).replace(".", "");
        
        
        let orders: Order[] = new Array();
        let invoices: Invoice[] = new Array();
        if(user.role === AppUser.ADMIN_ROLE)
        {
            let garbageOrders = await OrderModel.find({adminId: user._id });
            garbageOrders.forEach(item => {
                orders.push(new OrderModel(item));
            });
        }
        else
        {
            let garbage = await InvoiceModel.find({_id: { $in: user.invoiceIds } });
            garbage.forEach(item => {
                invoices.push(new InvoiceModel(item));
            });
            
            let garbageOrders = await OrderModel.find({_id: { $in: invoices.map(s => s.orderId) } });
            garbageOrders.forEach(item => {
                orders.push(new OrderModel(item));
            });
            
        }

        let order = this.findOrderByCommand(command, orders);

        if(order === undefined)
        {
            throw new ApiError(400, `No purchased order found for the command: ${command}`);
        }

        
        this.setOrderQueryParameters(order, command);

        let invoice = invoices.find(s => s.orderId === order._id);
        if(invoice !== undefined)
        {
            if(invoice.callsLeft === 0)
            {
                throw new ApiError(400, `No more calls left for ${command}`);
            }

            invoice.callsLeft--; 
        }
        let result: any = await OrderValidator.getInstance().challengeEndpoint(order.action);

        let executionResult = new ExecutionResult();
        executionResult.orderId = order._id;
        executionResult.interpertation = command;
        executionResult.challenge = result;

        return executionResult;
    }
    
    public async getOrders(user: ApplicationUser, startIndex: number = 0, endIndex: number = 49): Promise<PaginatedOrders>
    {
        let orders: Order[] = new Array();
        let garbage = await OrderModel.find({ adminId: user.adminId });
        garbage.forEach(item => {
            orders.push(new OrderModel(item));
        });

        let pagOrders = new PaginatedOrders();
        pagOrders.total = orders.length;

        orders = orders.slice(startIndex, endIndex + 1);
        
        pagOrders.orders = MapperService.getInstance().orderArrayToOrderMapArray(orders);

        return pagOrders;
    }

    public async getOrder(user: ApplicationUser, orderId: String): Promise<OrderMap>
    {
        let order: Order = await OrderModel.findOne({_id: orderId, adminId: user.adminId });

        if(order == null)
        {
            throw new ApiError(400, "Invalid OrderId provided.");
        }

        return MapperService.getInstance().orderToOrderMap(order);
    }

    public async getOrderAction(user: ApplicationUser, orderId: String): Promise<Endpoint>
    {
        let orderMap = await this.getOrder(user, orderId);

        return orderMap.action;
    }

    public async GetAdminOrderHeaderValue(adminId: number, orderId: number, headerKey: string): Promise<string>
    {
        let order: Order = await OrderModel.findOne({_id: orderId, adminId: adminId });

        if(order === undefined)
        {
            throw new ApiError(400, "Invalid OrderId and or adminId provided.");
        }

        let headerValue = order.action.headers.find(header => header.key == headerKey).value;

        if(headerValue == null)
        {
            throw new ApiError(400, "Invalid header key provided");
        }

        return headerValue;
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
                        resolve(result.text.toLowerCase());
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
    
    private findOrderByCommand(command: string, orders: Order[]): Order
    {
        let commandOrder: Order;
        orders.forEach(order => {
            let currentCommandArray = command.split(' ');

            order.parameterLocations.forEach(index => {
                currentCommandArray.splice(index, 1);
            });

            let uniqueCommand: string = currentCommandArray.join(' ');

            if(JSON.stringify(order.uniqueCommand) === JSON.stringify(uniqueCommand))
            {
                commandOrder = order;
            }
        });

        return commandOrder;
    }
    
    private setOrderQueryParameters(order: Order, command: string): void
    {
        let commandArray = command.split(' ');
        let templateCommand = order.command.split(' ');
        
        order.parameterLocations.forEach(index => {
            let key = templateCommand[index].replace("{", "").replace("}", "");
            let value = commandArray[index];

            let parameter = order.action.queryParameters.find(parameter => parameter.key == key);
            if(parameter != null)
                parameter.value = value;
        });
        
    }



}