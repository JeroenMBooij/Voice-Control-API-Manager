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
    Delete, 
    Put,
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
import { } from "../../common/constants/http-methods.constants";

@Tags("Admin")
@Route("admin")
export class AdminAccountController extends Controller 
{
    /**
     * <b>stores user information about the admin in our database</b>
     * @summary create an admin account
     */
    @Post()
    @SuccessResponse('201', 'Returns a Jwt Token')
    public async RegisterAdmin(@Body() user: UserMap): Promise<string> 
    {
        let token = await AuthenticationService.getInstance().registerAdmin(user);
        this.setStatus(201);

        return token;
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
     * <b>stores user information about the admin in our database</b>
     * @summary update an admin account
     */
    @Put('{adminId}')
    @Security(AppUser.JWT_SECURITY, [AppUser.ADMIN_ROLE])
    @SuccessResponse('204', 'The admin will have the updated values in our database')
    public async UpdateAdmin(@Request() request: express.Request, @Body() user: UserMap, adminId: number): Promise<void> 
    {
        const applicationUser = (request as any).applicationUser as ApplicationUser;
        await AuthenticationService.getInstance().updateAdmin(applicationUser, adminId, user);

        this.setStatus(204);
    }

    /**
    * <b>The admin will be deleted from our database</b>
    * <b>The users belonging to the admin will have to register under a new admin to continue using this API</b>
    * @summary delete an admin account
    */
    @Delete('{adminId}')
    @Security(AppUser.JWT_SECURITY, [AppUser.ADMIN_ROLE])
    @SuccessResponse('204', 'The admin is deleted from our database')
    public async DeleteAdmin(@Request() request: express.Request, @Body() user: UserMap, adminId: number): Promise<void> 
    {
        const applicationUser = (request as any).applicationUser as ApplicationUser;

        await AuthenticationService.getInstance().deleteUser(applicationUser, adminId);

        this.setStatus(204);
    }

    /**
     * <b> Get a list of users registered under your admin token</b>
     * * @summary SaaS users
     */
    @Get('users/start/{startIndex}/end/{endIndex}')
    @Security(AppUser.JWT_SECURITY, [AppUser.ADMIN_ROLE])
    public async GetPaginatedUsers(@Request() request: express.Request, startIndex?: number, endIndex?: number): Promise<PaginatedUsers>
    {
        const applicationUser = (request as any).applicationUser as ApplicationUser;
        return AuthenticationService.getInstance().GetPaginatedUsersByAdmin(applicationUser, startIndex, endIndex);
    }



    
    
}