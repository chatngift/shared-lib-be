import { RabbitMQConnection } from "./rmqConnection";
import { createConfig, rmqQueues } from "./rmqConfig";
import { RMQManager } from "../rmqManager";

export async function exampleV2() {
  // Create configuration
  const mgr = new RMQManager("myNewQueue");
  try {
    await mgr.initialize();

    await mgr.publish("thsi is from exampleV2");

    await mgr.consume((msg) => {
      console.log("Received: ", msg);
    });
  } catch (error) {
    console.error("Error:", error);
  } finally {
    mgr.close();
    // Close connection when done
    // await connection.close();
  }
}
