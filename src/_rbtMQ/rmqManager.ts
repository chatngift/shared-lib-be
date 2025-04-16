import { Channel } from "amqplib";
import { Producer } from "./config/producer";
import { Consumer } from "./config/consumer";
import { RabbitMQConfig } from "./config/rmqTypes";
// import { RabbitMQConnection } from "./config/rmqConnection";
import { createConfig } from "./config/rmqConfig";

export class RMQManager {
  private channel?: Channel;
  private queueName: string;
  private producer?: Producer;
  private consumer?: Consumer;
  private config?: RabbitMQConfig;

  constructor(queueName: string, config?: RabbitMQConfig) {
    this.config = config;
    this.queueName = queueName;
  }

  // Initialize the queue, create producer and consumer
  async initialize(): Promise<void> {
    // const connection = new RabbitMQConnection(createConfig(this.config));
    // await connection.connect();
    // this.channel = connection.getChannel();
    // this.producer = new Producer(this.channel, this.queueName);
    // this.consumer = new Consumer(this.channel, this.queueName);
    // await this.producer.createQueue();
    // console.log(`Queue ${this.queueName} initialized.`);
  }

  // Publish a message to the queue
  async publish(message: string | any): Promise<void> {
    if (typeof message == "string") {
      await this.producer?.publish(message);
    } else {
      await this.producer?.publish(JSON.stringify(message));
    }
  }

  // Start consuming messages from the queue
  async consume(callback: (msg: string | any) => void): Promise<void> {
    await this.consumer?.consume((msg) => {
      try {
        const result = JSON.parse(msg.content.toString());
        callback(result);
      } catch {
        callback(msg.content.toString());
      }
    });
  }

  // Close the queue manager (optional, in case we want to clean up)
  async close(): Promise<void> {
    await this.channel?.close();
    console.log(`Queue ${this.queueName} connection closed.`);
  }
}
