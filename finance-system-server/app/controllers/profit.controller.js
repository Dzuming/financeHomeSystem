"use strict"

const mongoose = require('mongoose');
const profit = mongoose.model('profit');
const Budget = mongoose.model('Budget');
exports.create = function(req, res) {
    let newProfit = new profit({
        Category: req.body.categoryId,
        Description: req.body.Description,
        Profit: req.body.Profit,
        DateCreated: Date.now()
    })
    newProfit.save((error => {
        if (error) res.status(500).send(error);
        res.status(201).json({
            message: 'Question created successfully'
        });
    }))
    Budget.find({}, (err, Value) => {
        let newBudget = new Budget({
            Overall: Value[Value.length - 1].Overall + req.body.Profit,
            DateCreated: Date.now()
        })
        Budget.createBudget(newBudget)
    })
}

exports.index = function(req, res) {
    profit.find({})
        .populate("Category")
        .sort({ 'DateCreated': 'desc' })
        .exec((err, profit) => {
            if (!req.params.DateCreated) {
                res.status(200).json(profit)
            } else {
                res.status(200).json(profit.filter(element =>
                    element.DateCreated.toISOString().split('T')[0] //YYYY-MM-DD 
                    .includes(req.params.DateCreated.toString())))
            }
        })
}