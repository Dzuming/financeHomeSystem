'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ProfitSchema = new Schema({
    Category: { type: Schema.ObjectId, ref: 'Category' },
    DateCreated: { type: Date, default: '' },
    Description: { type: String, default: '' },
    Profit: { type: Number, default: '' }
});
mongoose.model('profit', ProfitSchema);