import amqp, { Connection, Channel, Message } from "amqplib";
import { v4 as uuidv4 } from "uuid";

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

export class RMQManager {
  private connection: Connection | null = null;
  private channel: Channel | null = null;

  constructor() {}

  // Initialize RabbitMQ connection and channel
  async initRMQ(config?: RMQConfig): Promise<void> {
    try {
      // Establish a connection to RabbitMQ
      this.connection = await amqp.connect({
        hostname: "127.0.0.1",
        port: 5672,
        username: "guest",
        password: "guest",
        vhost: "/",
        ...config,
      });

      // Create a channel from the connection
      this.channel = await this.connection.createChannel();
      console.log("RMQ: Connection and channel initialized");
    } catch (error) {
      console.error("RMQ: Error initializing RabbitMQ", error);
      throw error;
    }
  }

  // Ensure the channel exists and return it
  public getChannel(): Channel {
    if (!this.channel) {
      throw new Error("Channel is not initialized");
    }
    return this.channel;
  }

  // Send an RPC request and wait for a response
  async sendRPC(queueName: string, message: RMQMessage): Promise<any> {
    const correlationId = uuidv4();
    return new Promise<any>((resolve, reject) => {
      try {
        const channel = this.getChannel();

        // Assert that the queue exists before sending a message
        channel.assertQueue(queueName, { durable: true });

        // Declare a temporary reply queue for responses
        channel.assertQueue("", { exclusive: true }).then((q) => {
          // Send the request with the correlationId and replyTo
          channel.sendToQueue(queueName, Buffer.from(JSON.stringify(message)), {
            correlationId,
            replyTo: q.queue,
          });

          // Wait for a response in the reply queue
          this.consumeRPC(q.queue, correlationId, resolve, reject);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  // Consume RPC responses from the reply queue
  private async consumeRPC(
    replyQueue: string,
    correlationId: string,
    resolve: Function,
    reject: Function
  ) {
    try {
      const channel = this.getChannel();

      // Consume messages from the reply queue
      channel.consume(
        replyQueue,
        (msg: Message | null) => {
          if (msg && msg.properties.correlationId === correlationId) {
            resolve(JSON.parse(msg.content.toString())); // Resolve with the response
            channel.ack(msg); // Acknowledge the message
          }
        },
        { noAck: false }
      );
    } catch (error) {
      reject(error); // Reject in case of error
    }
  }

  // Get or create a named queue
  public async initQueue(
    queueName: string,
    actionHandler?: (
      message: RMQMessage,
      ansCallback: (msg: RMQMessage) => void
    ) => void
  ): Promise<void> {
    try {
      const channel = this.getChannel();
      // Declare the queue before consuming (make sure the queue exists)
      await channel.assertQueue(queueName, { durable: true });

      // Start consuming messages continuously from the queue
      channel.consume(
        queueName,
        (msg: Message | null) => {
          if (msg) {
            const message = JSON.parse(msg.content.toString());
            console.log(`Received message from ${queueName}:`, message);

            // Check if correlationId is present in msg.properties
            const correlationId = msg.properties.correlationId;
            if (!correlationId) {
              console.error("No correlationId found in the message properties");
              return;
            }

            if (actionHandler) {
              actionHandler(message, (answerResp: RMQMessage) => {
                // Send the response to the replyTo queue
                channel.sendToQueue(
                  msg.properties.replyTo,
                  Buffer.from(JSON.stringify(answerResp)),
                  { correlationId: msg.properties.correlationId }
                );
                // Acknowledge the message so it's removed from the queue
                channel.ack(msg);
              });
            } else {
              channel.ack(msg); // Acknowledge the message if no handler is provided
            }
          }
        },
        { noAck: false }
      );
    } catch (error) {
      console.error("Error in initializing or consuming queue:", error);
    }
  }

  // Close the RabbitMQ connection
  async closeConnection(): Promise<void> {
    try {
      if (this.channel) {
        await this.channel.close();
      }
      if (this.connection) {
        await this.connection.close();
      }
      console.log("RMQ: Connection closed");
    } catch (error) {
      console.error("RMQ: Error closing connection", error);
    }
  }
}
