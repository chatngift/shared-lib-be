import { Channel } from "amqplib";
export declare class Producer {
    private channel;
    private queueName;
    constructor(channel: Channel, queueName: string);
    publish(message: string): Promise<void>;
    createQueue(): Promise<void>;
}
