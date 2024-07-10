const express = require('express');
const cors = require('cors');
require('dotenv').config()
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json())

//coffee-server
//LZSnVuhmg1eRLT0D


const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.acyxhfp.mongodb.net/?appName=Cluster0`;



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
        await client.connect();
        const coffeeBase = client.db("insertDB");
        const coffeeList = coffeeBase.collection("coffeeList");

        app.get('/coffees', async(req, res)=>{
            const cursor = coffeeList.find();
            const result = await cursor.toArray()
            res.send(result)
        })


        app.post('/coffees', async (req, res) => {
            const user = req.body;
            console.log(user);
            const result = await coffeeList.insertOne(user);
            res.send(result)
        })

        app.delete('/coffees/:id',async(req , res)=>{
            const id = req.params.id;
            const query = {_id: new ObjectId(id)};
            const result = await coffeeList.deleteOne(query);
            res.send(result);
        })


        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } catch (error) {
        console.error("Failed to connect to MongoDB", error);
    }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('Coffee Server connect successfully')
})

app.listen(port, () => {
    console.log(`Coffee Server connect successfully${port}`);
})