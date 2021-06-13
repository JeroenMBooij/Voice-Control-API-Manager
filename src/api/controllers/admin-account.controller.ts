import 
{
    Request,
    Controller,
    Route,
    Tags,
    Post,
    Body,
    Security,
    Get,
    SuccessResponse,
    Response
} from "tsoa";
import * as express from "express";
import { Credentials } from "../../models/credentials.model";
import { UserMap } from "../../models/maps/user.map";
import { AuthenticationService } from "../../services/authentication.service";
import * as AppUser from "../../common/constants/user.constants";
import { OrderService } from "../../services/order.service";
import { PaginatedUsers } from "../../models/user-pagination.model";
import { ApplicationUser } from "../../models/user.model";

@Tags("Admin")
@Route("admins")
export class AdminAccountController extends Controller 
{
    /**
     * <b>stores user information about the admin in our database</b>
     * @summary create an admin account
     */
    @Post('register')
    @SuccessResponse('201', 'Returns a Jwt Token')
    public async RegisterAdmin(@Body() user: UserMap): Promise<string> 
    {
        return await AuthenticationService.getInstance().registerAdmin(user);
    }

    /**
     * @summary jwt
     */
    @Post('login')
    @SuccessResponse('200', 'Returns a Jwt Token')
    public async LoginAdmin(@Body() credentials: Credentials): Promise<string> 
    {
        return await AuthenticationService.getInstance().login(credentials);
    }

    /**
     * <b> Get a list of users registered under your admin token</b>
     */
    @Get('users/start/{startIndex}/end/{endIndex}')
    @Security(AppUser.JWT_SECURITY, [AppUser.ADMIN_ROLE])
    public async GetPaginatedUsers(@Request() request: express.Request, startIndex?: number, endIndex?: number): Promise<PaginatedUsers>
    {
        const applicationUser = (request as any).applicationUser as ApplicationUser;
        return AuthenticationService.getInstance().GetPaginatedUsersByAdmin(applicationUser, startIndex, endIndex);
    }

    @Get('/get/id')
    @Security(AppUser.JWT_SECURITY, [AppUser.ADMIN_ROLE])
    public async GetAdminId(@Request() request: express.Request): Promise<number>
    {
        const applicationUser = (request as any).applicationUser as ApplicationUser;
        return applicationUser._id;
    }

    /**
     * 
     * @param adminId the id of the admin account you want to follow
     * @param orderId the id of the order you are interested in
     * @param headerKey the request header key of an order
     */
    @Security(AppUser.JWT_SECURITY, [AppUser.ADMIN_ROLE, AppUser.USER_ROLE])
    @Get('{adminId}/orders/{orderId}/header/{headerKey}')
    @SuccessResponse('200', 'The corresponding header value')
    @Response("400", "Validation error")
    public async GetAdminOrderHeaderValue(adminId: number, orderId: number, headerKey: string): Promise<string>
    {
        return await OrderService.getInstance().GetAdminOrderHeaderValue(adminId, orderId, headerKey);
    }

    
    
}