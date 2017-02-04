const mongoose = require('mongoose');
const Budget = mongoose.model('Budget');

// exports.create = function(req, res) {
//     var johndoe = new Budget({
//         Overall: 10000
//     });
//     johndoe.save(function(err) { if (err) console.log('Error on save!') });
// }

exports.index = function(req, res) {
    Budget.find({}, (err, Budget) => {
        res.status(200).json(Budget);
    })
}