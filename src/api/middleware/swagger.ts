import { Express } from 'express';
import swaggerUi from 'swagger-ui-express';

export default function useSwagger(app: Express) {

    var options = {
        swaggerOptions: {
          url: '/swagger.json'
        }
    }

    app.use('/swagger', swaggerUi.serve, swaggerUi.setup(null, options));

}