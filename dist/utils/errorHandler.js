"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorHandler = void 0;
class ErrorHandler {
    static handleError(error) {
        console.error(`[ERROR]: ${error.message}`);
        // Here you can integrate an error tracking service like Sentry.
    }
}
exports.ErrorHandler = ErrorHandler;
//# sourceMappingURL=errorHandler.js.map