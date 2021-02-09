import {
    Controller,
    Get,
    Route,
    Tags,
    Post,
    Patch,
    Delete,
    Body
} from "tsoa";

import { TestService } from "../../services/test.service";

@Tags("Test")
@Route("test")
export class TestController extends Controller 
{

    @Get('bronze')
    public async getBrons(): Promise<void> 
    {
        TestService.getInstance().week1Bronze();
    }

    @Get('silver')
    public async getSilver(): Promise<string> 
    {
        return TestService.getInstance().week1Silver();
    }

    @Get('gold')
    public async getGold(): Promise<string> 
    {
        return "This is a success!";
    }

    @Get('platinum')
    public async getPlatinum(): Promise<string> 
    {
        return "This is a great success!";
    }
}