const express = require("express");
require("dotenv").config();
const { MongoClient, ServerApiVersion } = require("mongodb");
const port = process.env.PORT || 3000;
const app = express();
const cors = require("cors");

//middlewares
app.use(
  cors({
    origin: [
      // "http://localhost:5173",
      "filterflex-35340.web.app",
      "filterflex-35340.firebaseapp.com",
    ]
  })
);
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
    // await client.connect();
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

    app.get("/products/filter", async (req, res) => {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const skip = (page - 1) * limit;

      const { brand, minValue, maxValue, searchTerm, category } = req.query;

      let filter = {};

      if (brand && brand !== "a") {
        filter.brandName = brand;
      }
      if (category) {
        filter.category = category;
      }
      if ((minValue && minValue > 0) || (maxValue && maxValue > 0)) {
        filter.price = {};
        if (minValue && minValue > 0) filter.price.$gte = parseFloat(minValue);
        if (maxValue && maxValue > 0) filter.price.$lte = parseFloat(maxValue);
      }

      if (searchTerm) {
        filter.$or = [{ productName: { $regex: searchTerm, $options: "i" } }];
      }
      console.log(filter);
      const products = await productsCollection
        .find(filter)
        .skip(skip)
        .limit(limit)
        .toArray();

      const total = await productsCollection.countDocuments(filter);
      console.log({ products, total });
      res.send({
        products,
        currentPage: page,
        totalPages: Math.ceil(total / limit),
      });
    });

    app.get("/products/search", async (req, res) => {
      const searchText = req.query.q;
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const skip = (page - 1) * limit;

      if (!searchText) {
        return res.send({ error: "Search query is required" });
      }

      const regex = new RegExp(searchText, "i");

      const totalProducts = await productsCollection.countDocuments({
        productName: { $regex: regex },
      });

      const products = await productsCollection
        .find({ productName: { $regex: regex } })
        .skip(skip)
        .limit(limit)
        .toArray();
      console.log({ searchText, products, totalProducts });
      res.send({
        products,
        totalPages: Math.ceil(totalProducts / limit),
        currentPage: page,
      });
    });
  } finally {
    // Ensures that the client will close when you finish/error
  }
}
run().catch(console.dir);

//server listening
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
