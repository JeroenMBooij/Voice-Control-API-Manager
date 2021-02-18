"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderController = void 0;
const tsoa_1 = require("tsoa");
const multer = require("multer");
const order_service_1 = require("../../services/order.service");
let OrderController = class OrderController extends tsoa_1.Controller {
    async ExecuteCommand(request) {
        try {
            await this.handleFile(request, "voiceCommand");
        }
        catch (error) {
            throw new Error(error);
        }
        return order_service_1.OrderService.getInstance().executeOrder(request.file);
    }
    handleFile(request, fileName) {
        const multerSingle = multer().single(fileName);
        return new Promise((resolve, reject) => {
            multerSingle(request, undefined, async (error) => {
                if (error) {
                    reject(error);
                }
                resolve("File will be in request.file, it is a buffer");
            });
        });
    }
};
__decorate([
    tsoa_1.Post('execute'),
    __param(0, tsoa_1.Request())
], OrderController.prototype, "ExecuteCommand", null);
OrderController = __decorate([
    tsoa_1.Tags("Commands"),
    tsoa_1.Route("commands")
], OrderController);
exports.OrderController = OrderController;
//# sourceMappingURL=order.controller.js.map