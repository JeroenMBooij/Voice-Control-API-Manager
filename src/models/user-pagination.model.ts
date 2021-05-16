import { UserMap } from "./maps/user.map";

export class PaginatedUsers
{
    public total!: number;

    public users!: UserMap[];
}