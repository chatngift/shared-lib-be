"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggerV2 = void 0;
class LoggerV2 {
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
exports.LoggerV2 = LoggerV2;
