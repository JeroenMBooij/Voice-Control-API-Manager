"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("./api/build/config");
const express = require("express");
const mongoose = require("mongoose");
async function startServer() {
    const app = express();
    await require('./api/middleware').default(app);
    await mongoose.connect(config_1.default.MONGO_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => console.log("🚀 Connected to Mongodb."))
        .catch((error) => { throw new Error(`Failed to connect to Mongodb 💔 ${error}`); });
    app.listen(config_1.default.port, () => {
        console.log(`
      ################################################
      🛡️       Server listening on port: ${config_1.default.port}       🛡️ 
      ################################################
    `);
    });
}
startServer();
//# sourceMappingURL=app.js.map