const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(cors()); // Add this line to allow cross-origin requests

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'travel_planner'
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL: ', err);
    return;
  }
  console.log('Connected to MySQL database');
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

app.post('/', (req, res) => {
  const { name } = req.body;

  const sql = 'INSERT INTO trips (name) VALUES (?)';
  const values = [name];

  connection.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error inserting trip: ', err);
      res.status(500).send('Error inserting trip');
      return;
    }
    res.send('Trip inserted successfully');
  });
});
