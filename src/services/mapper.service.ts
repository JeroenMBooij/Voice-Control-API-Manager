import { Ref } from "@typegoose/typegoose";
import { Invoice } from "../models/Invoice.model";
import { InvoiceMap } from "../models/maps/invoice.map";
import { OrderMap } from "../models/maps/order.map";
import { UserMap } from "../models/maps/user.map";
import { Order, OrderModel } from "../models/order.model";
import { ApplicationUser } from "../models/user.model";

export class MapperService 
{
    private static instance: MapperService;

    private constructor() {}

    public static getInstance(): MapperService 
    {
        if (!MapperService.instance) 
        {
            MapperService.instance = new MapperService();
        }

        return MapperService.instance;
    }

    public async appUserToUserMap(user: ApplicationUser): Promise<UserMap>
    {
        let usermap = new UserMap();
        usermap._id = user._id;
        usermap.adminId = user.adminId;
        usermap.email = user.email;
        usermap.firstname = user.firstname;
        usermap.lastname = user.lastname;
        usermap.password = user.password;

        let orders: Order[] = new Array();
        user.orders.forEach(order => orders.push(new OrderModel(order)));

        for(const orderId in user.orders)
        {
            orders.push(new OrderModel(await OrderModel.findById(orderId)));
        }

        usermap.orders = this.orderArrayToOrderMapArray(orders);

        usermap.role = user.role;
        usermap.userIds = user.userIds;

        return usermap;
    }

    public userMapToAppUser(usermap: UserMap): ApplicationUser
    {
        if(usermap == undefined)
        {
            return undefined;
        }

        let user = new ApplicationUser();
        user._id = usermap._id;
        user.adminId = usermap.adminId;
        user.email = usermap.email;
        user.firstname = usermap.firstname;
        user.lastname = usermap.lastname;
        user.language = usermap.language;
        user.password = usermap.password;
        user.orders = this.orderMapsArrayToOrderArray(usermap.orders);
        user.role = usermap.role;
        user.userIds = usermap.userIds;

        return user;
    }

    public async userArrayToUserMapArray(users: ApplicationUser[]): Promise<UserMap[]>
    {
        if(users == undefined)
        {
            return undefined;
        }

        let userMaps: UserMap[] = new Array();

        for(const user of users)
        {
            userMaps.push(await this.appUserToUserMap(user));
        }

        return userMaps;
    }

    public userMapArrayToUserArray(userMaps: UserMap[]): ApplicationUser[]
    {
        if(userMaps == undefined)
        {
            return undefined;
        }

        let users: ApplicationUser[] = new Array();

        userMaps.forEach((usermap: UserMap) => {
            users.push(this.userMapToAppUser(usermap));
        });

        return users;
    }

    public orderMapToOrder(ordermap: OrderMap): Order
    {
        if(ordermap == undefined)
        {
            return undefined;
        }

        let order = new Order()
        order._id = ordermap._id;
        order.adminId = ordermap.adminId;
        order.command = ordermap.command;
        order.action = ordermap.action;
        order.price = ordermap.price;

        return order;
    }

    public orderToOrderMap(order: Order): OrderMap
    {
        if(order == undefined)
        {
            return undefined;
        }

        let ordermap = new OrderMap();
        ordermap._id = order._id;
        ordermap.adminId = order.adminId.valueOf() as number;
        ordermap.command = order.command;
        ordermap.action = order.action;
        ordermap.price = order.price;

        return ordermap;
    }

    
    public orderArrayToOrderMapArray(orders: Order[]): OrderMap[]
    {
        if(orders == undefined)
        {
            return undefined;
        }

        let ordermaps: OrderMap[] = new Array();

        orders.forEach((order: Order) => {
            ordermaps.push(this.orderToOrderMap(order));
        });

        return ordermaps;
    }

    public orderMapsArrayToOrderArray(ordermaps: OrderMap[]): Order[]
    {
        if(ordermaps == undefined)
        {
            return undefined;
        }

        let orders: Order[] = new Array();

        ordermaps.forEach((ordermap: OrderMap) => {
            orders.push(this.orderMapToOrder(ordermap));
        });

        return orders;
    }

    public invoiceMapToInvoice(invoicemap: InvoiceMap): Invoice
    {
        if(invoicemap == undefined)
        {
            return undefined;
        }

        let invoice = new Invoice()
        invoice._id = invoicemap._id;
        invoice.userId = invoicemap.userId;
        invoice.orderId = invoicemap.orderId;

        return invoice;
    }

    public invoiceToInvoiceMap(invoice: Invoice): InvoiceMap
    {
        if(invoice == undefined)
        {
            return undefined;
        }

        let invoicemap = new InvoiceMap();
        invoicemap._id = invoice._id;
        invoicemap.userId = invoice.userId.valueOf() as number;
        invoicemap.orderId = invoice.orderId;

        return invoicemap;
    }

    
    public invoiceArrayToInvoiceMapArray(invoices: Invoice[]): InvoiceMap[]
    {
        if(invoices == undefined)
        {
            return undefined;
        }

        let invoicemaps: InvoiceMap[] = new Array();

        invoices.forEach((invoice: Invoice) => {
            invoicemaps.push(this.invoiceToInvoiceMap(invoice));
        });

        return invoicemaps;
    }

    public invoiceMapsArrayToInvoiceArray(invoicemaps: InvoiceMap[]): Invoice[]
    {
        if(invoicemaps == undefined)
        {
            return undefined;
        }

        let invoices: Invoice[] = new Array();

        invoicemaps.forEach((invoicemap: InvoiceMap) => {
            invoices.push(this.invoiceMapToInvoice(invoicemap));
        });

        return invoices;
    }

}