import { database } from "../../db/mongodb.js";

export async function GetUsers(app) {
  app.get("/users", async (req, res) => {
    try {
      // buscar database
      const collection = await database.collection("Clients");

      // buscar usuários
      const users = await collection.find({}).toArray();

      res.status(200).send({ message: "Users List:", users: users });
    } catch (err) {
      console.error("Error while getting users:", err);
      res.status(500).send("Internal server error:", err);
    }
  });
}
