var express = require('express');
var app = express();
var bodyParser= require('body-parser');
var mysql = require("mysql");
var port = 5000; 
var request = require('request');
var passport = require("passport") 
require('dotenv').config();

app.use(bodyParser.json({ type: "application/json" }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('semantic/dist')) 

// First you need to create a connection to the db
var con = mysql.createConnection({
  host: "localhost",
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DB
});
con.connect(function(err) {
  if (err) {
      console.log("SQL CONNECT ERROR: " + err);
  } else {
      console.log("SQL CONNECT SUCCESSFUL.");
  }
});
con.on("close", function (err) {
  console.log("SQL CONNECTION CLOSED.");
});
con.on("error", function (err) {
  console.log("SQL CONNECTION ERROR: " + err);
});

if (process.env.NODE_ENV === 'production') { 
  app.use(express.static("./client/build"));
} else {
  app.use(express.static("public"));  
}

app.post('/results', function(req, res) {
  console.log(req.body);
  var search = req.body.query;
  var url = 'https://api.themoviedb.org/3/search/movie?api_key='+ process.env.moviedbAPI + '&language=en-US&query='+ search +'&page=1&include_adult=false';
  console.log('requested', url)
  request(url, function(err, response, body){
    if (!err && res.statusCode === 200) {
      var data = (JSON.parse(body));
      res.json(data);
    }  
  });
});

app.post('/results/movies/:id', function(req, res) {
  console.log(req.body);
  var search = req.body.query;
  var url = 'https://api.themoviedb.org/3/movie/' + req.params.id + '?api_key='+ process.env.moviedbAPI + '&language=en-US';
  // https://api.themoviedb.org/3/movie/334543?api_key=e066dc69436f34c248064ea13f7b11d6&language=en-US
  console.log('requested', url)
  request(url, function(err, response, body){
    if (!err && res.statusCode === 200) {
      var data = (JSON.parse(body));
      res.json(data);
    }  
  });
})

app.get("/genres", function(req, res) {
  var url = 'https://api.themoviedb.org/3/genre/movie/list?api_key='+ process.env.moviedbAPI + '&language=en-US';
  console.log('requested', url)
  request(url, function(err, response, body){
    if (!err && res.statusCode === 200) {
      var data = (JSON.parse(body));
      res.json(data);
    }  
  });
})

app.get('/users', function(req, res) {
  User.find({}, function(err, users) {
    var userMap = {};
    users.forEach(function(user) {
      userMap[user._id] = user;
    });
    res.send(userMap);  
  });
});

app.get('/collections/:user_id', function(req, res) {
  let userId = req.params.user_id;
  var sql = `SELECT media.id, media.media_type_id, media.name, media.external_id, media.release_date FROM collection
    INNER JOIN media ON media.id=collection.media_id
    WHERE collection.user_id =  '${userId}'`;
  con.query(sql, function (err, result) {
    if (err) throw err;
    if (result.length > 0) { 
      res.json(result);
    } else {
      res.json({message: "No collection"})
    }
});
});



app.post('/login', function(req, res, next) {
  let user = {}; 
  user.username = req.body.username;
  user.password = req.body.password;
  console.log(user);
 
    var sql = `SELECT * FROM user WHERE username='${user.username}' AND password='${user.password}'`;
    con.query(sql, function (err, result) {
      if (err) throw err;
      if (result.length > 0) {
        let userData = result[0];
        userData.success = true;
        res.json(userData);
      } else {
        res.json({message: "Email and password do not match."})
      }
  });
});

app.post('/signup', function(req, res, next) {
  let user = {};
  user.firstName = req.body.firstName;
  user.lastName = req.body.lastName;
  user.email = req.body.email;
  user.password = req.body.password;
 
    var sql = `INSERT INTO user (username, password, name_first, name_last) VALUES ('${user.email}', '${user.password}', '${user.firstName}', '${user.lastName}')`;
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log(sql, "Success!");
  });
});

app.get('/logout', function(req, res){
  if (req.user) {
    req.logout();
    res.json({message: 'User logged out', loggedIn: false})
    req.session.destroy();
    
  } else {
    res.json({message: 'No user logged in', loggedIn: false})
    
  }
});

app.listen(port, function() {
  console.log('listening on ' + port);
});