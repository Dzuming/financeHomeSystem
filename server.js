var express = require('express');

var mongoose = require('mongoose');
var app = express();
app.use(express.static(__dirname + '/server'));
app.use(express.static(__dirname + '/client'));

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/finance-system')
var productSchema = mongoose.Schema({
  name: String,
  category: String,
  Spending: Number,
});
var Product = mongoose.model('Product', productSchema);
// var silence = new Product({
//   name: 'Silence',
//   category: 'jedzenie',
//   Spending: 30

// });
// silence.save(function (err, silence) {
//   if (err) return console.error(err);
//   "error";
// });
app.get('/finance-system/Product', function(req, res) {

        // use mongoose to get all todos in the database
        Product.find(function(err, Product) {

            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err)
                res.send(err)

            res.json(Product); // return all todos in JSON format
        });
    });
var server = app.listen(3000, function () {
  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port)
})