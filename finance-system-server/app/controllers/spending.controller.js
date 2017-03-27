"use strict"

const mongoose = require('mongoose');
const spending = mongoose.model('spending');
const Budget = mongoose.model('Budget');
exports.create = function(req, res, next) {
    let newSpending = new spending({
        Category: req.body.categoryId,
        Description: req.body.Description,
        Spending: req.body.Spending,
        User: req.body.userId,
        DateCreated: Date.now()
    })
    newSpending.save((error => {
        if (error) res.status(500).send(error);
        res.status(201).json({
            message: 'Question created successfully'
        });
    }))
    Budget.findOne({}, (err, Value) => {
            let newBudget = new Budget({
                Overall: Value.Overall + req.body.Spending,
                DateCreated: Date.now()
            })
            Budget.createBudget(newBudget)
        })
        .sort({ 'DateCreated': 'desc' })
}
exports.index = function(req, res) {
    spending.find({})
        .select('-User[Password]')
        .populate("Category")
        .populate("User", "Email")
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