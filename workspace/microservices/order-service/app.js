const express = require("express");
const amqp = require("amqplib");
const morgan = require("morgan");

const app = express();
const routes = require("./routes");
const config = require("./config");
const OrderService = require("./lib/OrderService");

// Middleware to parse JSON request bodies
app.use(express.json());

// Middleware to log HTTP requests
app.use(morgan("tiny"));

// Mount the router
app.use("/", routes);

// Error handling middleware
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Internal Server Error";
  // You can also log the error to a file or console
  console.error(err);

  res.status(status).json({
    error: {
      message,
      status
    }
  });
});

(async () => {
  try {
    const connection = await amqp.connect(
      process.env.RABBITMQ_URL || "amqp://127.0.0.1"
    );
    const channel = await connection.createChannel();
    const queue = "order_queue";

    await channel.assertQueue(queue, { durable: true });
    console.log("[x] Waiting for messages in %s.", queue);
    channel.consume(
      queue,
      async (msg) => {
        if (msg !== null) {
          const orderData = JSON.parse(msg.content.toString());
          console.log(" [x] Sent %s", JSON.stringify(orderData));
          await OrderService.create(
            orderData.userId,
            orderData.email,
            orderData.items
          );
          channel.ack(msg);
        }
      },
      { noAck: false }
    );
  } catch (err) {
    console.error("Error occurred:", err);
  }
})();

module.exports = app;
