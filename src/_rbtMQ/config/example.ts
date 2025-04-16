// import { createConfig } from "./config";
// import { RabbitMQConnection } from "./connection";
import { Producer } from "./producer";
import { Consumer } from "./consumer";
import { MessageHandler } from "./rmqTypes";
// import { RabbitMQConnection } from "./rmqConnection";
import { createConfig, rmqQueues } from "./rmqConfig";
import { RMQManager } from "../rmqManager";
// import { MessageHandler } from "./types";

export async function example() {
  // Create configuration
  const config = createConfig({
    // protocol: "amqp",
    host: "127.0.0.1",
    port: 5672,
    username: "guest",
    password: "guest",
  });

  // Create connection
  // const connection = new RabbitMQConnection(config);
  // await connection.connect();

  try {
    // const channel = connection.getChannel();
    // const queueName = "myQueue";
    // await channel.assertQueue("myQueue", { durable: true });
    // console.log("Queue 'myQueue' created.");
    // // Send a message
    // channel.sendToQueue("myQueue", Buffer.from("Hello RabbitMQ"));
    // // Consume messages from the queue
    // await channel.consume("myQueue", (msg) => {
    //   if (msg) {
    //     console.log("Received message:", msg.content.toString());
    //     channel.ack(msg); // Acknowledge the message
    //   }
    // });
  } catch (error) {
    console.error("Error:", error);
  } finally {
    // Close connection when done
    // await connection.close();
  }
}
