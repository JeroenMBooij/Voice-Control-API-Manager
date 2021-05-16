import { Order, OrderModel } from "../models/order.model";
import { OrderValidator } from "../validators/order.validator";
import { ApplicationUser, UserModel } from "../models/user.model";
import { OrderMap } from "../models/maps/order.map";
import { MapperService } from "./mapper.service";
import { OrderResult } from "../models/order-result.model";

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

    public async createOrder(user: ApplicationUser, ordermap: OrderMap) : Promise<OrderResult>
    {
        ordermap.adminId = user._id;
        let order: Order = MapperService.getInstance().orderMapToOrder(ordermap);
        
        let result: any = await OrderValidator.getInstance().challengeEndpoint(order.action);

        this.assignParameterLocations(order);

        await OrderModel.create(order).then(savedOrder => { order._id = savedOrder._id });
        await UserModel.updateOne({_id: user._id}, {$push: { orders: order._id }})

        let orderResult = new OrderResult();
        orderResult.orderId = order._id;
        orderResult.challenge = result;

        return orderResult;
    }

    public async UpdateOrder(user: ApplicationUser, orderId: String, ordermap: OrderMap): Promise<void>
    {
        let order: Order = MapperService.getInstance().orderMapToOrder(ordermap);

        //TODO test if order does not exist
        await OrderModel.findOneAndUpdate({_id: orderId, adminId: user.adminId }, order);
    }

    public async deleteOrder(user: ApplicationUser, orderId: String): Promise<void>
    {
        //TODO test if order does not exist
        await OrderModel.findOneAndDelete({ _id: orderId, adminId: user.adminId });
    }

    private assignParameterLocations(order: Order): void
    {
        let commandArray: string[] = order.command.split(" ");
        let parameterArray: string[] = commandArray.filter(s => s.match(/{.*?}/g))

        parameterArray.forEach(parameter => {
            let index = commandArray.indexOf(parameter);
            order.parameterLocations.push(index);
        });
    }
}