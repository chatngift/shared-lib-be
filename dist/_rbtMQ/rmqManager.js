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
exports.RMQManager = void 0;
class RMQManager {
    constructor(queueName, config) {
        this.config = config;
        this.queueName = queueName;
    }
    // Initialize the queue, create producer and consumer
    initialize() {
        return __awaiter(this, void 0, void 0, function* () {
            // const connection = new RabbitMQConnection(createConfig(this.config));
            // await connection.connect();
            // this.channel = connection.getChannel();
            // this.producer = new Producer(this.channel, this.queueName);
            // this.consumer = new Consumer(this.channel, this.queueName);
            // await this.producer.createQueue();
            // console.log(`Queue ${this.queueName} initialized.`);
        });
    }
    // Publish a message to the queue
    publish(message) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            if (typeof message == "string") {
                yield ((_a = this.producer) === null || _a === void 0 ? void 0 : _a.publish(message));
            }
            else {
                yield ((_b = this.producer) === null || _b === void 0 ? void 0 : _b.publish(JSON.stringify(message)));
            }
        });
    }
    // Start consuming messages from the queue
    consume(callback) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            yield ((_a = this.consumer) === null || _a === void 0 ? void 0 : _a.consume((msg) => {
                try {
                    const result = JSON.parse(msg.content.toString());
                    callback(result);
                }
                catch (_a) {
                    callback(msg.content.toString());
                }
            }));
        });
    }
    // Close the queue manager (optional, in case we want to clean up)
    close() {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            yield ((_a = this.channel) === null || _a === void 0 ? void 0 : _a.close());
            console.log(`Queue ${this.queueName} connection closed.`);
        });
    }
}
exports.RMQManager = RMQManager;
