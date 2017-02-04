"use strict"

const mongoose = require('mongoose');
const Product = mongoose.model('Product');

exports.create = function(req, res) {
    let newProduct = new Product({
        Category: req.body.categoryId,
        Description: req.body.Description,
        Spending: req.body.Spending,
        DateCreated: Date.now()
    })
    newProduct.save((error => {
        if (error) res.status(500).send(error);
        res.status(201).json({
            message: 'Question created successfully'
        });
    }))
}

exports.index = function(req, res) {

    Product.find({}, (err, Product) => {
        if (!req.params.DateCreated) {
            res.status(200).json(Product)
        } else {
            res.status(200).json(Product.filter(element =>
                element.DateCreated.toISOString().split('T')[0] //YYYY-MM-DD 
                .includes(req.params.DateCreated.toString())))
        }
    }).populate("Category")
}