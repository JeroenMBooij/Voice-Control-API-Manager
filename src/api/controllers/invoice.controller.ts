import 
{
    Request,
    Controller,
    Route,
    Tags,
    Post,
    Body,
    Security,
    Get
} from "tsoa";
import * as express from "express";
import * as AppUser from "../../common/constants/user.constants";
import { InvoiceMap } from "../../models/maps/invoice.map";
import { ApplicationUser } from "../../models/user.model";
import { InvoiceService } from "../../services/invoice.service";
import { PaginatedOrders } from "../../models/order-pagination.model";

@Tags("Invoices")
@Security(AppUser.JWT_SECURITY, [AppUser.ADMIN_ROLE])
@Route("invoices")
export class InvoiceController extends Controller 
{
    @Post('purchase')
    @Security(AppUser.JWT_SECURITY, [AppUser.USER_ROLE])
    public async PurchaseOrder(@Request() request: express.Request, @Body() invoicemap: InvoiceMap): Promise<void> 
    {
        const applicationUser = (request as any).applicationUser as ApplicationUser;

        await InvoiceService.getInstance().PurchaseOrder(applicationUser, invoicemap);
    }

    @Get('start/{startIndex}/end/{endIndex}')
    @Security(AppUser.JWT_SECURITY, [AppUser.USER_ROLE])
    public async GetInvoices(@Request() request: express.Request, startIndex: number = 0, endIndex = 49): Promise<PaginatedOrders> 
    {
        const applicationUser = (request as any).applicationUser as ApplicationUser;

        return await InvoiceService.getInstance().GetInvoices(applicationUser, startIndex, endIndex);
    }

    @Get('users/start/{startIndex}/end/{endIndex}')
    @Security(AppUser.JWT_SECURITY, [AppUser.USER_ROLE])
    public async GetMyUsersInvoices(@Request() request: express.Request, startIndex: number = 0, endIndex = 49): Promise<PaginatedOrders> 
    {
        const applicationUser = (request as any).applicationUser as ApplicationUser;

        return await InvoiceService.getInstance().GetMyUserInvoices(applicationUser, startIndex, endIndex);
    }

    @Get('{invoiceId}')
    @Security(AppUser.JWT_SECURITY, [AppUser.USER_ROLE])
    public async GetInvoice(@Request() request: express.Request, invoiceId: number): Promise<InvoiceMap> 
    {
        const applicationUser = (request as any).applicationUser as ApplicationUser;

        return await InvoiceService.getInstance().GetInvoice(applicationUser, invoiceId);
    }
}