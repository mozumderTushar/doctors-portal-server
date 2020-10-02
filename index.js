const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config()

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.jos17.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

const app = express()

app.use(bodyParser.json())
app.use(cors())

const port = 5000

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("doctorPortalTry").collection("add");
  console.log('db connection established');

  app.post('/addAppointment', (req, res) => {
      const appointment = req.body;
      collection.insertOne(appointment)
      .then(result => {
        res.send(result.insertedCount > 0)
      })
  })
});


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port)