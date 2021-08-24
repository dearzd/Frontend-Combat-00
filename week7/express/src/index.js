const express = require('express');
const { MongoClient } = require('mongodb');

// Connection URI
const uri = 'mongodb://root:example@localhost:27017';

MongoClient.connect(uri, async (err, client) => {
  console.log(123);
  if (err) {
    throw err;
  }

  const db = client.db('todos');

  const app = express();
  app.use(express.json());

  app.get('/mongo/todos/week7', (req, res) => {
    db.collection('week7').find({}).toArray(function(err, result) {
      if (err) throw err;
      console.log(result);
      res.json(result);
    });
  });

  app.post('/mongo/todos/week7', (req, res) => {
    const data = req.body;

    console.log(data);

    db.collection('week7').insertOne(data).then(() => {
      res.json(data);
    });
  });

  app.delete('/mongo/todos/week7/:name', (req, res) => {
    console.log(req.params.name);

    db.collection('week7').deleteOne({
      name: req.params.name
    }).then(() => {
      res.send('ok');
    });
  });

  app.listen(8080);
});
