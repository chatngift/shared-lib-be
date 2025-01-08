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
exports.RabbitMQConnection = void 0;
const amqplib_1 = __importDefault(require("amqplib"));
const rmqConfig_1 = require("./rmqConfig");
// import { RabbitMQConfig } from "./types";
// import { getConnectionUrl } from "./config";
class RabbitMQConnection {
    constructor(config) {
        this.config = config;
        this.connection = null;
        this.channel = null;
    }
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // this.connection = await amqp.connect(getConnectionUrl(this.config));
                this.connection = yield amqplib_1.default.connect((0, rmqConfig_1.getConnectionUrl)(this.config));
                // const connection = await amqp.connect('amqp://localhost');
                this.channel = yield this.connection.createChannel();
                this.connection.on("error", (err) => {
                    console.error("RabbitMQ connection error:", err);
                });
                this.connection.on("close", () => {
                    console.log("RabbitMQ connection closed");
                });
            }
            catch (error) {
                console.error("Failed to connect to RabbitMQ:", error);
                throw error;
            }
        });
    }
    getChannel() {
        if (!this.channel) {
            throw new Error("Channel not initialized. Call connect() first.");
        }
        return this.channel;
    }
    close() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (this.channel) {
                    yield this.channel.close();
                }
                if (this.connection) {
                    yield this.connection.close();
                }
            }
            catch (error) {
                console.error("Error closing RabbitMQ connection:", error);
                throw error;
            }
        });
    }
}
exports.RabbitMQConnection = RabbitMQConnection;
