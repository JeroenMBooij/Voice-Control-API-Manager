import { Schema } from 'mongoose';
import { prop, getModelForClass, modelOptions, Severity } from '@typegoose/typegoose';
import { Header } from './header.model';
import { Parameter } from './parameter.model';

@modelOptions({ options: { allowMixed: Severity.ALLOW } })
export class Endpoint 
{
    @prop({ type: () => String, required: true })
    public host!: string;

    @prop({ type: () => String, required: true })
    public method!: string;

    @prop({ type: () => String })
    public requestLine?: string;

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
            let queryString = this.requestLine;
            this.queryParameters.forEach((parameter: Parameter) =>
            {
                queryString = queryString.replace(parameter.key, parameter.value);
            });
            
            return queryString;
        }

        return this.requestLine;
    }
}
