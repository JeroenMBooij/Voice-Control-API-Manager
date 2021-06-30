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
        request: Request,
        response: Response,
        next: NextFunction
      ): Response | void {
        if (error instanceof ValidateError) {
            return response.status(422).json({
              message: `Caught Validation Error for ${request.path}: ${error.fields}`
            });
        }
        if (error instanceof ApiError) {
          console.warn(`Caught Validation Error for ${request.path}:`, error.name);
          return response.status(error.status).json({
            message: error.message
          });
        }
        if (error instanceof Error) {
          return response.status(500).json({
            message: error.message,
          });
        }
      
        next();
      });

}