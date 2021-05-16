import { ApplicationUser, UserModel } from "../models/user.model";
import * as jwt from 'jsonwebtoken';
import config from "../api/build/config";
import { UserMap } from "../models/maps/user.map";
import { MapperService } from "./mapper.service";
import * as AppUser from "../common/constants/user.constants"
import { Credentials } from "../models/credentials.model";
import { PaginatedUsers } from "../models/user-pagination.model";

export class AuthenticationService 
{
    private static instance: AuthenticationService;

    private constructor() {}

    public static getInstance(): AuthenticationService 
    {
        if (!AuthenticationService.instance) 
        {
            AuthenticationService.instance = new AuthenticationService();
        }

        return AuthenticationService.instance;
    }

    
    public async login(credentials: Credentials): Promise<string>
    {
        let user: ApplicationUser = await UserModel.findOne({ email: credentials.email, password: credentials.password });

        return this.generateToken(user);
    }

    public async registerUser(adminToken: string, usermap: UserMap): Promise<string>
    {
        let admin: ApplicationUser = await this.getUserFromToken(adminToken);

        usermap.role = AppUser.USER_ROLE;
        usermap.adminId = admin._id;
        usermap.language = admin.language;

        let user: ApplicationUser = await this.register(usermap);
        await UserModel.updateOne({_id: admin._id}, {$push: { userIds: user._id }})

        return this.generateToken(user);
    }

    public async registerAdmin(usermap: UserMap): Promise<string>
    {
        usermap.role = AppUser.ADMIN_ROLE;
        usermap.adminId = usermap._id;

        let user: ApplicationUser = await this.register(usermap);

        return this.generateToken(user);
    }

    private async register(usermap: UserMap): Promise<ApplicationUser>
    {
        let user: ApplicationUser = MapperService.getInstance().userMapToAppUser(usermap);
        user.funds = AppUser.REGISTRATION_BONUS;

        user = await UserModel.create(user);

        return user;
    }

    public async getUserFromToken(token: string): Promise<ApplicationUser>
    {
        if(!token)
        {
            return undefined;
        }
        
        let decoded = jwt.verify(token, config.PUBLIC_KEY);
        let userId: string = decoded.id;
        let user: ApplicationUser = new UserModel(await UserModel.findById(userId));

        return user;
    }
    
    public async GetPaginatedUsersByAdmin(admin: ApplicationUser, startIndex: number = 0, endIndex: number = 49): Promise<PaginatedUsers>
    {
        let users: ApplicationUser[] = new Array();
        let garbage = await UserModel.find({_id: { $in: admin.userIds } });
        garbage.forEach(item => {
            users.push(new UserModel(item));
        });

        let pagUsers = new PaginatedUsers();
        pagUsers.total = users.length;

        users = users.slice(startIndex, endIndex);
        
        pagUsers.users = await MapperService.getInstance().userArrayToUserMapArray(users);

        return pagUsers;
    }

    public async GetUsersByAdmin(admin: ApplicationUser): Promise<UserMap[]>
    {
        let users: ApplicationUser[] = new Array();
        let garbage = await UserModel.find({_id: { $in: admin.userIds } });
        garbage.forEach(item => {
            users.push(new UserModel(item));
        });

        return MapperService.getInstance().userArrayToUserMapArray(users);
    }

    private generateToken(user: ApplicationUser): string
    {
        let token: string = jwt.sign({ 
            id: user._id,
            roles: [user.role],
            // valid for 24 hours
            exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24),
        }, 
        config.PRIVATE_KEY, 
        { algorithm: 'RS256' });

        return token;
    }
}