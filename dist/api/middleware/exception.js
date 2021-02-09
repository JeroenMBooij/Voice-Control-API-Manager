"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function useExceptionFilter(app) {
    // catch 404 and forward to error handler
    app.use((request, response, next) => {
        const error = new Error('404 Not Found');
        error['status'] = 404;
        next(error);
    });
    // error handlers
    // error handler will print stacktrace only in development
    app.use((error, request, response) => {
        response.locals.message = error.message;
        response.locals.error = request.app.get('env') === 'development' ? error : {};
        response.status(error.status || 500);
        response.send(error.message);
    });
}
exports.default = useExceptionFilter;
