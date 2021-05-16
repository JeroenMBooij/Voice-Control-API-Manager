import {Express, Request, Response, NextFunction} from 'express';
import { ValidateError } from 'tsoa';
import { ApiError } from '../../common/extensions/error.extention';

export default function useExceptionFilter(app: Express): void {

      // catch 404 and forward to error handler
    app.use((request: Request, response: Response, next: NextFunction) => {
        const error = new Error('404 Not Found');
        error['status'] = 404; 
        next(error);
    });

    // error handlers
    // error handler will print stacktrace only in development
    app.use(function errorHandler(
        error: unknown,
        req: Request,
        res: Response,
        next: NextFunction
      ): Response | void {
        if (error instanceof ValidateError) {
            console.warn(`Caught Validation Error for ${req.path}:`, error.fields);
            return res.status(422).json({
              message: "Validation Failed"
            });
        }
        if (error instanceof ApiError) {
          console.warn(`Caught Validation Error for ${req.path}:`, error.name);
          return res.status(error.status).json({
            message: error.message
          });
        }
        if (error instanceof Error) {
          return res.status(500).json({
            message: error.message,
          });
        }
      
        next();
      });

}