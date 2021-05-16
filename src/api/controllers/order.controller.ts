import 
{
    Controller,
    Get,
    Route,
    Tags,
    Post,
    Request,
    Security
} from "tsoa";
import * as express from "express";
import multer from "multer";
import { OrderService } from "../../services/order.service";
import * as AppUser from "../../common/constants/user.constants";
import { OrderMap } from "../../models/maps/order.map";
import { PaginatedOrders } from "../../models/order-pagination.model";
import { ApplicationUser } from "../../models/user.model";

@Tags("Orders")
@Route("orders")
export class OrderController extends Controller 
{
    @Security(AppUser.JWT_SECURITY, [AppUser.ADMIN_ROLE, AppUser.USER_ROLE])
    @Post('execute-voice-command')
    public async ExecuteCommand(@Request() request: express.Request): Promise<any> 
    {
        try
        {
            await this.handleFile(request, "voiceCommand");
        }
        catch(error: any)
        {
            throw new Error(error);
        }

        const applicationUser = (request as any).applicationUser as ApplicationUser;

        return await OrderService.getInstance().executeOrder(applicationUser, (request as any).file);
    }

    @Security(AppUser.JWT_SECURITY, [AppUser.ADMIN_ROLE, AppUser.USER_ROLE])
    @Get('start/{startIndex}/end/{endIndex}')
    public async GetOrders(@Request() request: express.Request, startIndex: number, endIndex: number): Promise<PaginatedOrders>
    {
        const applicationUser = (request as any).applicationUser as ApplicationUser;

        return await OrderService.getInstance().getOrders(applicationUser, startIndex, endIndex);
    }

    @Security(AppUser.JWT_SECURITY, [AppUser.ADMIN_ROLE, AppUser.USER_ROLE])
    @Get('{orderId}')
    public async GetOrder(@Request() request: express.Request, orderId: String): Promise<OrderMap> 
    {
        const applicationUser = (request as any).applicationUser as ApplicationUser;

        return await OrderService.getInstance().getOrder(applicationUser, orderId);
    }


    private handleFile(request: express.Request, fileName: string): Promise<any> 
    {
        const multerSingle = multer().single(fileName);
        return new Promise((resolve, reject) => {
            multerSingle(request, undefined, async (error) =>
                {
                    if (error)
                    {
                        reject(error);
                    }
                    resolve("File will be in request.file, it is a buffer");
                });
        });
    }

    
    
}