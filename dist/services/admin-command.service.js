"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminCommandService = void 0;
class AdminCommandService {
    constructor() {
    }
    static getInstance() {
        if (!AdminCommandService.instance) {
            AdminCommandService.instance = new AdminCommandService();
        }
        return AdminCommandService.instance;
    }
}
exports.AdminCommandService = AdminCommandService;
//# sourceMappingURL=admin-command.service.js.map