import fastify from "fastify";
import { connectDb } from "./db/mongodb.js";

const app = fastify();

const start = async () => {
  try {
    await app.listen(3000);
    console.log("Server running on port: 3000");
  } catch (err) {
    console.error("Error while running server:", err);
    process.exit()
  }
};

start();