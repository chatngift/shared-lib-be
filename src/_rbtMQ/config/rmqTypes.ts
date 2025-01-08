export interface RabbitMQConfig {
  host: string;
  port: number;
  username: string;
  password: string;
  vhost: string;
}

export interface Message {
  content: any;
  properties?: MessageProperties;
}

export interface MessageProperties {
  contentType?: string;
  contentEncoding?: string;
  headers?: Record<string, any>;
  persistent?: boolean;
}

export type MessageHandler = (message: Message) => Promise<void>;
