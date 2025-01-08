// import { RabbitMQConfig } from "./types";

import { RabbitMQConfig } from "./rmqTypes";

export const rmqQueues = {
  PROFILE_QUEUE: "profile-queue",
};

export const createConfig = (
  override?: Partial<RabbitMQConfig>
): RabbitMQConfig => {
  const defaultConfig: RabbitMQConfig = {
    host: "127.0.0.1",
    port: 5672,
    username: "guest",
    password: "guest",
    vhost: "/",
  };

  return {
    ...defaultConfig,
    ...override,
  };
};

export const getConnectionUrl = (config: RabbitMQConfig): string => {
  const url = `amqp://${config.username}:${config.password}@${config.host}:${config.port}/${config.vhost}`;
  console.log("url: ", url);
  return url;
};
