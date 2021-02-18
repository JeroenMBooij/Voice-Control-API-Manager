"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminOrderService = void 0;
const order_validator_1 = require("../validators/order.validator");
class AdminOrderService {
    constructor() { }
    static getInstance() {
        if (!AdminOrderService.instance) {
            AdminOrderService.instance = new AdminOrderService();
        }
        return AdminOrderService.instance;
    }
    async createOrder(order) {
        // Business logic validation
        order_validator_1.OrderValidator.getInstance().validateCommandParameters(order.command, order.action);
        return await order_validator_1.OrderValidator.getInstance().challengeEndpoint(order.action);
    }
}
exports.AdminOrderService = AdminOrderService;
//# sourceMappingURL=admin-order.service.js.map