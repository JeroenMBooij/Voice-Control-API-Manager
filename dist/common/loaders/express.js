"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
//import { RegisterRoutes } from '../api/routes';
const path_1 = __importDefault(require("path"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const cors_1 = __importDefault(require("cors"));
//import { GameStreamController } from '../api/controllers/game-stream.controller';
//import { DownloadController } from '../api/controllers/download.controller';
function startExpress({ app }) {
    app.use(morgan_1.default('dev'));
    app.use(body_parser_1.default.json());
    app.use(cors_1.default());
    app.use(express_1.default.static(path_1.default.join(__dirname, '../../public')));
    var options = {
        swaggerOptions: {
            url: '/api/swagger.json'
        }
    };
    app.use('/api/swagger', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(null, options));
    let apiApp = express_1.default();
    //RegisterRoutes(apiApp);
    app.use('/api', apiApp);
    //app.use('/api/game-stream', GameStreamController)
    //app.use('/api/download', DownloadController)
    // catch 404 and forward to error handler
    app.use((req, res, next) => {
        const err = new Error('Not Found');
        err['status'] = 404;
        next(err);
    });
    app.use((err, req, res, next) => {
        res.locals.message = err.message;
        res.locals.error = req.app.get('env') === 'development' ? err : {};
        res.status(err.status || 500);
        res.send(err.message);
    });
}
exports.default = startExpress;
