"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("./express"));
const swagger_1 = __importDefault(require("./swagger"));
const exception_1 = __importDefault(require("./exception"));
exports.default = (app) => {
    express_1.default(app);
    console.log('✌️ Express loaded');
    swagger_1.default(app);
    console.log('✌️ Swagger loaded');
    exception_1.default(app);
    console.log('✌️ Filter loaded');
};
