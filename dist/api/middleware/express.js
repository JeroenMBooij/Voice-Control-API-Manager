"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const routes_1 = require("../routes");
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
function startExpress(app) {
    app.use(morgan_1.default('dev'));
    app.use(body_parser_1.default.json());
    app.use(cors_1.default());
    app.use(express_1.default.static(path_1.default.join(__dirname, '../public')));
    //register all routes from the routes generated by tsoa
    routes_1.RegisterRoutes(app);
}
exports.default = startExpress;