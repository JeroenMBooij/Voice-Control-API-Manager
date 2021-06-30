import { Header } from "../header.model";
import { Parameter } from "../parameter.model";

export class EndpointMap
{
    public host!: string;

    public method!: string;

    public requestLine?: string;

    public queryParameters?: Parameter[];

    public headers?: Header[];

    public body?: any;

}