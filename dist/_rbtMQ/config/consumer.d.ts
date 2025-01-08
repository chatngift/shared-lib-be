import { Channel, ConsumeMessage } from "amqplib";
export declare class Consumer {
    private channel;
    private queueName;
    constructor(channel: Channel, queueName: string);
    consume(callback: (msg: ConsumeMessage) => void): Promise<void>;
}
