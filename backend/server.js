require('dotenv').config()
const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const cors = require('cors');

app.use(cors());
app.use(bodyParser.json());
const MongoClient = require("mongodb").MongoClient;

const mainRoutes = require("./routes.js");
app.use("/", mainRoutes);

const connect = async () => {
    const client = new MongoClient(process.env.AZURE_DB_STRING);
    await client.connect(); //returns a promise / resolves the promise
    console.log("Connected to the database");
    const database = client.db("aihealth"); 
    return database;
}
// async await same as .then, created promises to use instead of callback function


const db = connect();
console.log(db);

const events = [
    { id: 1, name: 'Summer Beach Party', location: 'Beach', date: '2023-07-15' },
    { id: 2, name: 'Masquerade Ball', location: 'Grand Ballroom', date: '2023-08-25' },
    // Add more events as needed
];
//CRUD - GET, POST, PUT, DELETE
// get is a method of app, get creates the endpoint
// get takes two parameters, first is the path, next is the function that is called
// req = input, res = output object
//funcotin inside an object is a method
// .json, takes javascript variables and converts them to json format which is text that can be sent across the internet
// no longer converting to binary, now sending text instead
// modern web app, the server just produces json/data, and takes in json, sends the data to the browser and the browser generates the HTML
// node runs javascript , npm can install packages, and so npm can run node for us
app.get('/events', async (req, res) => {
    // const events = await db.collection('events').find()
    res.json(events);
//db.collection inserts 
});


const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


