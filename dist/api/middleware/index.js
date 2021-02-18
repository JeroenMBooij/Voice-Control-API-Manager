"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("./express");
const swagger_1 = require("./swagger");
const exception_1 = require("./exception");
exports.default = (app) => {
    express_1.default(app);
    console.log('✌️ Express loaded.');
    swagger_1.default(app);
    console.log('📗 Swagger loaded.');
    exception_1.default(app);
    console.log('🔥 ExceptionFilter loaded.');
};
//# sourceMappingURL=index.js.map