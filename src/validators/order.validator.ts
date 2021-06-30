import axios, { AxiosInstance } from "axios";
import * as httpMethods from "../common/constants/http-methods.constants";
import { Endpoint } from "../models/endpoint.model";
import { Parameter } from "../models/parameter.model";

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
            case "audio/wave":
                return;

            default:
                throw new Error(`${file.mimetype} is not a supported file format.`);
        }
    }

    public validateCommandQueryParameters(commandParameters: RegExpMatchArray, queryParameters: Parameter[])
    {
        let queryParameterKeys = new Array();
        queryParameters.forEach((parameter: Parameter) => 
        {
            queryParameterKeys.push(`{${parameter.key}}`);
        });

        commandParameters.forEach((commandParameter: string) => {
            if(!queryParameterKeys.includes(commandParameter))
            {
                throw new Error(`There is no parameter defined for ${commandParameter}`);
            }
        });
    }

    public validateCommandToBody(isJson: boolean, commandParameters: RegExpMatchArray, body: any)
    {
        let bodyParameters: string[] = new Array();
        if(isJson)
            this.traverseBody(body, bodyParameters);
        else
        {
            bodyParameters = body.match(/{.*?}/g);
        }

        commandParameters.forEach((commandParameter: string) => {
            if(!bodyParameters.includes(commandParameter))
                throw new Error(`${commandParameter} is missing from Request Body`);
            
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

   
    public async challengeEndpoint(action: Endpoint): Promise<any>
    {
        let client: AxiosInstance = axios.create({
            baseURL: action.host
        });

        action.headers?.forEach((header) => {
            client.defaults.headers.common[header.key] = header.value;
        })

        let result: any;
        try{
            switch(action.method.toUpperCase())
            {
                case httpMethods.GET:
                    result = await client.get(this.queryString(action));
                    break;
                
                case httpMethods.POST:
                    result = await client.post(action.requestLine, this.bodyBuilder(action));
                    break;
                
                case httpMethods.PUT:
                    result = await client.put(action.requestLine, this.bodyBuilder(action));
                    break;

                case httpMethods.PATCH:
                    result = await client.patch(action.requestLine, this.bodyBuilder(action));
                    break;
                
                case httpMethods.DELETE:
                    result = await client.delete(this.queryString(action));
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

    private queryString(action: Endpoint): string
    {
        if(action.queryParameters !== undefined)
        {
            let queryString = action.requestLine;
            action.queryParameters.forEach((parameter: Parameter) =>
            {
                let test = `{${parameter.key}}`;
                queryString = queryString.replace(test, parameter.value);
            });

            return queryString;
        }

        return action.requestLine;
    }

    private bodyBuilder(action: Endpoint): any
    {
        let body = action.body;
        if(action.headers.filter(s => s.value == "application/x-www-form-urlencoded").length > 0) {
            action.queryParameters.forEach((parameter: Parameter) =>
            {
                let test = `{${parameter.key}}`;
                body = (body as string).replace(test, parameter.value.replace(' ', "%2C%20"));
            });
        }
        else
        {
            Object.keys(action.body).forEach((key) => {
                let keyDescription = action.body[key];

                let value = action.queryParameters.filter(s => s.key == keyDescription)[0];

                if(value)
                    body[key] = value;
            });
        }

        
        return body;
    }

    
}