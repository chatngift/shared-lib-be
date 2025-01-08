"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.exampleV2 = exampleV2;
const rmqManager_1 = require("../rmqManager");
function exampleV2() {
    return __awaiter(this, void 0, void 0, function* () {
        // Create configuration
        const mgr = new rmqManager_1.RMQManager("myNewQueue");
        try {
            yield mgr.initialize();
            yield mgr.publish("thsi is from exampleV2");
            yield mgr.consume((msg) => {
                console.log("Received: ", msg);
            });
        }
        catch (error) {
            console.error("Error:", error);
        }
        finally {
            mgr.close();
            // Close connection when done
            // await connection.close();
        }
    });
}
