import fastify from "fastify";
import { connectDb } from "./db/mongodb.js";
import { CreateUser } from "./routes/users/CreateUser.js";
import { GetUsers } from "./routes/users/GetUsers.js";
import { GetUser } from "./routes/users/GetUser.js";
import { DeleteUser } from "./routes/users/DeleteUser.js";
import { AuthUser } from "./routes/users/AuthUser.js";
import fastifyFormbody from "@fastify/formbody";

const app = fastify();
app.register(fastifyFormbody)

//routes
app.register(CreateUser)
app.register(GetUsers)
app.register(GetUser)
app.register(DeleteUser)
app.register(AuthUser)


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