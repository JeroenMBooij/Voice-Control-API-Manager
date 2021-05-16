import { InvoiceMap } from "./maps/invoice.map";

export class PaginatedInvoices
{
    public total!: number;

    public invoices?: InvoiceMap[];
}