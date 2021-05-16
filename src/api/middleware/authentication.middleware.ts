import * as express from "express";
import * as jwt from "jsonwebtoken";
import { ApiError } from "../../common/extensions/error.extention";
import { ApplicationUser, UserModel } from "../../models/user.model";
import config from "../build/config";

export async function expressAuthentication(request: express.Request, securityName: string, roles?: string[]): Promise<any> 
{
    const token = request.headers["x-access-token"] as string;

    return await new Promise( async (resolve, reject) => {
        if (!token) 
        {
            reject(new ApiError(401, "No token provided."));
        }

        await jwt.verify(token, config.PUBLIC_KEY, async function (error: any, decoded: any) {
            if (error) 
            {
                reject(new ApiError(400, "Invalid access token provided."));
            } 
            else 
            {
                let access = false;
                for (let role of roles) 
                {
                    if (decoded.roles.includes(role)) 
                    {
                        access = true;
                        (request as any).applicationUser = await getUserFromToken(token);
                        break;
                    }
                }
                if(!access)
                {
                    reject(new ApiError(403, "User does not have the required role for this endpoint."));
                }
                
                resolve(decoded);
            }
        });
    });
}

async function getUserFromToken(token: string): Promise<ApplicationUser>
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

