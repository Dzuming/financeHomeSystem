'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ProductSchema = new Schema({
    Category: { type: Schema.ObjectId, ref: 'Category' },
    DateCreated: { type: Date, default: '' },
    Description: { type: String, default: '' },
    Spending: { type: Number, default: '' }
});
mongoose.model('Product', ProductSchema);