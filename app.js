var express = require('express');
var app = express();
var bodyParser= require('body-parser');
var mongoose = require('mongoose');
var port = 5000;
var config = require('./src/config.js');
var request = require('request');
app.use(express.static('public'))
app.set("view engine", 'ejs');

app.get("/", function(req, res){
  res.render("search");
});


app.get('/results', function(req, res) {
  var search = req.query.search;
  var url = 'https://api.themoviedb.org/3/search/movie?api_key='+ config.moviedbAPI + '&language=en-US&query='+ search +'&page=1&include_adult=false';
  request(url, function(err, response, body){
    if (!err && res.statusCode === 200) {
      var data = (JSON.parse(body));
      res.render('results', {data: data});
    }  
  });
})

app.listen(port, function() {
  console.log('listening on ' + port);
});