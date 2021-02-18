import 
{
    Controller,
    Get,
    Route,
    Tags,
    Post,
    Patch,
    Delete,
    Body,
    Request
} from "tsoa";
import * as express from "express";
import * as multer from "multer";
import { OrderService } from "../../services/order.service";

@Tags("Commands")
@Route("commands")
export class OrderController extends Controller 
{

    @Post('execute')
    public async ExecuteCommand(@Request() request: express.Request): Promise<any> 
    {
        try
        {
            await this.handleFile(request, "voiceCommand");
        }
        catch(error: any)
        {
            throw new Error(error);
        }

        return OrderService.getInstance().executeOrder((request as any).file);
    }



    private handleFile(request: express.Request, fileName: string): Promise<any> 
    {
        const multerSingle = multer().single(fileName);
        return new Promise((resolve, reject) => {
            multerSingle(request, undefined, async (error: Error) => {
                if (error) 
                {
                    reject(error);
                }
                resolve("File will be in request.file, it is a buffer");
            });
        });
    }

    
    
}