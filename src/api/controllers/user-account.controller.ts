import 
{
    Request,
    Controller,
    Route,
    Tags,
    Post,
    Body,
    Security
} from "tsoa";
import * as express from 'express';
import { UserMap } from "../../models/maps/user.map";
import { AuthenticationService } from "../../services/authentication.service";
import * as AppUser from "../../common/constants/user.constants";
import { Credentials } from "../../models/credentials.model";

@Tags("User")
@Route("user")
export class UserAccountController extends Controller 
{
    /**
     * @summary jwt
     */
    @Post('login')
    public async LoginAdmin(@Body() credentials: Credentials): Promise<string> 
    {
        return await AuthenticationService.getInstance().login(credentials);
    }
    
    /**
     * <b>Creates an account attached to an admin and stores the user information in our database</b>
     * @summary create an user account
     */
    @Security(AppUser.JWT_SECURITY, [AppUser.ADMIN_ROLE])
    @Post('register')
    public async RegisterUser(@Request() request: express.Request, @Body() usermap: UserMap): Promise<string> 
    {
        const adminToken = request.headers["x-access-token"] as string;
        
        let userToken = await AuthenticationService.getInstance().registerUser(adminToken, usermap);
        return userToken;
    }

    
    
}