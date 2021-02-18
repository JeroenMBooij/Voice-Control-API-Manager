import { Header } from "./header";
import { Parameter } from "./parameter";

export class Endpoint 
{
    public host: string;

    public method: string;

    public requestLine: string;

    public queryParameters?: Parameter[];

    public headers?: Header[];

    public body?: any;

    public secured?: boolean;

    public authenticationHeader?: string;
    
    public authenticationAction?: Endpoint;
}