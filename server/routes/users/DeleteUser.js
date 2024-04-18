import { ObjectId } from "mongodb";
import { database } from "../../db/mongodb.js";

export async function DeleteUser(app) {
  app.delete("/:userId/delete", async (req, res) => {
    try {
      const userId = req.params.userId;

      // buscar database
      const collection = database.collection("Clients");

      // buscar user por id (convertendo userId para ObjectId)
      const user = await collection.findOne({ _id: new ObjectId(userId) }); // Usando new ObjectId(userId)

      if (!user) {
        return res.status(404).send("User not found!");
      }

      await collection.deleteOne({ _id: new ObjectId(userId) }); // Usando new ObjectId(userId)
      res.status(200).send("User successfully deleted!");
    } catch (err) {
      console.error("Error while deleting user:", err);
      res.status(500).send("Internal server error!");
    }
  });
}