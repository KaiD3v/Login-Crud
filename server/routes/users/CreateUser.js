import { database } from "../../db/mongodb.js";
import bcrypt from "bcrypt";

export async function CreateUser(app) {
  app.post("/register", async (req, res) => {
    try {
      // buscar banco de dados
      const collection = database.collection("Clients");

      // buscar credenciais do body e fazer o post no banco de dados
      const { userName, userEmail, userPassword, confirmUserPassword, isAdmin } =
        req.body;

      // criando hash da senha
      const hashedUserPassword = await bcrypt.hash(userPassword, 10);

      // Definir isAdmin como false se não estiver presente no corpo da requisição
      const isAdminUser = isAdmin || false;

      const newUser = {
        userName: userName,
        userEmail: userEmail,
        userPassword: hashedUserPassword,
        isAdmin: isAdminUser
      };

      // verificar se e-mail já existe
      const existingUser = await collection.findOne({ userEmail: userEmail });
      if (existingUser) {
        return res.status(400).send("Email already exists!");
      }

      // validar senha e confirmar envio
      if (userPassword !== confirmUserPassword) {
        res.status(400).send("Both passwords need to be equal!");
      }
      if (userPassword === confirmUserPassword) {
        const result = await collection.insertOne(newUser);
        res.status(201).send({
          message: "User created succesfully!",
          userId: result.insertedId,
          newUser: newUser,
        });
      }
    } catch (err) {
      console.error("Error while register user:", err);
      res.status(500).send({ error: "Internal server error." });
    }
  });
}
