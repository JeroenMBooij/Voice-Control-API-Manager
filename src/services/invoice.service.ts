import { application } from "express";
import { PaginatedInvoices } from "../models/invoice-pagination.model";
import { Invoice, InvoiceModel } from "../models/Invoice.model";
import { InvoiceMap } from "../models/maps/invoice.map";
import { UserMap } from "../models/maps/user.map";
import { ApplicationUser, UserModel } from "../models/user.model";
import { AuthenticationService } from "./authentication.service";
import { MapperService } from "./mapper.service";

export class InvoiceService 
{
    private static instance: InvoiceService;

    private constructor() {}

    public static getInstance(): InvoiceService 
    {
        if (!InvoiceService.instance) 
        {
            InvoiceService.instance = new InvoiceService();
        }

        return InvoiceService.instance;
    }

    public async PurchaseOrder(user: ApplicationUser, invoicemap: InvoiceMap): Promise<void> 
    {
        invoicemap.userId = user._id;

        let invoice = MapperService.getInstance().invoiceMapToInvoice(invoicemap);
        await InvoiceModel.create(invoice);

        await UserModel.update({_id: user._id}, {$inc: { funds: (invoicemap.totalPrice * -1) }})
    }

    public async GetInvoices(applicationUser: ApplicationUser, startIndex: number, endIndex: number): Promise<PaginatedInvoices>
    {
        let invoices: Invoice[] = new Array();
        let garbage = await InvoiceModel.find({ userId: applicationUser._id});
        garbage.forEach(item => {
            invoices.push(new InvoiceModel(item));
        });

        let paginatedInvoices = new PaginatedInvoices();
        paginatedInvoices.total = invoices.length;
        paginatedInvoices.invoices = MapperService.getInstance().invoiceArrayToInvoiceMapArray(invoices.slice(startIndex, endIndex));

        return paginatedInvoices;
    }
    
    public async GetInvoice(applicationUser: ApplicationUser, invoiceId: number): Promise<InvoiceMap>
    {
        let invoice = new InvoiceModel(await InvoiceModel.find({ userId: applicationUser._id, _id: invoiceId}));

        return MapperService.getInstance().invoiceToInvoiceMap(invoice);
    }

    public async GetMyUserInvoices(admin: ApplicationUser, startIndex: number = 0, endIndex: number = 49): Promise<PaginatedInvoices>
    {
        let users: UserMap[] = await AuthenticationService.getInstance().GetUsersByAdmin(admin);

        let invoices: Invoice[] = new Array();
        let garbage = await InvoiceModel.find({ $in: { userId: users.map(s => s._id)} });
        garbage.forEach(item => {
            invoices.push(new InvoiceModel(item));
        });
        
        let paginatedInvoices = new PaginatedInvoices();
        paginatedInvoices.total = invoices.length;
        paginatedInvoices.invoices = MapperService.getInstance().invoiceArrayToInvoiceMapArray(invoices.slice(startIndex, endIndex));

        return paginatedInvoices
    }
    
}