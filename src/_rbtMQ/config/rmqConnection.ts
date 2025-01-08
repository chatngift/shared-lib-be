import amqp, { Connection, Channel } from "amqplib";
import { getConnectionUrl } from "./rmqConfig";
import { RabbitMQConfig } from "./rmqTypes";
// import { RabbitMQConfig } from "./types";
// import { getConnectionUrl } from "./config";

export class RabbitMQConnection {
  private connection: Connection | null = null;
  private channel: Channel | null = null;

  constructor(private config: RabbitMQConfig) {}

  async connect(): Promise<void> {
    try {
      // this.connection = await amqp.connect(getConnectionUrl(this.config));
      this.connection = await amqp.connect(getConnectionUrl(this.config));
      // const connection = await amqp.connect('amqp://localhost');
      this.channel = await this.connection.createChannel();

      this.connection.on("error", (err) => {
        console.error("RabbitMQ connection error:", err);
      });

      this.connection.on("close", () => {
        console.log("RabbitMQ connection closed");
      });
    } catch (error) {
      console.error("Failed to connect to RabbitMQ:", error);
      throw error;
    }
  }

  getChannel(): Channel {
    if (!this.channel) {
      throw new Error("Channel not initialized. Call connect() first.");
    }
    return this.channel;
  }

  async close(): Promise<void> {
    try {
      if (this.channel) {
        await this.channel.close();
      }
      if (this.connection) {
        await this.connection.close();
      }
    } catch (error) {
      console.error("Error closing RabbitMQ connection:", error);
      throw error;
    }
  }
}
