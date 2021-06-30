import { prop, getModelForClass, Ref, pre } from '@typegoose/typegoose';
import { Endpoint } from "./endpoint.model";
import * as httpMethods from '../common/constants/http-methods.constants';
import { ApplicationUser } from './user.model';
import { OrderValidator } from '../validators/order.validator';


@pre<Order>('save', async function () {
    while(true)
    {
        this._id = Math.floor(Math.random() * 100000) + 1;
        let order: Order = await OrderModel.findById(this._id);

        if(!order)
        {   
            break;
        }
    }

  })
export class Order
{
    @prop({ type: () => Number, required: true, default: 0 })
    public _id?: number;

    @prop({ ref: 'ApplicationUser', type: () => Number, required: true })
    public adminId: Ref<ApplicationUser>;

    @prop({ type: () => String, required: true })
    public command!: string;

    @prop({ type: () => Number, required: true })
    public parameterLocations: number[] = new Array();

    @prop({ type: () => Endpoint, required: true })
    public  action!: Endpoint;

    public get uniqueCommand(): string
    {
        return this.command.replace(/\s?{(.+?)}/g, "").toLowerCase();
    }
    
}

const OrderModel = getModelForClass(Order);

OrderModel.schema.path('_id').validate(async function(value: number): Promise<boolean>{
   
    while(true)
    {
        this._id = Math.floor(Math.random() * 1000000) + 1;
        let order: Order = await OrderModel.findById(this._id).exec();

        if(!order)
        {
            break;
        }

    }

    return true;
});

OrderModel.schema.path('command').validate(async function(value: string){

    let allOrders: Order[] = new Array();
    let garbage = await OrderModel.find({ adminId: this.adminId });
    garbage.forEach(item => {
        allOrders.push(new OrderModel(item));
    });

    let matchingOrder: Order = garbage.find(order => order.uniqueCommand == this.uniqueCommand);

    if(matchingOrder)
    {   
        this.invalidate("command", "Command already exists");
        return false;
    }

    return true;
});

OrderModel.schema.path('command').validate(function(value: string){
    //make sure command does not contain too many spaces
    let invalidCommands: RegExpMatchArray | null = value.match(/[ ]{2}/g);
    if(invalidCommands)
    {
       this.invalidate("command", "Command contains too many spaces");
    }
    
    // Make sure command only contains letters and spaces
    invalidCommands  = value.match(/(\\|[^a-zA-z {}])/g);
    if(invalidCommands)
    {
        this.invalidate("command", "A command can only contain the letters a-z and spaces");
    }

    // Make sure there are no spaces inside de parameters
    let test = value.match(/{.*\s.*}/g).toString(); 
    if(test)
    {
        let count: RegExpMatchArray | null = test.match(/{.*?}/g);
        if(count.length == 1)
            this.invalidate("command", "A command parameter can not contain spaces");
    }
});

OrderModel.schema.path('action').validate(function(action: Endpoint): boolean{
    let host: RegExpMatchArray | null = action.url.match(/https?:\/\/w{0,3}\w*?\.(\w*?\.)?\w{2,3}\S*|www\.(\w*?\.)?\w*?\.\w{2,3}\S*|(\w*?\.)?\w*?\.\w{2,3}[\/\?]\S*/);
      if(host == null)
      {
          this.invalidate("action", "Invalid hostname and/or requestline provided");
          return false;
      }
  
      return true;
  });

OrderModel.schema.path("action").validate(function(action: Endpoint): boolean {
    let commandParameters: RegExpMatchArray | null = this.command.match(/{.*?}/g);

    //no validation required for commands without parameters
    if(commandParameters === null)
    {
        return true;
    }

    if(action.body !== undefined)
    {
        let isJson = action.headers.filter(s => s.value == "application/x-www-form-urlencoded").length == 0;
        OrderValidator.getInstance().validateCommandToBody(isJson, commandParameters, action.body);
    }
});

OrderModel.schema.path("action").validate(function(action: Endpoint): boolean {
    switch(action.method.toUpperCase())
    {
        case httpMethods.GET:
            if(action.body !== undefined)
            {
                this.invalidate("body", "GET method can not contain a body");
                return false;
            }
            break;

        case httpMethods.POST:
        case httpMethods.PUT:
        case httpMethods.PATCH:
        case httpMethods.DELETE:
            let invalidRequestLine: RegExpMatchArray | null = action.requestLine.match(/{.*?}/g);
            if(invalidRequestLine)
            {
                this.invalidate("queryParameters", `Query strings are not supported in ${action.method} methods`);
                return false;
            }
            break;
        default:
            this.invalidate("method", `${action.method.toUpperCase()} is not a valid Http method.`);
            return false;
    }

    return true;
});




export { OrderModel }