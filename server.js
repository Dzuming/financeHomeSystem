var express = require('express');
var MongoClient = require('mongodb').MongoClient;
var app = express();

app.use(express.static(__dirname + '/client'));
var server = app.listen(3000, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})
MongoClient.connect('mongodb://localhost:27017/animals', function(err, db) {
  if (err) {
    throw err;
  }
});