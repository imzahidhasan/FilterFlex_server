const express = require("express");
require("dotenv").config();
const { MongoClient, ServerApiVersion } = require("mongodb");
const port = process.env.PORT || 3000;
const app = express();
const cors = require("cors");

//middlewares
app.use(cors());
app.use(express.json());

//server check route
app.get("/", (req, res) => {
  res.send("Server is running so fast...");
});

//database connection uri
const uri = process.env.URI;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

      app.get('/all-product', (req, res) => {
          res.send('this route is for getting all product from db')
      })
      
      
      
      
      
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged");
  } finally {
    // Ensures that the client will close when you finish/error
  }
}
run().catch(console.dir);

//server listening
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
