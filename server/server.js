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
app.use(express.json())

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

app.post('/:user/queue', (req, res) => {
  const user = req.params.user;
  const filmID = req.body.filmID;
  let current_user_queue;

  connection.query(
    'SELECT COUNT(*) as user_Queue FROM orders WHERE username = ?',
    [user],
    function (err, results) {
      if (err) {
        console.error('Error querying database:', err);
        res.status(500).send('Error querying database');
        return;
      }
      current_user_queue = results[0].user_Queue;
      if (current_user_queue >= 5) {
        res.status(400).send('User has reached the maximum number of movies in queue');
        return;
      }

      connection.query(
        'SELECT * FROM orders WHERE username = ? AND filmID = ?',
        [user, filmID],
        function (err, results) {
          if (err) {
            console.error('Error querying database:', err);
            res.status(500).send('Error querying database');
            return;
          }

          if (results.length > 0) {
            res.status(400).send('This movie is already in the queue');
            return;
          }

          connection.query(
            'INSERT INTO orders (user_Queue, order_Status, rentDate, returnDate, username, filmID) VALUES (?, ?, ?, ?, ?, ?)',
            [current_user_queue + 1, 'Booking', new Date(), null, user, filmID],
            function (err, results) {
              if (err) {
                console.error('Error querying database:', err);
                res.status(500).send('Error querying database');
                return;
              }
              res.status(201).send('Movie added to queue');
            }
          );
        }
      );
    }
  );
});


//  let quota;

// connection.query(
//   'SELECT quota FROM subscription WHERE username = ?',
//   [user],
//   function (err, results) {
//     if (err) {
//       console.error('Error querying database:', err);
//       res.status(500).send('Error querying database');
//       return;
//     }
//     if (results.length === 0) {
//       res.status(404).send('User not found');
//       return;
//     }
//     quota = results[0].quota;

//     if (quota === 0 || current_user_queue >= 5) {
//       res.status(400).send('User has reached the maximum number of movies in queue');
//       return;
//     }

// app.put('/:user/quota', (req, res) => {
//   const user = req.params.user;
//   connection.query(
//     'UPDATE subscription SET quota = quota - 1 WHERE username = ?',
//     [user],
//     function (err, results) {
//       if (err) {
//         console.error('Error querying database:', err);
//         res.status(500).send('Error querying database');
//         return;
//       }
//       res.status(200).send('Quota updated');
//     }
//   );

// });

app.get('/user', (req, res) => {
  connection.query(
    'SELECT * FROM users',
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
