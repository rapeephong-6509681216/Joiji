const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
require('dotenv').config()

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
});

const app = express();
const port = process.env.SERVER_PORT

app.use(cors());

app.get('/movies/:category/poster', (req, res) => {
  const category = req.params.category;
  if (category === 'All') {
    connection.query(
      'SELECT filmID, poster_path FROM films',
      function (err, results) {
        if (err) {
          console.error('Error querying database:', err);
          res.status(500).send('Error querying database');
          return;
        }
        res.json(results);
      }
    );
  } else if (category === 'Top10') {
    connection.query(
      'SELECT filmID, poster_path FROM films ORDER BY Avg_rating DESC LIMIT 10',
      function (err, results) {
        if (err) {
          console.error('Error querying database:', err);
          res.status(500).send('Error querying database');
          return;
        }
        res.json(results);
      }
    );
  } else {
    connection.query(
      'SELECT filmID, poster_path FROM films WHERE genre = ?',
      [category],
      function (err, results) {
        if (err) {
          console.error('Error querying database:', err);
          res.status(500).send('Error querying database');
          return;
        }
        res.json(results);
      }
    );
  }
});

app.get('/movies/poster/search/:searchInput', (req, res) => {
  const search = req.params.searchInput;
  connection.query(
    'SELECT filmID, poster_path FROM films WHERE title LIKE ?',
    ['%' + search + '%'],
    function (err, results) {
      if (err) {
        console.error('Error querying database:', err);
        res.status(500).send('Error querying database');
        return;
      }
      res.json(results);
    }
  );
});

app.get('/movies/:filmID', (req, res) => {
  const filmID = req.params.filmID;
  connection.query(
    'SELECT * FROM films WHERE filmID = ?',
    [filmID],
    function (err, results) {
      if (err) {
        console.error('Error querying database:', err);
        res.status(500).send('Error querying database');
        return;
      }
      res.json(results);
    }
  );
});

app.get('/movies/:filmID/director', (req, res) => {
  const filmID = req.params.filmID;
  connection.query(
    'SELECT director FROM directors WHERE filmID = ?',
    [filmID],
    function (err, results) {
      if (err) {
        console.error('Error querying database:', err);
        res.status(500).send('Error querying database');
        return;
      }
      res.json(results);
    }
  );
});

app.get('/movies/:filmID/star', (req, res) => {
  const filmID = req.params.filmID;
  connection.query(
    'SELECT star FROM stars WHERE filmID = ?',
    [filmID],
    function (err, results) {
      if (err) {
        console.error('Error querying database:', err);
        res.status(500).send('Error querying database');
        return;
      }
      res.json(results);
    }
  );
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});