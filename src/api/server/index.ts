import startExpress from "./express"
import assembleMiddleware from "../middleware";
import express from 'express';

export function createServer(): express.Express
{
    const app = express();

    startExpress(app);
    assembleMiddleware(app);
    
    return app;    
}
