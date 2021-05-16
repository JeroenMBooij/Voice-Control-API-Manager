import { OrderMap } from "./maps/order.map";

export class PaginatedOrders
{
    public total!: number;

    public orders?: OrderMap[];
}