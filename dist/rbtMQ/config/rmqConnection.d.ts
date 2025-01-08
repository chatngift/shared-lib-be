import { Channel } from "amqplib";
import { RabbitMQConfig } from "./rmqTypes";
export declare class RabbitMQConnection {
    private config;
    private connection;
    private channel;
    constructor(config: RabbitMQConfig);
    connect(): Promise<void>;
    getChannel(): Channel;
    close(): Promise<void>;
}
