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
exports.Consumer = void 0;
class Consumer {
    constructor(channel, queueName) {
        this.channel = channel;
        this.queueName = queueName;
    }
    // Start consuming messages from the queue
    consume(callback) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.channel.consume(this.queueName, (msg) => {
                if (msg) {
                    callback(msg);
                    this.channel.ack(msg); // Acknowledge the message after processing
                }
            });
            console.log(`Consuming messages from queue ${this.queueName}`);
        });
    }
}
exports.Consumer = Consumer;
