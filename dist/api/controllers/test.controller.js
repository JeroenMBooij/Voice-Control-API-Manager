"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestController = void 0;
const tsoa_1 = require("tsoa");
const test_service_1 = require("../../services/test.service");
let TestController = class TestController extends tsoa_1.Controller {
    async getBrons() {
        test_service_1.TestService.getInstance().week1Bronze();
    }
    async getSilver() {
        return test_service_1.TestService.getInstance().week1Silver();
    }
    async getGold() {
        return "This is a success!";
    }
    async getPlatinum() {
        return "This is a great success!";
    }
};
__decorate([
    tsoa_1.Get('bronze')
], TestController.prototype, "getBrons", null);
__decorate([
    tsoa_1.Get('silver')
], TestController.prototype, "getSilver", null);
__decorate([
    tsoa_1.Get('gold')
], TestController.prototype, "getGold", null);
__decorate([
    tsoa_1.Get('platinum')
], TestController.prototype, "getPlatinum", null);
TestController = __decorate([
    tsoa_1.Tags("Test"),
    tsoa_1.Route("test")
], TestController);
exports.TestController = TestController;
