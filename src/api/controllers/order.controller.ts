import 
{
    Controller,
    Get,
    Route,
    Tags,
    Post,
    Request,
    Security,
    UploadedFile
} from "tsoa";
import * as express from "express";
import multer from "multer";
import { OrderService } from "../../services/order.service";
import * as AppUser from "../../common/constants/user.constants";
import { OrderMap } from "../../models/maps/order.map";
import { PaginatedOrders } from "../../models/order-pagination.model";
import { ApplicationUser } from "../../models/user.model";
import { ExecutionResult } from "../../models/execution-result.model";
import { Endpoint } from "../../models/endpoint.model";
import { EndpointMap } from "../../models/maps/endpoint.map";

@Tags("Orders")
@Route("order")
export class OrderController extends Controller 
{
    /**
     *<b>Upload a command as a mono recording formatted to a wav file with 16kHz</br> An HTTP request will be made to the The endpoint corresponding to the command.</b>
     */
    @Security(AppUser.JWT_SECURITY, [AppUser.ADMIN_ROLE, AppUser.USER_ROLE])
    @Post('execute-voice-command')
    public async ExecuteCommand(@Request() request: express.Request, @UploadedFile() voiceCommand: Express.Multer.File): Promise<ExecutionResult> 
    {
        const applicationUser = (request as any).applicationUser as ApplicationUser;

        return await OrderService.getInstance().executeOrder(applicationUser, voiceCommand);
    }

    /**
     * <b>Get all orders created by a specific admin</b>
     */
    @Security(AppUser.JWT_SECURITY, [AppUser.ADMIN_ROLE, AppUser.USER_ROLE])
    @Get('start/{startIndex}/end/{endIndex}')
    public async GetOrders(@Request() request: express.Request, startIndex: number, endIndex: number): Promise<PaginatedOrders>
    {
        const applicationUser = (request as any).applicationUser as ApplicationUser;

        return await OrderService.getInstance().getOrders(applicationUser, startIndex, endIndex);
    }

    /**
     * <b>Get the data of a specific order</b>
     */
    @Security(AppUser.JWT_SECURITY, [AppUser.ADMIN_ROLE, AppUser.USER_ROLE])
    @Get('{orderId}')
    public async GetOrder(@Request() request: express.Request, orderId: String): Promise<OrderMap> 
    {
        const applicationUser = (request as any).applicationUser as ApplicationUser;

        return await OrderService.getInstance().getOrder(applicationUser, orderId);
    }

    /**
     * <b>Get the action of a specific order</b>
     */
     @Security(AppUser.JWT_SECURITY, [AppUser.ADMIN_ROLE, AppUser.USER_ROLE])
     @Get('{orderId}/action')
     public async GetOrderAction(@Request() request: express.Request, orderId: String): Promise<EndpointMap> 
     {
         const applicationUser = (request as any).applicationUser as ApplicationUser;
 
         return await OrderService.getInstance().getOrderAction(applicationUser, orderId);
     }


    private handleFile(request: express.Request, fileName: string): Promise<any> 
    {
        const multerSingle = multer().single(fileName);
        return new Promise((resolve, reject) => {
            multerSingle(request, undefined, async (error) =>
                {
                    if (error)
                        reject(error);

                    resolve("File will be in request.file, it is a buffer");
                });
        });
    }

    
    
}

