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
    Budget.findOne({}, (err, Value) => {
            let newBudget = new Budget({
                Overall: Value[Value.length - 1].Overall + req.body.Profit,
                DateCreated: Date.now()
            })
            Budget.createBudget(newBudget)
        })
        .sort({ 'DateCreated': 'desc' })
}

exports.index = function(req, res) {
    profit.find({})
        .populate("Category")
        .populate("User", "Email")
        .sort({ 'DateCreated': 'desc' })
        .exec((err, profit) => {
            res.status(200).json(profit.filter(element => {
                if (element.User) {
                    return element.DateCreated.toISOString().split('T')[0] //YYYY-MM-DD 
                        .includes(req.params.DateCreated.toString()) && element.User.Email === req.params.Email
                }
            }))
        })
}