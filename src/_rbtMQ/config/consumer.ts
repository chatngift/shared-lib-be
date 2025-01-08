import { Channel, ConsumeMessage } from "amqplib";

export class Consumer {
  private channel: Channel;
  private queueName: string;

  constructor(channel: Channel, queueName: string) {
    this.channel = channel;
    this.queueName = queueName;
  }

  // Start consuming messages from the queue
  async consume(callback: (msg: ConsumeMessage) => void): Promise<void> {
    await this.channel.consume(this.queueName, (msg: ConsumeMessage | null) => {
      if (msg) {
        callback(msg);
        this.channel.ack(msg); // Acknowledge the message after processing
      }
    });
    console.log(`Consuming messages from queue ${this.queueName}`);
  }
}
