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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rmqManager = void 0;
const amqplib_1 = __importDefault(require("amqplib"));
// RabbitMQ connection and channel
let connection;
let channel;
let queueName;
// Initialize RabbitMQ connection
const initRabbitMQ = (queue, config) => __awaiter(void 0, void 0, void 0, function* () {
    queueName = queue;
    try {
        connection = yield amqplib_1.default.connect(Object.assign({ hostname: "127.0.0.1", port: 5672, username: "guest", password: "guest", vhost: "/" }, config));
        channel = yield connection.createChannel();
        yield channel.assertQueue(queue, { durable: true });
        console.log("RMQ Lib: RabbitMQ connection established");
    }
    catch (error) {
        console.error("RMQ Lib: Error initializing RabbitMQ:", error);
        throw error;
    }
});
// Send message to RabbitMQ (always send as a JSON object)
const sendMessageToQueue = (message) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const messageBuffer = Buffer.from(JSON.stringify(message));
        channel.sendToQueue(queueName, messageBuffer, {
            persistent: true,
        });
        console.log(`RMQ Lib: [x] Sent: ${JSON.stringify(message)}`);
    }
    catch (error) {
        console.error("RMQ Lib: Error sending message to RabbitMQ:", error);
    }
});
// Listen for incoming messages from RabbitMQ (parse the message back to an object)
const consumeMessages = (actionHandler) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(`RMQ Lib: [*] Waiting for messages in ${queueName}. To exit press CTRL+C`);
        // Start consuming messages
        channel.consume(queueName, (msg) => {
            if (msg) {
                try {
                    // Parse the message content as JSON
                    const parsedMessage = JSON.parse(msg.content.toString());
                    console.log(`RMQ Lib: [x] Received:`, parsedMessage);
                    channel.ack(msg);
                    actionHandler(parsedMessage, (ans) => __awaiter(void 0, void 0, void 0, function* () { return yield sendMessageToQueue(ans); }));
                }
                catch (error) {
                    console.error("RMQ Lib: Error parsing message:", error);
                    channel.nack(msg); // Reject the message
                }
            }
        }, { noAck: false });
    }
    catch (error) {
        console.error("RMQ Lib: Error consuming messages:", error);
    }
});
// Gracefully shutdown RabbitMQ connection
const shutdownRabbitMQ = () => __awaiter(void 0, void 0, void 0, function* () {
    yield channel.close();
    yield connection.close();
    console.log("RMQ Lib: Shutted down gracefully...");
});
exports.rmqManager = {
    initRabbitMQ,
    consumeMessages,
    shutdownRabbitMQ,
    sendMessageToQueue,
};
