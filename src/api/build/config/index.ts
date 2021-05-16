import * as fs from 'fs';
import * as path from 'path';

export default {
    PRIVATE_KEY: process.env.PRIVATE_KEY || fs.readFileSync(path.join(__dirname, 'jwtRS256.key')),
    PUBLIC_KEY: process.env.PUBLIC_KEY || fs.readFileSync(path.join(__dirname, 'jwtRS256.key.pub')),
    port: parseInt(process.env.PORT || '3000', 10),
    MONGO_CONNECTION: process.env.MONGO_CONNECTION || 'mongodb://localhost:27017/voicecommandsdb',
    MsSpeechKey: process.env.MsSpeechKey || "3d3208f7802d454bba98b861bec0d10d",
    MsSpeechLocation: "westeurope"
  };