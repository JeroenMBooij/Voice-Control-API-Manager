import { ApplicationUser, UserModel } from "../models/user.model";

export class FundsService 
{
    private static instance: FundsService;

    private constructor() {}

    public static getInstance(): FundsService 
    {
        if (!FundsService.instance) 
        {
            FundsService.instance = new FundsService();
        }

        return FundsService.instance;
    }

    public async deposit(user: ApplicationUser, funds: number): Promise<void> 
    {
        await UserModel.updateOne({_id: user._id}, {$inc: { funds: funds }})
    }


}