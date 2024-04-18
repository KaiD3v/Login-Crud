import { database } from "../../db/mongodb.js";

export async function GetUser(app) {
  app.get("/:userName", async (req, res) => {
    try {
      // buscar database
      const collection = database.collection("Clients");

      // buscar usuário de acordo com parâmetros do body
      const { userName } = req.params;
      const user = await collection.find(
        { userName: userName },
        { projection: { userEmail: 1, userName: 1, _id: 0 } }
      ).toArray();

      // Mostrar usuário buscado ou retornar not found
      if (user) {
        res.status(201).send({ message: "User:", user: user });
      } else {
        res.status(404).send({ message: "User not found." });
      }
      res.status(201).send({ message: "User:", user: user });
    } catch (err) {
      console.log("Error while getting user:", err);
      res.status(500).send("Internal server error!");
    }
  });
}
