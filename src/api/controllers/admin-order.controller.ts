import 
{
    Controller,
    Get,
    Route,
    Tags,
    Post,
    Patch,
    Delete,
    Body,
    Request,
    SuccessResponse
} from "tsoa";
import * as express from "express";
import * as multer from "multer";

import { AdminOrderService } from "../../services/admin-order.service";
import { Order } from "../../models/contract-models/order";
import { OrderDo } from "../../models/domain-objects/order.do";

@Tags("Admin Commands")
@Route("admin/commands")
export class AdminOrderController extends Controller 
{

    @Post('create')
    @SuccessResponse('201', 'Created')
    public async CreateCommand(@Body() order: Order): Promise<any> 
    {
        let challengeResult = AdminOrderService.getInstance().createOrder(new OrderDo(order));

        this.setStatus(201);

        return challengeResult;
    }

    @Patch('update/{orderId}')
    public async UpdateCommand(orderId: number, @Body() order: Order): Promise<void> 
    {
        
    }

    @Delete('delete/{orderId}')
    public async DeleteCommand(orderId: number): Promise<void> 
    {
        
    }


}