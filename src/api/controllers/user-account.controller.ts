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
    Request
} from "tsoa";
import { ApplicationUser } from "../../models/contract-models/user";

@Tags("User")
@Route("user")
export class UserAccountController extends Controller 
{

    @Post('register')
    public async RegisterUser(@Body() user: ApplicationUser): Promise<string> 
    {
        //let adminJwt = this.getHeader("x-voice-admin-accesstoken");

        return "jwt";
    }

    
    
}