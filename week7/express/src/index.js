const express = require('express');
const { MongoClient } = require('mongodb');
const mysql = require('mysql');

// connect mysql
const mysqlConn = mysql.createConnection({
  host: 'localhost',
  user: 'admin',
  password: 'admin',
  database: 'todos'
});

mysqlConn.connect();

// create table
mysqlConn.query(`
  CREATE TABLE IF NOT EXISTS week7 (
    id int(10) NOT NULL AUTO_INCREMENT,
    name varchar(255),
    description varchar(255),
    PRIMARY KEY (id)
  ) ENGINE = INNODB DEFAULT CHARSET = utf8;
`);

// connect mongodb
const uri = 'mongodb://root:example@localhost:27017';
MongoClient.connect(uri, async (err, client) => {
  if (err) {
    throw err;
  }

  const mongodb = client.db('todos');

  const app = express();
  app.use(express.json());

  /* MongoDB */
  app.get('/mongo/todos/week7', (req, res) => {
    mongodb.collection('week7').find({}).toArray(function(err, result) {
      if (err) throw err;
      console.log(result);
      res.json(result);
    });
  });

  app.post('/mongo/todos/week7', (req, res) => {
    const data = req.body;

    console.log(data);

    mongodb.collection('week7').insertOne(data).then(() => {
      res.json(data);
    });
  });

  app.put('/mongo/todos/week7/:name', (req, res) => {
    const name = req.params.name;
    const data = req.body;

    console.log(data);

    mongodb.collection('week7').updateOne({ name }, { $set: data }).then(() => {
      res.json(data);
    });
  });

  app.delete('/mongo/todos/week7/:name', (req, res) => {
    const name = req.params.name;

    mongodb.collection('week7').deleteOne({
      name: name
    }).then(() => {
      res.send(`Delete ${name} success.`);
    });
  });

  /* MySQL */
  app.get('/mysql/todos/week7', (req, res) => {
    mysqlConn.query('select * from week7', function(err, rows, fields) {
      if (err) throw err;

      console.log(rows);

      res.json(rows);
    });
  });

  app.post('/mysql/todos/week7', (req, res) => {
    const data = req.body;

    console.log(data);

    const sql = `insert into week7 (name, description) values("${data.name}", "${data.description}");`;
    mysqlConn.query(sql, function(err, rows, fields) {
      if (err) throw err;

      console.log(rows);

      res.send(`Insert ${data.name} success.`);
    });
  });

  app.put('/mysql/todos/week7/:name', (req, res) => {
    const name = req.params.name;
    const data = req.body;

    console.log(data);

    const sql = `
      UPDATE week7
        SET name = "${data.name}", description = "${data.description}"
        WHERE name = "${data.name}";
    `;
    mysqlConn.query(sql, function(err, rows, fields) {
      if (err) throw err;

      res.send(`Update ${name} success.`);
    });
  });

  app.delete('/mysql/todos/week7/:name', (req, res) => {
    const name = req.params.name;
    console.log(name);

    const sql = `DELETE FROM week7 WHERE name = "${name}";`;
    mysqlConn.query(sql, function(err, rows, fields) {
      if (err) throw err;

      res.send(`Delete ${name} success.`);
    });
  })

  app.listen(8080, () => {
    console.log(`Example app listening at port: 8080`);
  });
});
