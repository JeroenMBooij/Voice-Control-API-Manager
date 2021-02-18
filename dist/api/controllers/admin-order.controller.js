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
exports.AdminOrderController = void 0;
const tsoa_1 = require("tsoa");
const admin_order_service_1 = require("../../services/admin-order.service");
const order_do_1 = require("../../models/domain-objects/order.do");
let AdminOrderController = class AdminOrderController extends tsoa_1.Controller {
    async CreateCommand(order) {
        let challengeResult = admin_order_service_1.AdminOrderService.getInstance().createOrder(new order_do_1.OrderDo(order));
        this.setStatus(201);
        return challengeResult;
    }
    async UpdateCommand(orderId, order) {
    }
    async DeleteCommand(orderId) {
    }
};
__decorate([
    tsoa_1.Post('create'),
    tsoa_1.SuccessResponse('201', 'Created'),
    __param(0, tsoa_1.Body())
], AdminOrderController.prototype, "CreateCommand", null);
__decorate([
    tsoa_1.Patch('update/{orderId}'),
    __param(1, tsoa_1.Body())
], AdminOrderController.prototype, "UpdateCommand", null);
__decorate([
    tsoa_1.Delete('delete/{orderId}')
], AdminOrderController.prototype, "DeleteCommand", null);
AdminOrderController = __decorate([
    tsoa_1.Tags("Admin Commands"),
    tsoa_1.Route("admin/commands")
], AdminOrderController);
exports.AdminOrderController = AdminOrderController;
//# sourceMappingURL=admin-order.controller.js.map