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
    SuccessResponse
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
    @Post('register')
    @SuccessResponse('201', 'Created')
    public async RegisterAdmin(@Body() user: UserMap): Promise<string> 
    {
        return await AuthenticationService.getInstance().registerAdmin(user);
    }

    @Post('login')
    public async LoginAdmin(@Body() credentials: Credentials): Promise<string> 
    {
        return await AuthenticationService.getInstance().login(credentials);
    }

    @Get('users/start/{startIndex}/end/{endIndex}')
    @Security(AppUser.JWT_SECURITY, [AppUser.ADMIN_ROLE])
    public async GetPaginatedUsers(@Request() request: express.Request, startIndex?: number, endIndex?: number): Promise<PaginatedUsers>
    {
        const applicationUser = (request as any).applicationUser as ApplicationUser;
        return AuthenticationService.getInstance().GetPaginatedUsersByAdmin(applicationUser, startIndex, endIndex);
    }

    @Security(AppUser.JWT_SECURITY, [AppUser.ADMIN_ROLE, AppUser.USER_ROLE])
    @Get('{adminId}/orders/{orderId}/header/{headerKey}')
    public async GetAdminOrderHeaderValue(adminId: number, orderId: number, headerKey: string): Promise<string>
    {
        return await OrderService.getInstance().GetAdminOrderHeaderValue(adminId, orderId, headerKey);
    }

    
    
}