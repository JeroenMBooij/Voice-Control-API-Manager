import request from "supertest";
import { createServer } from "../../src/api/server";
import { closeDatabase, connectDatabase, dropDatabase } from "../../src/api/database"
import express from "express";
import { UserMap } from "../../src/models/maps/user.map";
import * as fs from 'fs';



export class TestMaster 
{
    public app: express.Express;
    
    public token: string = "";
    public admintoken: string = "";
    public usertoken: string = "";

    private static instance: TestMaster;
    private constructor() {
        process.env.NODE_ENV = "test";

        this.app = createServer();
    }

    public static getInstance(): TestMaster
    {
        if (!TestMaster.instance) 
        {
            TestMaster.instance = new TestMaster();
        }

        return TestMaster.instance;
    }

    public async makePostRequest(route: string, data: any): Promise<any>
    {
        let response = await request(this.app)
            .post(route)
            .send(data)
            .set("x-access-token", this.token);
        
        return response;
    }

    public async makeGetRequest(route: string): Promise<any>
    {
        let response = await request(this.app)
            .get(route)
            .set("x-access-token", this.token);
        
        return response;
    }

    public async uploadFile(route: string, field: string, filePath: string)
    {
        let response = await request(this.app)
            .post(route)
            .set("x-access-token", this.token)
            .set('Connection', 'keep-alive')
            .attach(field, filePath);
        
        return response;
    }

    public async registerAdmin(admin: UserMap): Promise<void>
    {
        let response = await this.makePostRequest("/admins/register", admin);

        this.token = response.body;
        this.admintoken = response.body;
    }

    public async registerUser(user: UserMap): Promise<void>
    {
        let response = await this.makePostRequest("/user/register", user);

        this.token = response.body;
        this.usertoken = response.body;
    }

    public startServer(): void 
    {
        connectDatabase();
    }

    public async stopServer(): Promise<void> 
    {
        await dropDatabase();
        await closeDatabase();
    }

}


