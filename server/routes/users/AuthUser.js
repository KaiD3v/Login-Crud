import { database } from "../../db/mongodb.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function AuthUser(app) {
  app.post("/login", async (req, res) => {
    try {
      // buscar database
      const collection = database.collection("Clients");

      // buscar informações do usuário
      const { userEmail, userPassword } = req.body;

      const user = await collection.findOne({ userEmail: userEmail });
      if (!user) {
        res.status(404).send({ message: "E-mail not found!" });
      }

      const passwordMatch = await bcrypt.compare(
        userPassword,
        user.userPassword
      );
      if (!passwordMatch) {
        return res.status(401).send({ message: "Wrong Password!" });
      }

      const token = jwt.sign({ userId: user._id }, "USER TOKEN");

      return res.status(200).send(token);
    } catch (err) {
      console.log("Error while authenticate user:", err);
      return res.status(500).send("Internal server error!");
    }
  });
}
