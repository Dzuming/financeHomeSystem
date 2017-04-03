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
    Avatar: { data: Buffer, contentType: String },
    Salt: String,
    Admin: Boolean,
    Active: { type: Boolean, default: false }
});
mongoose.model('User', UserSchema);