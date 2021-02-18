import { OrderDo } from "../models/domain-objects/order.do";
import { OrderValidator } from "../validators/order.validator";

export class AdminOrderService 
{

    private static instance: AdminOrderService;

    private constructor() {}

    public static getInstance(): AdminOrderService 
    {
        if (!AdminOrderService.instance) 
        {
            AdminOrderService.instance = new AdminOrderService();
        }
        return AdminOrderService.instance;
    }

    public async createOrder(order: OrderDo) : Promise<any>
    {
        // Business logic validation
        OrderValidator.getInstance().validateCommandParameters(order.command, order.action);
        
        return await OrderValidator.getInstance().challengeEndpoint(order.action);
    }



}