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
    Security,
    Get
} from "tsoa";
import * as express from "express";
import * as AppUser from "../../common/constants/user.constants";
import { ApplicationUser } from "../../models/user.model";
import { FundsService } from "../../services/funds.service";
import { Balance } from "../../models/balance.model";

@Tags("Funds")
@Security(AppUser.JWT_SECURITY, [AppUser.ADMIN_ROLE])
@Route("funds")
export class FundsController extends Controller 
{
    @Post('deposit')
    @Security(AppUser.JWT_SECURITY, [AppUser.ADMIN_ROLE, AppUser.USER_ROLE])
    public async Deposit(@Request() request: express.Request, @Body() deposit: Balance): Promise<any> 
    {
        const applicationUser = (request as any).applicationUser as ApplicationUser;

        await FundsService.getInstance().deposit(applicationUser, deposit.value);
    }

    @Get('balance')
    @Security(AppUser.JWT_SECURITY, [AppUser.ADMIN_ROLE, AppUser.USER_ROLE])
    public GetBalance(@Request() request: express.Request): number 
    {
        const applicationUser = (request as any).applicationUser as ApplicationUser;

        return applicationUser.funds;
    }

}

