import { Endpoint } from "../models/endpoint.model";
import { EndpointMap } from "../models/maps/endpoint.map";
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
        for(let order in user.orders)
        {
            let garbageOrder = await OrderModel.findById(order);
            orders.push(new OrderModel(garbageOrder))
        }

        usermap.orders = this.orderArrayToOrderMapArray(orders);

        usermap.role = user.role;
        usermap.userIds = user.userIds;

        return usermap;
    }

    public userMapToAppUser(usermap: UserMap): ApplicationUser
    {
        if(usermap == undefined)
            return undefined;
        

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
            return undefined;

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
            return undefined;
        

        let users: ApplicationUser[] = new Array();

        userMaps.forEach((usermap: UserMap) => {
            users.push(this.userMapToAppUser(usermap));
        });

        return users;
    }

    public orderMapToOrder(ordermap: OrderMap): Order
    {
        if(ordermap == undefined)
            return undefined;

        let order = new Order()
        order._id = ordermap._id;
        order.adminId = ordermap.adminId;
        order.command = ordermap.command;
        order.action = this.endpointMapToEndPoint(ordermap.action);

        return order;
    }

    public orderToOrderMap(order: Order): OrderMap
    {
        if(order == undefined)
            return undefined;

        try
        {
            let ordermap = new OrderMap();
            ordermap._id = order._id;
            ordermap.adminId = order.adminId.valueOf() as number;
            ordermap.command = order.command;
            ordermap.action = order.action;

            return ordermap;
        }
        catch
        {
            return null;
        }
    }
    
    public endpointToEndpointMap(action: EndpointMap): EndpointMap
    {
        let actionMap = new Endpoint();
        actionMap.host = action.host;
        actionMap.method = action.method;
        actionMap.requestLine = action.requestLine;
        actionMap.queryParameters = action.queryParameters;
        actionMap.headers = action.headers;
        actionMap.body = action.body;

        return actionMap;
    }

    public endpointMapToEndPoint(actionMap: EndpointMap): Endpoint
    {
        let action = new Endpoint();
        action.host = actionMap.host;
        action.method = actionMap.method;
        action.requestLine = actionMap.requestLine;
        action.queryParameters = actionMap.queryParameters;
        action.headers = actionMap.headers;
        action.body = actionMap.body;

        return action;
    }

    
    public orderArrayToOrderMapArray(orders: Order[]): OrderMap[]
    {
        if(orders == undefined)
            return undefined;
        

        let ordermaps: OrderMap[] = new Array();

        orders.forEach((order: Order) => {
            ordermaps.push(this.orderToOrderMap(order));
        });

        return ordermaps;
    }

    public orderMapsArrayToOrderArray(ordermaps: OrderMap[]): Order[]
    {
        if(ordermaps == undefined)
            return undefined;
        

        let orders: Order[] = new Array();

        ordermaps.forEach((ordermap: OrderMap) => {
            orders.push(this.orderMapToOrder(ordermap));
        });

        return orders;
    }

}