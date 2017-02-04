'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const BudgetSchema = new Schema({
    Overall: { type: Number },
    DateCreated: { type: Date, default: '' },
});
mongoose.model('Budget', BudgetSchema);