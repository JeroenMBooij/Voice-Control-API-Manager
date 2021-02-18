import { Express } from 'express';
import startExpress from './express';
import useSwagger from './swagger';
import useExceptionFilter from './exception'

export default (app: Express): void => {

  startExpress(app);
  console.log('✌️ Express loaded.');

  useSwagger(app);
  console.log('📗 Swagger loaded.');

  useExceptionFilter(app);
  console.log('🔥 ExceptionFilter loaded.');
};