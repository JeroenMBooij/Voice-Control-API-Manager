import 
{
    Request,
    Controller,
    Route,
    Tags,
    Post,
    Put,
    Delete,
    Body,
    SuccessResponse,
    Security,
    Example
} from "tsoa";
import * as express from "express";
import * as AppUser from "../../common/constants/user.constants";
import { AdminOrderService } from "../../services/admin-order.service";
import { OrderMap } from "../../models/maps/order.map";
import { ApplicationUser } from "../../models/user.model";
import { OrderResult } from "../../models/order-result.model";

@Tags("Admin Commands")
@Security(AppUser.JWT_SECURITY, [AppUser.ADMIN_ROLE])
@Route("admin/command")
export class AdminOrderController extends Controller 
{

    /**
     * <b>Create an order by defining a command with parameters <br> 
     *  Match the parameters to a dummy query so we can test if the request works </b> <br><br>
     *  This endpoints supports both requests with query parameters and request body<br>
     *  The request body supports both json and application/x-www-form-urlencoded</br>
     * @summary create an order
     * @example ordermap {
     * "command": "translate {text} to {language}",
     * "action": {
     *   "host": "https://google-translate1.p.rapidapi.com",
     *   "method": "POST",
     *   "requestLine": "/language/translate/v2",
     *   "queryParameters": [
     *    {
     *      "key": "text",
     *      "value": "hello world!"
     *    },
     *    {
     *      "key": "language",
     *      "value": "es"
     *    }
     *   ],
     *   "headers": [
     *     {
     *       "key": "Content-Type",
     *       "value": "application/x-www-form-urlencoded"
     *     },
     *     {
     *       "key": "Accept-Encoding",
     *       "value": "application/gzip"
     *     },
     *     {
     *       "key": "X-Rapidapi-Key",
     *       "value": "1140db894fmshf54643884726904p1853f4jsncbc3d5b0999f"
     *     },
     *     {
     *       "key": "X-Rapidapi-Host",
     *       "value": "google-translate1.p.rapidapi.com"
     *     }
     *   ],
     *   "body": "q={text}&target={language}&source=en"
     *  }
     * }
     * @example ordermap {
     *   "command": "Show me a {breed} dog",
     *   "action": {
     *      "host": "https://dog.ceo",
     *      "method": "GET",
     *      "requestLine": "/api/breed/{breed}/images/random",
     *      "queryParameters": [
     *       {
     *         "key": "breed",
     *         "value": "beagle"
     *       }
     *      ]
     *    }
     *  }
     */
    @Post()
    @SuccessResponse('201', 'Returns the result of your test request')
    public async CreateCommand(@Request() request: express.Request, @Body() ordermap: OrderMap): Promise<OrderResult> 
    {
        const applicationUser = (request as any).applicationUser as ApplicationUser;

        let challengeResult = await AdminOrderService.getInstance().createOrder(applicationUser, ordermap);

        this.setStatus(201);

        return challengeResult;
    }

    /**
     * <b>Change the data of a command you have created before</b>
     * @summary update an order
     */
    @Put('{orderId}')
    public async UpdateCommand(@Request() request: express.Request, orderId: String, @Body() ordermap: OrderMap): Promise<void> 
    {
        const applicationUser = (request as any).applicationUser as ApplicationUser;

        await AdminOrderService.getInstance().UpdateOrder(applicationUser, orderId, ordermap);
    }

    /**
     * <b>Delete all the data of a command you have created before</b>
     * @summary delete an order
     */
    @Delete('{orderId}')
    public async DeleteCommand(@Request() request: express.Request, orderId: String): Promise<void> 
    {
        const applicationUser = (request as any).applicationUser as ApplicationUser;
        
        await AdminOrderService.getInstance().deleteOrder(applicationUser, orderId)
    }


}