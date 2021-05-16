import { prop, getModelForClass, Ref, pre } from '@typegoose/typegoose';
import { ApplicationUser, UserModel } from './user.model';
import { Order } from './order.model';


@pre<Invoice>('save', async function () {
    while(true)
    {
        this._id = Math.floor(Math.random() * 100000) + 1;
        let order: Invoice = await InvoiceModel.findById(this._id);

        if(!order)
        {   
            break;
        }
    }

  })
  
export class Invoice
{
    @prop({ type: () => Number, required: true, default: 0 })
    public _id?: number;

    @prop({ ref: 'ApplicationUser', type: () => Number, required: true })
    public userId: Ref<ApplicationUser>;

    @prop({ ref: () => Order, type: Number })
    public orderId?: Order['_id']; 

    @prop({ type: () => Number, required: true, default: 4 })
    public callsLeft?: number;
}

const InvoiceModel = getModelForClass(Invoice);

InvoiceModel.schema.path("orderId").validate(async function(orders: Order[]): Promise<boolean> {

    let totalPrice = orders.map(s => s.price).reduce((a, b) => a + b);

    let user: ApplicationUser = new UserModel(await UserModel.findById(this.userId));
    if(user.funds < totalPrice)
    {
        this.invalidate("orders", "Insufficient funds");
        return false;
    }

    return true;
});

export { InvoiceModel } 