import { prop, getModelForClass, modelOptions, Severity } from '@typegoose/typegoose';
import { Schema } from 'mongoose';
import { Header } from './header.model';
import { Parameter } from './parameter.model';

@modelOptions({ options: { allowMixed: Severity.ALLOW } })
export class AuthenticationEndpoint 
{
    @prop({ type: () => String, required: true })
    public host!: string;

    @prop({ type: () => String, required: true })
    public method!: string;

    @prop({ type: () => String, required: true })
    public requestLine!: string;

    @prop({ type: () => Parameter })
    public queryParameters?: Parameter[];

    @prop({ type: () => Header })
    public headers?: Header[];

    @prop({ type: () => Schema.Types.Mixed })
    public body?: {};

    public get url(): string
    {
        return `${this.host}${this.requestLine}`;
    }

    public get urlWithQueryString(): string
    {
        if(this.queryParameters !== undefined)
        {
            let queryString: string;
            let count: number = 0;
            this.queryParameters.forEach((parameter: Parameter) =>
            {
                if(count > 0)
                {
                    queryString += "&"
                }

                queryString += `${parameter.key}=${parameter.value}`;
                count++;
            });
            return `${this.url}?${queryString}`;
        }

        return this.url;
    }
    
}

export default getModelForClass(AuthenticationEndpoint);