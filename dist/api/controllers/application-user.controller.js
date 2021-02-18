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
exports.ApplicationUserController = void 0;
const tsoa_1 = require("tsoa");
let ApplicationUserController = class ApplicationUserController extends tsoa_1.Controller {
    async RegisterAdmin(user) {
        return "jwt";
    }
    async RegisterUser(user) {
        //let adminJwt = this.getHeader("x-voice-admin-accesstoken");
        return "jwt";
    }
};
__decorate([
    tsoa_1.Post('register/admin'),
    __param(0, tsoa_1.Body())
], ApplicationUserController.prototype, "RegisterAdmin", null);
__decorate([
    tsoa_1.Post('register'),
    __param(0, tsoa_1.Body())
], ApplicationUserController.prototype, "RegisterUser", null);
ApplicationUserController = __decorate([
    tsoa_1.Tags("Users"),
    tsoa_1.Route("users")
], ApplicationUserController);
exports.ApplicationUserController = ApplicationUserController;
//# sourceMappingURL=application-user.controller.js.map