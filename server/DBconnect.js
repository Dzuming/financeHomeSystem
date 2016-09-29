
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    var productSchema = mongoose.Schema({
        name: String,
        category: String,
        Spending: Number,
    });
    var Product = mongoose.model('Product', productSchema);
    var silence = new Product({
        name: 'Silence',
        category: 'jedzenie',
        Spending: 30

    });
    fluffy.save(function (err, fluffy) {
        if (err) return console.error(err);
        fluffy.speak();
    });

});