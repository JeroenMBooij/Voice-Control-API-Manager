"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
function useSwagger(app) {
    var options = {
        swaggerOptions: {
            url: '/swagger.json'
        }
    };
    app.use('/swagger', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(null, options));
}
exports.default = useSwagger;
