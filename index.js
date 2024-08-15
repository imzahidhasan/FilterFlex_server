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
    const productsCollection = client.db("Filterflex").collection("products");

    //get routes
    app.get("/products", async (req, res) => {

      const page = parseInt(req.query.page) || 1;

      const limit = parseInt(req.query.limit) || 10;

      const skip = (page - 1) * limit;

      const totalProducts = await productsCollection.countDocuments();

      const products = await productsCollection
        .find()
        .skip(skip)
        .limit(limit)
        .toArray();
      
      
      res.send({
        products,
        totalPages: Math.ceil(totalProducts / limit),
        currentPage: page,
      });
      
    });

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
