const express = require('express')
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require('cors');
require('dotenv').config();
const app = express()
const port = process.env.PORT || 5000

app.use(cors());
app.use(express.json());

const uri = "mongodb+srv://technology:G1bLQrOu15eCGUip@cluster0.xy3vc.mongodb.net/?retryWrites=true&w=majority";


const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect();
        const productsCollection = client.db("technology_holdings").collection("products");
        const orderCollection = client.db("technology_holdings").collection("order");

        // products shown
        app.get('/product', async (req, res) => {
            const query = {};
            const cursor = productsCollection.find(query);
            const products = await cursor.toArray();
            res.send(products);
        });

        app.get('/order', async (req, res) => {
            const email = req.query.email;
            const query = { email: email };
            const order = await orderCollection.find(query).toArray();
            res.send(order);
        })

        // order place
        app.post('/order', async (req, res) => {
            const order = req.body;
            const result = await orderCollection.insertOne(order);
            res.send(result);
        })
    }
    finally {

    }
}
run().catch(console.dir);



app.get('/', (req, res) => {
    res.send('Technology Holdings')
})

app.listen(port, () => {
    console.log(`Technology holding server side ${port}`)
})