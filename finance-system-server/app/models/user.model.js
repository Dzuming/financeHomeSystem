"use strict"

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    Name: {
        First: String,
        Second: String
    },
    Email: String,
    Password: String,
    Salt: String,
    Admin: Boolean
});
mongoose.model('User', UserSchema);