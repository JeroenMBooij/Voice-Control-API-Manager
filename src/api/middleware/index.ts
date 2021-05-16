import { Express } from 'express';
import useExceptionFilter from './exception.middleware'

export default function(app: Express): void {
  useExceptionFilter(app);

  console.log('🔥 Middleware Assembled.');
};