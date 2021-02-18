import config from './api/build/config';
import * as express from 'express';
import * as mongoose from 'mongoose';

async function startServer() 
{
  const app = express();

  await require('./api/middleware').default(app);
  
  await mongoose.connect(config.MONGO_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("🚀 Connected to Mongodb."))
    .catch((error: any) => { throw new Error(`Failed to connect to Mongodb 💔 ${error}`); } );
  

  app.listen(config.port, () => 
  {
    console.log(`
      ################################################
      🛡️       Server listening on port: ${config.port}       🛡️ 
      ################################################
    `);
  });


}

startServer();