const express = require('express');
const { MongoClient } = require('mongodb');
require('dotenv').config();
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

//middleware 
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.oqk0s.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


async function run () {
    try{
        await client.connect();
        const database = client.db('tourist');
        const spotsCollection =database.collection('spots');
        const bookingCollection = database.collection('booking');
        
        // get products API
        app.get('/spots', async (req, res) => {
            const cursor = spotsCollection.find({});
            const spots = await cursor.toArray();
            res.send(spots);
        });

        //add booking API
        app.post('/booking', async (req, res) => {
            const booking = req.body;
            console.log('booking', booking);
            res.send('booking proccess');
        })
    }
    finally{
        // await client.close()
    }
}
run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('tourist spots traveling server is running');
});

app.listen(port, () => {
    console.log('server running a port', port);
})