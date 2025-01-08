"use strict";
// import { RabbitMQConfig } from "./types";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConnectionUrl = exports.createConfig = exports.rmqQueues = void 0;
exports.rmqQueues = {
    PROFILE_QUEUE: "profile-queue",
};
const createConfig = (override) => {
    const defaultConfig = {
        host: "127.0.0.1",
        port: 5672,
        username: "guest",
        password: "guest",
        vhost: "/",
    };
    return Object.assign(Object.assign({}, defaultConfig), override);
};
exports.createConfig = createConfig;
const getConnectionUrl = (config) => {
    const url = `amqp://${config.username}:${config.password}@${config.host}:${config.port}/${config.vhost}`;
    console.log("url: ", url);
    return url;
};
exports.getConnectionUrl = getConnectionUrl;
