import fastify from "fastify";
import { CreateUser } from "./routes/users/CreateUser.js";
import { connectDb } from "./db/mongodb.js";
import { GetUsers } from "./routes/users/GetUsers.js";

const app = fastify();

//routes
app.register(CreateUser)
app.register(GetUsers)

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