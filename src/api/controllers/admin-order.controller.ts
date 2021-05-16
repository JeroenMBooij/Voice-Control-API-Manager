import 
{
    Request,
    Controller,
    Route,
    Tags,
    Post,
    Put,
    Delete,
    Body,
    SuccessResponse,
    Security
} from "tsoa";
import * as express from "express";
import * as AppUser from "../../common/constants/user.constants";
import { AdminOrderService } from "../../services/admin-order.service";
import { OrderMap } from "../../models/maps/order.map";
import { ApplicationUser } from "../../models/user.model";
import { OrderResult } from "../../models/order-result.model";

@Tags("Admin Commands")
@Security(AppUser.JWT_SECURITY, [AppUser.ADMIN_ROLE])
@Route("admin/commands")
export class AdminOrderController extends Controller 
{

    @Post('create')
    @SuccessResponse('201', 'Created')
    public async CreateCommand(@Request() request: express.Request, @Body() ordermap: OrderMap): Promise<OrderResult> 
    {
        const applicationUser = (request as any).applicationUser as ApplicationUser;

        let challengeResult = await AdminOrderService.getInstance().createOrder(applicationUser, ordermap);

        this.setStatus(201);

        return challengeResult;
    }

    @Put('update/{orderId}')
    public async UpdateCommand(@Request() request: express.Request, orderId: String, @Body() ordermap: OrderMap): Promise<void> 
    {
        const applicationUser = (request as any).applicationUser as ApplicationUser;

        await AdminOrderService.getInstance().UpdateOrder(applicationUser, orderId, ordermap);
    }

    @Delete('delete/{orderId}')
    public async DeleteCommand(@Request() request: express.Request, orderId: String): Promise<void> 
    {
        const applicationUser = (request as any).applicationUser as ApplicationUser;
        
        await AdminOrderService.getInstance().deleteOrder(applicationUser, orderId)
    }


}