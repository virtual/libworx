var express = require('express');
var app = express();
var bodyParser= require('body-parser');
var mongoose = require('mongoose');
var port = 5000; 
var request = require('request');
require('dotenv').config();

app.use(bodyParser.json({ type: "application/json" }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('semantic/dist'))

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
})

app.listen(port, function() {
  console.log('listening on ' + port);
});