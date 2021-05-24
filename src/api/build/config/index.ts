import * as fs from 'fs';

export default {
    PRIVATE_KEY: process.env.PRIVATE_KEY || fs.readFileSync('jwtRS256.key'),
    PUBLIC_KEY: process.env.PUBLIC_KEY || fs.readFileSync('jwtRS256.key.pub'),
    port: parseInt(process.env.PORT || '3000', 10)
  };  