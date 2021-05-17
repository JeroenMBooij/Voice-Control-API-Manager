import config from './api/build/config';
import * as http from 'http';
import { createServer } from "./api/server";
import openWebsocket from "./api/websocket";
import { connectDatabase } from "./api/database";



async function startServer()
{
    require('dotenv').config();

    let server: http.Server = http.createServer(createServer());
    connectDatabase();
     
    server.listen(config.port, () => {
        console.log(`
          ################################################
          🛡️       Server listening on port: ${config.port}       🛡️ 
          ################################################
          `);
      });
  
      openWebsocket(server);
}

startServer();