const express = require('express');
const { MongoClient } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;

const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

//middleware 
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.udott.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run(){
try{
    await client.connect();
    const database = client.db('motorSoroum');
    const servicesCollection = database.collection('motorCollection');

    //GET API home
    app.get('/motorCollection', async(req, res) => {
        const curser = servicesCollection.find().limit(6);
        const motorCollection = await curser.toArray();
        res.send(motorCollection);
    })
    //get api all motors
    app.get('/AllmotorCollection', async(req, res) => {
        const curser = servicesCollection.find().limit(12);
        const motorCollection = await curser.toArray();
        res.send(motorCollection);
    })

    // get single api
    

    //Post api
    app.post('/motorCollection', async(req, res) =>{
        const service = req.body;
        console.log('hit the post api', service);
        const result = await servicesCollection.insertOne(service);
        console.log(result)
        res.json(result);
    })
}
finally{
    //await client.close();
}

}

run().catch(console.dir);

app.get('/' , (req, res) => {
    res.send('Running motor Service')
})


app.listen(port, () => {
    console.log('Running Mortor cykel sorum' , port)
})