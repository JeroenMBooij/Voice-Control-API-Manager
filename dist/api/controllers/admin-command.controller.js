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
exports.AdminCommandController = void 0;
const tsoa_1 = require("tsoa");
const multer = require("multer");
let AdminCommandController = class AdminCommandController extends tsoa_1.Controller {
    async CreateCommand(request, commmand) {
        try {
            await this.handleFile(request);
        }
        catch {
            throw new Error("Error uploading file.");
        }
        console.log("No error");
    }
    async UpdateCommand(commandId, command) {
    }
    async DeleteCommand(commandId) {
    }
    handleFile(request) {
        const multerSingle = multer().single("randomFileIsHere");
        return new Promise((resolve, reject) => {
            multerSingle(request, undefined, async (error) => {
                if (error) {
                    reject("error");
                }
                resolve("file will be in request.randomFileIsHere");
            });
        });
    }
};
__decorate([
    tsoa_1.Post('create'),
    __param(0, tsoa_1.Request()), __param(1, tsoa_1.Body())
], AdminCommandController.prototype, "CreateCommand", null);
__decorate([
    tsoa_1.Patch('update/{commandId}'),
    __param(1, tsoa_1.Body())
], AdminCommandController.prototype, "UpdateCommand", null);
__decorate([
    tsoa_1.Delete('delete/{commandId}')
], AdminCommandController.prototype, "DeleteCommand", null);
AdminCommandController = __decorate([
    tsoa_1.Tags("Admin Commands"),
    tsoa_1.Route("admin/commands")
], AdminCommandController);
exports.AdminCommandController = AdminCommandController;
//# sourceMappingURL=admin-command.controller.js.map