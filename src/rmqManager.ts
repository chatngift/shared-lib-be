import amqp, { Channel, Connection } from "amqplib";

export interface RMQConfig {
  hostname: string;
  port: number;
  username: string;
  password: string;
  vhost: string;
}

export interface RMQMessage {
  from: "auth" | "story" | "sm" | "other";
  to?: string;
  context: string;
  body: object;
}

// RabbitMQ connection and channel
let connection: Connection;
let channel: Channel;
let queueName: string;

// Initialize RabbitMQ connection
const initRabbitMQ = async (queue: string, config?: RMQConfig) => {
  queueName = queue;
  try {
    connection = await amqp.connect({
      hostname: "127.0.0.1",
      port: 5672,
      username: "guest",
      password: "guest",
      vhost: "/",
      ...config,
    });
    channel = await connection.createChannel();
    await channel.assertQueue(queue, { durable: true });
    console.log("RMQ Lib: RabbitMQ connection established");
  } catch (error) {
    console.error("RMQ Lib: Error initializing RabbitMQ:", error);
    throw error;
  }
};

// Send message to RabbitMQ (always send as a JSON object)
const sendMessageToQueue = async (message: RMQMessage) => {
  try {
    const messageBuffer = Buffer.from(JSON.stringify(message));
    channel.sendToQueue(queueName, messageBuffer, {
      persistent: true,
    });
    console.log(`RMQ Lib: [x] Sent: ${JSON.stringify(message)}`);
  } catch (error) {
    console.error("RMQ Lib: Error sending message to RabbitMQ:", error);
  }
};

// Listen for incoming messages from RabbitMQ (parse the message back to an object)
const consumeMessages = async (
  actionHandler: (
    message: RMQMessage,
    ansCallback: (message: RMQMessage) => void
  ) => void
) => {
  try {
    console.log(
      `RMQ Lib: [*] Waiting for messages in ${queueName}. To exit press CTRL+C`
    );

    // Start consuming messages
    channel.consume(
      queueName,
      (msg) => {
        if (msg) {
          try {
            // Parse the message content as JSON
            const parsedMessage: RMQMessage = JSON.parse(
              msg.content.toString()
            );
            console.log(`RMQ Lib: [x] Received:`, parsedMessage);
            channel.ack(msg);
            actionHandler(
              parsedMessage,
              async (ans: RMQMessage) => await sendMessageToQueue(ans)
            );
          } catch (error) {
            console.error("RMQ Lib: Error parsing message:", error);
            channel.nack(msg); // Reject the message
          }
        }
      },
      { noAck: false }
    );
  } catch (error) {
    console.error("RMQ Lib: Error consuming messages:", error);
  }
};

// Gracefully shutdown RabbitMQ connection
const shutdownRabbitMQ = async () => {
  await channel.close();
  await connection.close();
  console.log("RMQ Lib: Shutted down gracefully...");
};

export const rmqManager = {
  initRabbitMQ,
  consumeMessages,
  shutdownRabbitMQ,
  sendMessageToQueue,
};
