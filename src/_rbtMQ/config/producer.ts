import { Channel } from "amqplib";

export class Producer {
  private channel: Channel;
  private queueName: string;

  constructor(channel: Channel, queueName: string) {
    this.channel = channel;
    this.queueName = queueName;
  }

  // Publish a message to a specified queue with the given routing key
  async publish(message: string): Promise<void> {
    const bufferMessage = Buffer.from(message);
    this.channel.sendToQueue(this.queueName, bufferMessage, {
      persistent: true,
    });
    console.log(`Message sent to ${this.queueName}: ${message}`);
  }

  // Create or assert a queue
  async createQueue(): Promise<void> {
    await this.channel.assertQueue(this.queueName, { durable: true });
    console.log(`Queue ${this.queueName} created or assured.`);
  }
}
