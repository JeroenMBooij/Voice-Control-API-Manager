import { Order } from "../contract-models/order";
import { EndpointDo } from "./endpoint.do";


export class OrderDo 
{
    private _order: Order;

    public constructor(order: Order)
    {
        this._order = order;
        this.action = new EndpointDo(order.action);
    }

    public _id: number;

    public get command(): string
    {
        return this._order.command;
    }

    public action: EndpointDo;
    
}