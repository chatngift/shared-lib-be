"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
class Logger {
    static log(message) {
        console.log(`[INFO]: ${message}`);
    }
    static error(message) {
        console.error(`[ERROR]: ${message}`);
    }
    static warn(message) {
        console.warn(`[WARN]: ${message}`);
    }
}
exports.Logger = Logger;
