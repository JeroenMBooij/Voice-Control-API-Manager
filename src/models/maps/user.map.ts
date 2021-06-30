import { OrderMap } from "./order.map";

export class UserMap
{
    public _id?: number;

    public email!: string;

    public password!: string;

    public firstname!: string;

    public lastname?: string;

    public role?: string;

    public language?: string;

    public orders?: OrderMap[]; 

    public userIds?: number[];

    public adminId?: number;

}