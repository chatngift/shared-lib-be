import { RabbitMQConfig } from "./rmqTypes";
export declare const rmqQueues: {
    PROFILE_QUEUE: string;
};
export declare const createConfig: (override?: Partial<RabbitMQConfig>) => RabbitMQConfig;
export declare const getConnectionUrl: (config: RabbitMQConfig) => string;
