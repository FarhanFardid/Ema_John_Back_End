const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion } = require('mongodb');


// Middleware

const cors = require('cors');
app.use(cors());
require('dotenv').config();

app.get('/', (req,res)=>{
    res.send("Ema-John server is Running.....")
})


const uri = `mongodb+srv://${process.env.DB_User}:${process.env.DB_Password}@cluster0.joz6qi9.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();
     client.connect();

     const productCollection = client.db("EmaJohnDB").collection('products'); 

     app.get('/products', async (req,res)=>{
        const result = await productCollection.find().toArray();
        res.send(result);
     })

     app.get('/totalProducts', async(req,res)=>{
      const result = await productCollection.estimatedDocumentCount();
      res.send({totalProduct : result})
     })
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.listen(port, ()=>{
    console.log('The Server is running on port', port);
})