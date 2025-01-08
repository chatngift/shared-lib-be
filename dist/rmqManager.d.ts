export interface RMQConfig {
    hostname: string;
    port: number;
    username: string;
    password: string;
    vhost: string;
}
export interface RMQMessage {
    from: "auth" | "st" | "sm" | "ec" | "comm" | "tr" | "oth";
    to?: string;
    context: string;
    body: object;
}
export declare const rmqManager: {
    initRabbitMQ: (queue: string, config?: RMQConfig) => Promise<void>;
    consumeMessages: (actionHandler: (message: RMQMessage, ansCallback: (message: RMQMessage) => void) => void) => Promise<void>;
    shutdownRabbitMQ: () => Promise<void>;
    sendMessageToQueue: (message: RMQMessage) => Promise<void>;
};
