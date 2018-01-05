var express = require('express');
var app = express();
var bodyParser= require('body-parser');
var mongoose = require('mongoose');
var mongodbUri = require("mongodb-uri");
mongoose.connect("mongodb://localhost/libworx");
let db = mongoose.connection;
var port = 5000; 
var request = require('request');
var passport = require("passport")
var User = require('./models/User.js')
require('dotenv').config();

app.use(bodyParser.json({ type: "application/json" }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('semantic/dist'))


 
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('database connected to LibWorx');
});


if (process.env.NODE_ENV === 'production') { 
  app.use(express.static("./client/build"));
} else {
  app.use(express.static("public"));  
}
 
var GitHubStrategy = require('passport-github').Strategy;
 
passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: "http://127.0.0.1:3000/auth/github/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ githubId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));

// Configure Passport authenticated session persistence.
//
// In order to restore authentication state across HTTP requests, Passport needs
// to serialize users into and deserialize users out of the session.  In a
// production-quality application, this would typically be as simple as
// supplying the user ID when serializing, and querying the user record by ID
// from the database when deserializing.  However, due to the fact that this
// example does not have a database, the complete Facebook profile is serialized
// and deserialized.
passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(passport.initialize());
app.use(passport.session());


app.get('/auth/github',
passport.authenticate('github'));

app.get('/auth/github/callback', 
passport.authenticate('github', { failureRedirect: '/login' }),
function(req, res) {
  // Successful authentication, redirect home.
  res.redirect('/');
});

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

app.listen(port, function() {
  console.log('listening on ' + port);
});