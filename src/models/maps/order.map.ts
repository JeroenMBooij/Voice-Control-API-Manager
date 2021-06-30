import { Endpoint } from "../endpoint.model";
import { EndpointMap } from "./endpoint.map";

export class OrderMap
{
    public _id?: number;

    public adminId?: number;

    public command!: string;

    public  action!: EndpointMap;
    
}