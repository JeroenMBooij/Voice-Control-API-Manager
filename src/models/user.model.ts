import { prop, getModelForClass, pre, Ref } from '@typegoose/typegoose';
import { Order } from './order.model';
import * as SupportedLanguages from '../common/constants/language.constants';
import * as AppUser from '../common/constants/user.constants';
import { Invoice } from './Invoice.model';

@pre<ApplicationUser>('save', async function () {
    while(true)
    {
        this._id = Math.floor(Math.random() * 100000) + 1;

        let user: ApplicationUser = await UserModel.findById(this._id);

        if(!user)
        {
            if(this.role === AppUser.ADMIN_ROLE)
            {
                this.adminId = this._id;
            }

            break;
        }
    }

  })

export class ApplicationUser
{
    @prop({ type: () => Number, required: true, default: 0 })
    public _id?: number;

    @prop({ type: () => String, required: true })
    public email!: string;

    @prop({ type: () => String, required: true })
    public password!: string;

    @prop({ type: () => String, required: true })
    public firstname!: string;

    @prop({ type: () => String })
    public lastname?: string;

    public get fullname(): string
    {
        return `${this.firstname} ${this.lastname}`;
    }

    @prop({ type: () => String })
    public role?: string;

    @prop({ type: () => Number, required: true })
    public funds?: number;

    @prop({ type: () => String })
    public language?: string;

    @prop({ ref: () => Order, type: Number })
    public orders?: Ref<Order>[]; 

    @prop({ ref: () => ApplicationUser, type: Number })
    public userIds?: ApplicationUser['_id'][];

    @prop({ ref: () => ApplicationUser, type: Number })
    public invoiceIds?: Invoice['_id'][];

    @prop({ ref: () => ApplicationUser, type: () => Number })
    public adminId?: ApplicationUser['_id'];

}

const UserModel = getModelForClass(ApplicationUser);

UserModel.schema.path("email").validate(async function(value: string): Promise<boolean> {

    let user: ApplicationUser = await UserModel.findOne({ "email": this.email }).exec();

    if(user)
    {
        this.invalidate("email", `There already is an account with the email: ${this.email}`);
        return false;
    }
    
    return true;
});

UserModel.schema.path("language").validate(function(value: string): boolean {
    if(SupportedLanguages.LIST.includes(value))
    {
        return true;
    }

    this.invalidate("language", `${value} is not a supported language. Please checkout the 'help/supported-languages' endpoint for all the supported languages`);
    return false;
});

UserModel.schema.path("role").validate(function(value: string): boolean {
    if(value === AppUser.ADMIN_ROLE)
    {
        if(this.language === undefined)
        {
            this.invalidate("language", "Admins must provide a language for their commands");
            return false;
        }
    }

    return true;
})

export { UserModel } 