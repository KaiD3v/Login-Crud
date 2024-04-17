import { MongoClient } from "mongodb";

const uri = "mongodb://localhost:27017"
export const client = new MongoClient(uri)
export const database = client.db("AnalysysDb")

export async function connectDb(){
    try {
        await client.connect()
    } catch (err) {
        console.error(err)
    }
}

connectDb()