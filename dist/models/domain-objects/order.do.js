"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderDo = void 0;
const endpoint_do_1 = require("./endpoint.do");
class OrderDo {
    constructor(order) {
        this._order = order;
        this.action = new endpoint_do_1.EndpointDo(order.action);
    }
    get command() {
        return this._order.command;
    }
}
exports.OrderDo = OrderDo;
//# sourceMappingURL=order.do.js.map