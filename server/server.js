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

// TEST 
app.get('/movies', (req, res, next) => {
    connection.query(
      'SELECT * FROM `films`',
      function (err, results, fields) {
        if (err) {
          console.error('Error querying database:', err);
          res.status(500).send('Error querying database');
          return;
        }
        res.json(results);
      }
    );
});
  
app.get('/movies/top10', (req, res, next) => {
  connection.query(
    'SELECT * FROM films ORDER BY Avg_rating DESC LIMIT 10',
    function (err, results, fields) {
      if (err) {
        console.error('Error querying database:', err);
        res.status(500).send('Error querying database');
        return;
      }
      res.json(results);
    }
  );
});

app.get('/movies/:id/director', (req, res, next) => {
  const movieId = req.params.id;
  connection.query(
      'SELECT d.director FROM films f JOIN directors d ON f.filmID = d.filmID WHERE f.filmID = ?',
      [movieId],
      function (err, results, fields) {
          if (err) {
              console.error('Error querying database:', err);
              res.status(500).send('Error querying database');
              return;
          }
          res.json(results);
      }
  );
});

app.get('/movies/:id/star', (req, res, next) => {
  const movieId = req.params.id;
  connection.query(
      'SELECT s.star FROM films f JOIN stars s ON f.filmId = s.filmID WHERE f.filmID = ?',
      [movieId],
      function (err, results, fields) {
          if (err) {
              console.error('Error querying database:', err);
              res.status(500).send('Error querying database');
              return;
          }
          res.json(results);
      }
  );
});

app.get('/movies/search/:title', (req, res, next) => {
  const MovieTitle = req.params.title;
  connection.query(
    'SELECT * FROM films WHERE title LIKE ?',
    [`%${MovieTitle}%`],
    function (err, results, fields) {
      if (err) {
        console.error('Error querying database:', err);
        res.status(500).send('Error querying database');
        return;
      }
      res.json(results);
    }
  )
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});