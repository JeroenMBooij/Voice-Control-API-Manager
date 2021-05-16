import { Endpoint } from "../endpoint.model";

export class OrderMap
{
    public _id?: number;

    public adminId?: number;

    public price!: number;

    public command!: string;

    public  action!: Endpoint;
    
}