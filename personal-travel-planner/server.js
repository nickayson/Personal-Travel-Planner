const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 3001;

app.use(cors()); // Add this line to allow cross-origin requests
app.use(bodyParser.json()); // Add this line to parse JSON request bodies

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

// TRIP REQUESTS TRIP TABLE
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
    res.send({ id: result.insertId }); // Return the inserted id
  });
});

app.get('/', (req, res) => {
  const sql = 'SELECT id, name FROM trips'; // select both id and name columns

  connection.query(sql, (err, result) => {
    if (err) {
      console.error('Error retrieving trips: ', err);
      res.status(500).send('Error retrieving trips');
      return;
    }

    res.send(result); // send the result as is
  });
});

app.delete('/:id', (req, res) => {
  const { id } = req.params;

  const sql = 'DELETE FROM trips WHERE id = ?';
  const values = [id];

  connection.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error deleting trip: ', err);
      res.status(500).send('Error deleting trip');
      return;
    }

    if (result.affectedRows === 0) {
      res.status(404).send('Trip not found');
      return;
    }

    res.send('Trip deleted successfully');
  });
});


// EVENTS REQUESTS EVENTS TABLE
app.post('/events/:id', (req, res) => {
  const { id } = req.params;
  const { name, date, location, price, time } = req.body;

  const sql = 'INSERT INTO events (trip_id, name, date, location, price, time) VALUES (?, ?, ?, ?, ?, ?)';
  const values = [id, name, date, location, price, time];

  connection.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error adding event: ', err);
      res.status(500).send('Error adding event');
      return;
    }

    const insertId = result.insertId;
    res.json({ insertId });
  });
});

app.get('/events/:id', (req, res) => {
  const { id } = req.params;
  
  const sql = 'SELECT * FROM events WHERE trip_id = ?';
  const values = [id];

  connection.query(sql, values, (err, results) => {
    if (err) {
      console.error('Error retrieving events: ', err);
      res.status(500).send('Error retrieving events');
      return;
    }

    res.json(results);
  });
});

app.delete('/events/:id/:eventId', (req, res) => {
  const { id, eventId } = req.params;

  const sql = 'DELETE FROM events WHERE id = ? AND trip_id = ?';
  const values = [eventId, id];

  connection.query(sql, values, (err, results) => {
    if (err) {
      console.error('Error deleting event: ', err);
      res.status(500).send('Error deleting event');
      return;
    }

    res.sendStatus(204);
  });
});







