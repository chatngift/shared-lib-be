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
const uuid_1 = require("uuid");
class RMQManager {
    constructor() {
        this.connection = null;
        this.channel = null;
    }
    // Initialize RabbitMQ connection and channel
    initRMQ(config) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Establish a connection to RabbitMQ
                // this.connection = await amqp.connect({
                //   hostname: "127.0.0.1",
                //   port: 5672,
                //   username: "guest",
                //   password: "guest",
                //   vhost: "/",
                //   ...config,
                // });
                // Create a channel from the connection
                // this.channel = await this.connection.createChannel();
                // console.log("RMQ: Connection and channel initialized");
            }
            catch (error) {
                console.error("RMQ: Error initializing RabbitMQ", error);
                throw error;
            }
        });
    }
    // Get or create a named queue
    initQueue(queueName, actionHandler) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const channel = this.getChannel();
                // Declare the queue before consuming (make sure the queue exists)
                yield channel.assertQueue(queueName, { durable: true });
                // Start consuming messages continuously from the queue
                channel.consume(queueName, (msg) => {
                    if (msg) {
                        const message = JSON.parse(msg.content.toString());
                        console.log(`Received message from ${queueName}:`, message);
                        // Check if correlationId is present in msg.properties
                        const correlationId = msg.properties.correlationId;
                        if (!correlationId) {
                            console.error("No correlationId found in the message properties");
                            return;
                        }
                        if (actionHandler) {
                            actionHandler(message, (answerResp) => {
                                // Send the response to the replyTo queue
                                channel.sendToQueue(msg.properties.replyTo, Buffer.from(JSON.stringify(answerResp)), { correlationId: msg.properties.correlationId });
                                // Acknowledge the message so it's removed from the queue
                                channel.ack(msg);
                            });
                        }
                        else {
                            channel.ack(msg); // Acknowledge the message if no handler is provided
                        }
                    }
                }, { noAck: false });
            }
            catch (error) {
                console.error("Error in initializing or consuming queue:", error);
                // console.error("RMQ: Error initializing RabbitMQ", error);
                if (error.code === "ECONNREFUSED") {
                    console.log("RMQ: RabbitMQ connection refused. Retrying...");
                    // setTimeout(() => this.reconnect(), this.retryInterval); // Retry after 5 seconds
                }
                else {
                    throw error;
                }
            }
        });
    }
    // Ensure the channel exists and return it
    getChannel() {
        if (!this.channel) {
            throw new Error("Channel is not initialized");
        }
        return this.channel;
    }
    // Send an RPC request and wait for a response
    sendRPC(queueName, message) {
        return __awaiter(this, void 0, void 0, function* () {
            const correlationId = (0, uuid_1.v4)();
            return new Promise((resolve, reject) => {
                try {
                    const channel = this.getChannel();
                    // Assert that the queue exists before sending a message
                    channel.assertQueue(queueName, { durable: true });
                    // Declare a temporary reply queue for responses
                    channel.assertQueue("", { exclusive: true }).then((q) => {
                        // Send the request with the correlationId and replyTo
                        channel.sendToQueue(queueName, Buffer.from(JSON.stringify(message)), {
                            correlationId,
                            replyTo: q.queue,
                        });
                        // Wait for a response in the reply queue
                        this.consumeRPC(q.queue, correlationId, resolve, reject);
                    });
                }
                catch (error) {
                    reject(error);
                }
            });
        });
    }
    // Consume RPC responses from the reply queue
    consumeRPC(replyQueue, correlationId, resolve, reject) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const channel = this.getChannel();
                // Consume messages from the reply queue
                channel.consume(replyQueue, (msg) => {
                    if (msg && msg.properties.correlationId === correlationId) {
                        resolve(JSON.parse(msg.content.toString())); // Resolve with the response
                        channel.ack(msg); // Acknowledge the message
                    }
                }, { noAck: false });
            }
            catch (error) {
                reject(error); // Reject in case of error
            }
        });
    }
    // Close the RabbitMQ connection
    closeConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (this.channel) {
                    yield this.channel.close();
                }
                if (this.connection) {
                    // await this.connection.close();
                }
                console.log("RMQ: Connection closed");
            }
            catch (error) {
                console.error("RMQ: Error closing connection", error);
            }
        });
    }
}
exports.RMQManager = RMQManager;
