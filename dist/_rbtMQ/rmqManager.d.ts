import { RabbitMQConfig } from "./config/rmqTypes";
export declare class RMQManager {
    private channel?;
    private queueName;
    private producer?;
    private consumer?;
    private config?;
    constructor(queueName: string, config?: RabbitMQConfig);
    initialize(): Promise<void>;
    publish(message: string | any): Promise<void>;
    consume(callback: (msg: string | any) => void): Promise<void>;
    close(): Promise<void>;
}
