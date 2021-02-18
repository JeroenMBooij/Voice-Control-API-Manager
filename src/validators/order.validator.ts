import { Parameter } from "../models/contract-models/parameter";
import axios, { AxiosInstance } from "axios";
import * as httpMethods from "../common/constants/http-methods";
import { EndpointDo } from "../models/domain-objects/endpoint.do";

export class OrderValidator 
{
    private static instance: OrderValidator;

    private constructor() {}

    public static getInstance(): OrderValidator 
    {
        if (!OrderValidator.instance) 
        {
            OrderValidator.instance = new OrderValidator();
        }
        return OrderValidator.instance;
    }

    public validateFile(file: any): void
    {
        switch(file.mimetype)
        {
            case "audio/wav":
                return;

            default:
                throw new Error(`${file.mimetype} is not a supported file format.`);
        }
    }

    public validateCommandParameters(command: string, action: EndpointDo): void
    {
        let commandParameters: RegExpMatchArray | null = command.match(/{.*}/g);

        //no validation required for commands without parameters
        if(commandParameters === null)
        {
            return;
        }

        if(action.queryParameters !== undefined)
        {
            this.validateCommandQueryParameters(commandParameters, action.queryParameters);
            return;
        }

        this.validateBody(commandParameters, action.body);
        
    }

    private validateCommandQueryParameters(commandParameters: RegExpMatchArray, queryParameters: Parameter[])
    {
        if(commandParameters.length !== queryParameters.length)
        {
            throw new Error("Command parameters and action parameters count don't match");
        }

        queryParameters.forEach((parameter: Parameter) => 
        {
            if(!commandParameters.includes(parameter.property))
            {
                throw new Error(`There is no command parameter defined for ${parameter.property}`);
            }
        });
    }

    private validateBody(commandParameters: RegExpMatchArray, body: object)
    {
        let bodyParameters: string[] = new Array();
        this.traverseBody(body, bodyParameters);

        commandParameters.forEach((commandParameter: string) =>
        {
            if(!bodyParameters.includes(commandParameter))
            {
                throw new Error(`${commandParameter} is missing from Request Body`);
            }
        });
    }
    
    private traverseBody(parameter: object, parameters: string[])
    {
        for(let key in parameter) {
            parameters.push(key);
            let value = parameter[key];
            if(typeof value === 'object' && value !== null)
            {
                this.traverseBody(value, parameters);
            }
        }
    }

   
    public async challengeEndpoint(action: EndpointDo): Promise<any>
    {
        let client: AxiosInstance = axios.create({
            baseURL: action.host,
            headers: action.headers
        });

        let result: any;
        try{
            switch(action.method.toUpperCase())
            {
                case httpMethods.GET:
                    result = await client.get(action.urlWithQueryString);
                    break;
                
                case httpMethods.POST:
                    result = await client.post(action.url, action.body);
                    break;
                
                case httpMethods.PUT:
                    result = await client.put(action.url, action.body);
                    break;

                case httpMethods.PATCH:
                    result = await client.patch(action.url, action.body);
                    break;
                
                case httpMethods.DELETE:
                    result = await client.delete(action.urlWithQueryString);
                    break;
                
                default:
                    throw new Error("Invalid Endpoint method provided.");
            }
        }
        catch(error: any)
        {
            throw new Error(`Challenging the provided endpoint failed: ${error}`);
        }

        return result.data ?? result;
    }

    
}