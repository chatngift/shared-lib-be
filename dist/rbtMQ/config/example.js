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
exports.example = example;
const rmqConnection_1 = require("./rmqConnection");
const rmqConfig_1 = require("./rmqConfig");
// import { MessageHandler } from "./types";
function example() {
    return __awaiter(this, void 0, void 0, function* () {
        // Create configuration
        const config = (0, rmqConfig_1.createConfig)({
            // protocol: "amqp",
            host: "127.0.0.1",
            port: 5672,
            username: "guest",
            password: "guest",
        });
        // Create connection
        const connection = new rmqConnection_1.RabbitMQConnection(config);
        yield connection.connect();
        try {
            const channel = connection.getChannel();
            const queueName = "myQueue";
            // await channel.assertQueue("myQueue", { durable: true });
            // console.log("Queue 'myQueue' created.");
            // // Send a message
            // channel.sendToQueue("myQueue", Buffer.from("Hello RabbitMQ"));
            // // Consume messages from the queue
            // await channel.consume("myQueue", (msg) => {
            //   if (msg) {
            //     console.log("Received message:", msg.content.toString());
            //     channel.ack(msg); // Acknowledge the message
            //   }
            // });
        }
        catch (error) {
            console.error("Error:", error);
        }
        finally {
            // Close connection when done
            // await connection.close();
        }
    });
}
