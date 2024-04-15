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
  let current_film_stock;

  connection.query(
    'SELECT stock FROM films WHERE filmID = ?',
    [filmID],
    function (err, results) {
      if (err) {
        console.error('Error querying database:', err);
        res.status(500).send('Error querying database');
        return;
      }
      current_film_stock = results[0].stock;

      if (current_film_stock <= 0) {
        res.status(400).send('This movie is out of stock');
        return;
      }
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
            res.status(400).send('You has reached the maximum number of movies in queue.');
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
                res.status(400).send('This movie is already in your queue.');
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
                  res.status(201).send('Movie added to queue.');
                }
              );
            }
          );
        }
      );
    }
  );
});

app.put('/:filmID/stock', (req, res) => {
  const filmID = req.params.filmID;

  connection.query(
    'UPDATE films SET stock = stock - 1 WHERE filmID = ?',
    [filmID],
    function (err, results) {
      if (err) {
        console.error('Error querying database:', err);
        res.status(500).send('Error querying database');
        return;
      }
      res.status(200).send('Stock updated');
    }
  )
})

app.post('/user', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  connection.query(
    'SELECT password FROM users WHERE username = ?',
    [username],
    function (err, results) {
      if (err) {
        console.error('Error querying database:', err);
        res.status(500).send('Error querying database');
        return;
      }
      if (results.length <= 0 || results[0].password !== password) {
        res.status(400).send('Incorrect username or password.');
        return;
      }

      res.status(200).send('User logged in');
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

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
