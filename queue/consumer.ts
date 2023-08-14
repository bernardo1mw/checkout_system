import amqp from "amqplib";

async function main() {
  const connection = await amqp.connect("amqp://localhost");
  const channel = await connection.createChannel();
  await channel.assertQueue("decrementStock", { durable: true });
  channel.consume("decrementStock", async function (message: any) {
    const input = JSON.parse(message.content.toString());
    console.log(input);
    channel.ack(message);
  });
}

main();
