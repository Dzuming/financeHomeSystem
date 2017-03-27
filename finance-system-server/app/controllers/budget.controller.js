const mongoose = require('mongoose');
const Budget = mongoose.model('Budget');
const spending = mongoose.model('spending');
const profit = mongoose.model('profit');
let spendingValue;
let profitValue;
// exports.create = function(req, res) {
//     var johndoe = new Budget({
//         Overall: 10000
//     });
//     johndoe.save(function(err) { if (err) console.log('Error on save!') });
// }
exports.index = function(req, res) {
    Budget
        .findOne({}, (err, Budget) => {
            res.status(200).json(Budget);
        })
        .sort({ 'DateCreated': 'desc' })
}