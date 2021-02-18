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

@Tags("Admin")
@Route("admin")
export class AdminAccountController extends Controller 
{

    @Post('register')
    public async RegisterAdmin(@Body() user: ApplicationUser): Promise<string> 
    {
        
        return "jwt";
    }

    
    
}