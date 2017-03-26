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
    Budget.find({}, (err, Budget) => {
        res.status(200).json(Budget);
    })
}
exports.create = function(param) {
    Promise.all([
        spending.find({})
        .populate("Category")
        .exec((err, value) => {
            spendingValue = spending.sumValues(value, 'Spending')
        }),
        profit.find({})
        .populate("Category")
        .exec((err, value) => {
            profitValue = spending.sumValues(value, 'Profit')
        })
    ]).then(function() {
        Budget.find({}, (err, Value) => {
            let newBudget = new Budget({
                Overall: Value[0].Overall + param,
                DateCreated: Date.now()
            })

            newBudget.save((error => {
                if (error) res.status(500).send(error);
            }))
        })
    })
}