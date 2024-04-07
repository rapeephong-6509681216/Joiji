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
  
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});