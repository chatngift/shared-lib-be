import { Channel } from "amqplib";
export interface RMQMessage {
    from: string;
    to: string;
    context: string;
    body: any;
    correlationId?: string;
}
export interface RMQConfig {
    hostname: string;
    port: number;
    username: string;
    password: string;
    vhost: string;
}
export declare class RMQManager {
    private connection;
    private channel;
    constructor();
    initRMQ(config?: RMQConfig): Promise<void>;
    initQueue(queueName: string, actionHandler?: (message: RMQMessage, ansCallback: (msg: RMQMessage) => void) => void): Promise<void>;
    getChannel(): Channel;
    sendRPC(queueName: string, message: RMQMessage): Promise<any>;
    private consumeRPC;
    closeConnection(): Promise<void>;
}
