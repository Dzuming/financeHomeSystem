var express = require('express');
var productUrl = '/finance-system/Product'
var mongoose = require('mongoose');
var app = express();
var bodyParser = require('body-parser');
app.use(express.static(__dirname + '/server'));
app.use(express.static(__dirname + '/client'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/finance-system', function () {
    /* Drop the DB */
    // mongoose.connection.db.dropDatabase();
});
var productSchema = mongoose.Schema({
    name: String,
    category: String,
    spending: Number,
});
var Product = mongoose.model('Product', productSchema);
// var test = new Product({
//   name: 'test1',
//   category: 'jedzenie1',
//   spending: 31

// });
// test.save(function (err, test) {
//   if (err){
//        return console.error(err);
//   }
//   console.log(test);
// });
app.get(productUrl, function (req, res) {

    // use mongoose to get all todos in the database
    Product.find(function (err, Product) {

        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err) {
            res.send(err)
        }


        res.json(Product); // return all todos in JSON format
        
    });
});
app.post(productUrl, function (req, res) {
    var obj = new Product(req.body);
    obj.save(function (err, obj) {
        if (err) {
            return console.error(err);
        }
        res.status(200).json(obj);
    });
});
var server = app.listen(3000, function () {
    var host = server.address().address
    var port = server.address().port

    console.log("Example app listening at http://%s:%s", host, port)
})