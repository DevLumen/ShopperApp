import { MongoClient, ServerApiVersion } from "mongodb";

const uri = process.env.ATLAS_URI || "mongodb+srv://asoca783:Pinkwhaleswimsnorth.1@shopperappcluster.eqz8net.mongodb.net/shopper_db?retryWrites=true&w=majority"
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

try {
  // Connect the client to the server
  await client.connect();
  // Send a ping to confirm a successful connection
  await client.db("admin").command({ ping: 1 });
  console.log(
   "Pinged your deployment. You successfully connected to MongoDB!"
  );
} catch(err) {
  console.error(err);
}

let db = client.db("shopper_db");

export default db;