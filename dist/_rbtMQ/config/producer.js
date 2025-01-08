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
exports.Producer = void 0;
class Producer {
    constructor(channel, queueName) {
        this.channel = channel;
        this.queueName = queueName;
    }
    // Publish a message to a specified queue with the given routing key
    publish(message) {
        return __awaiter(this, void 0, void 0, function* () {
            const bufferMessage = Buffer.from(message);
            this.channel.sendToQueue(this.queueName, bufferMessage, {
                persistent: true,
            });
            console.log(`Message sent to ${this.queueName}: ${message}`);
        });
    }
    // Create or assert a queue
    createQueue() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.channel.assertQueue(this.queueName, { durable: true });
            console.log(`Queue ${this.queueName} created or assured.`);
        });
    }
}
exports.Producer = Producer;
