"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const swaggerUi = require("swagger-ui-express");
function useSwagger(app) {
    var options = {
        swaggerOptions: {
            url: '/swagger.json'
        }
    };
    app.use('/swagger', swaggerUi.serve, swaggerUi.setup(null, options));
}
exports.default = useSwagger;
//# sourceMappingURL=swagger.js.map