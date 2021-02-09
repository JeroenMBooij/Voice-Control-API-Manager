import config from './api/build/config';
import express, {Request, Response, NextFunction} from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import { RegisterRoutes } from './api/routes';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import path from 'path';


async function startServer() {
  const app = express();

  await require('./api/middleware').default(app);

  app.listen(config.port, () => {
    console.log(`
      ################################################
      🛡️  Server listening on port: ${config.port}  🛡️ 
      ################################################
    `);
  });
}

startServer();