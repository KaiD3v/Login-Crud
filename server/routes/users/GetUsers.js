import { database } from "../../db/mongodb.js";

export async function GetUsers(app) {
  app.get("/users", async (req, res) => {
    try {
      // buscar database
      const collection = await database.collection("Clients");

      // buscar usuários
      const users = await collection.find({}, { projection: { userEmail: 1, userName: 1, _id: 0 } }).toArray();

      res.status(201).send({ message: "Users List:", users: users });
    } catch (err) {
      console.error("Error while getting users:", err);
      res.status(500).send("Internal server error:", err);
    }
  });
}