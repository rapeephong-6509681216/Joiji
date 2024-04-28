const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser'); // TAE
require('dotenv').config()

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
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

app.post('/staff', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  connection.query(
    'SELECT password FROM staffs WHERE username = ?',
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

// TAE
app.put('/update', (req, res) => {
  const username = req.body.username;
  const addressLine = req.body.addressLine;
  const city = req.body.city;
  const country = req.body.country;
  const zipcode = req.body.zipcode;
  const phone = req.body.phone;
  

  connection.query(
    "UPDATE users SET addressLine = ?, city = ?, zipcode = ?, country = ?, phone = ? WHERE username = ? ", 
    [addressLine, city, zipcode, country, phone, username],
    (err, result) => {
      if (err) {
        console.error('Error updating address:', err);
        res.status(500).send("Error updating address");
      } else {
        console.log("Address updated successfully");
        res.status(200).send("Address updated successfully");
      }
    }
  );
});

app.post('/create',(req, res) => {
  const first_name = req.body.first_name;
  const last_name = req.body.last_name;
  const addressLine = req.body.addressLine;
  const city = req.body.city;
  const country = req.body.country;
  const zipcode = req.body.zipcode;
  const phone = req.body.phone;

  connection.query(
      "INSERT INTO users (first_name,last_name,addressLine,city,zipcode,country,phone) VALUES(?,?,?,?,?,?,?)", 
      [first_name, last_name, addressLine, city, zipcode,country, phone],
      (err,result) => {
          if(err){
              console.log(err)
          }else{
              res.send("Values inserted");
          }
      }
  );
})

app.post('/register', (req, res) => {
  const userInfo = req.body.userInfo;
  const subscription = req.body.subscriptionInfo;

  connection.query(
    `INSERT INTO users (username, password, first_name, last_name, phone, addressLine, city, country, zipcode)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);`,
    [userInfo.username, userInfo.password, userInfo.first_name, userInfo.last_name, userInfo.phone,
    userInfo.addressLine, userInfo.city, userInfo.country, userInfo.zipcode],
    function (err, result) {
      if (err) {
        console.error('Error querying database:', err);
        return res.status(500).json({ success: false, message: "Register Failed" });
      }

      connection.query(
        `INSERT INTO subscription (username, startDate, endDate, quota, subType, price)
        VALUES (?, CURDATE(),DATE_ADD(CURDATE(), INTERVAL 1 MONTH), ?, ?, ?);`,
        [userInfo.username, subscription.quota, subscription.subType, subscription.price],
        function (err, result) {
          if (err) {
            console.error('Error querying database:', err);
            return res.status(500).json({ success: false, message: "Register Failed" });
          }
          
          return res.status(200).json({ success: true, message: "Register Success" });
        }
      );
    }
  );
});
// TAE

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
