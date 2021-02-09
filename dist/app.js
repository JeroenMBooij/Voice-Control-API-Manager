"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("./api/build/config"));
const express_1 = __importDefault(require("express"));
async function startServer() {
    const app = express_1.default();
    await require('./api/middleware').default(app);
    app.listen(config_1.default.port, () => {
        console.log(`
      ################################################
      🛡️  Server listening on port: ${config_1.default.port}  🛡️ 
      ################################################
    `);
    });
}
startServer();
