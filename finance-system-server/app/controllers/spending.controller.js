"use strict"

const mongoose = require('mongoose');
const spending = mongoose.model('spending');
const Budget = mongoose.model('Budget');
exports.create = function(req, res, next) {
    let newSpending = new spending({
        Category: req.body.categoryId,
        Description: req.body.Description,
        Spending: req.body.Spending,
        DateCreated: Date.now()
    })
    newSpending.save((error => {
        if (error) res.status(500).send(error);
        res.status(201).json({
            message: 'Question created successfully'
        });
    }))
    Budget.find({}, (err, Value) => {
        let newBudget = new Budget({
            Overall: Value[Value.length - 1].Overall + req.body.Spending,
            DateCreated: Date.now()
        })
        Budget.createBudget(newBudget)
    })
}
exports.index = function(req, res) {
    spending.find({})
        .populate("Category")
        .sort({ 'DateCreated': 'desc' })
        .exec((err, spending) => {
            if (!req.params.DateCreated) {
                res.status(200).json(spending)
            } else {
                res.status(200).json(spending.filter(element =>
                    element.DateCreated.toISOString().split('T')[0] //YYYY-MM-DD 
                    .includes(req.params.DateCreated.toString())))
            }
        })
}