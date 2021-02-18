import { Endpoint } from "../contract-models/endpoint";
import { Header } from "../contract-models/header";
import { Parameter } from "../contract-models/parameter";

export class EndpointDo
{
    private _endPoint: Endpoint;

    public constructor(endpoint: Endpoint)
    {
        this._endPoint = endpoint;
    }

    public get host(): string
    {
        return this._endPoint.host;
    }

    public get method(): string
    {
        return this._endPoint.method;
    }

    public get requestLine(): string
    {
        return this._endPoint.requestLine;
    }

    public get queryParameters(): Parameter[]
    {
        return this._endPoint.queryParameters;
    }

    public get headers(): Header[]
    {
        return this._endPoint.headers;
    }

    get body(): object
    {
        return this._endPoint.body;
    }

    public get secured(): boolean
    {
        return this._endPoint.secured;
    }

    public get authenticationHeader(): string
    {
        return this._endPoint.authenticationHeader;
    }

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

                queryString += `${parameter.property}=${parameter.value}`;
                count++;
            });
            return `${this.url}?${queryString}`;
        }

        return this.url;
    }

}