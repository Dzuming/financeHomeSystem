"use strict"

const mongoose = require('mongoose');
const User = mongoose.model('User');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const config = require('../../config/config');

exports.index = function(req, res) {
    User.find({}, (err, User) => {
        res.status(200).json(User);
    })
}

exports.create = function(req, res) {
    const passwordAndSalt = User.method.encryptPassword(req.body.Password, User.method.genRandomString(16));
    let newUser = new User({
        Name: {
            First: req.body.Name.First,
            Second: req.body.Name.Second
        },
        Email: req.body.Email,
        Password: passwordAndSalt.passwordHash,
        Salt: passwordAndSalt.salt,
        Admin: false
    })
    newUser.save((error => {
        if (error) res.status(500).send(error);
        res.status(201).json({
            message: 'Question created successfully'
        });
    }))
}

exports.authenticate = function(req, res) {
    User.findOne({
        Email: req.body.Email
    }, function(err, user) {
        if (err) throw err;
        if (!user) {
            res.json({ success: false, message: 'Authentication failed. User not found.' });
        } else if (user) {
            let hashedPassword = User.method.encryptPassword(req.body.Password, user.Salt).passwordHash
                // check if password matches
            if (user.Password != hashedPassword) {
                res.json({ success: false, message: 'Authentication failed. Wrong password.' });
            } else {

                // if user is found and password is right
                // create a token
                var token = jwt.sign({ user: user }, config.secret, { expiresIn: '1h' });
                // return the information including token as JSON
                res.json({
                    success: true,
                    message: 'Enjoy your token!',
                    token: token,
                    _id: user._id,
                    Email: user.Email,
                });
            }
        }
    })
}
User.method = {
    genRandomString: function(length) {
        return crypto.randomBytes(Math.ceil(length / 2))
            .toString('hex') /** convert to hexadecimal format */
            .slice(0, length); /** return required number of characters */
    },
    sha512: function(password, salt) {
        let hash = crypto.createHmac('sha512', salt); /** Hashing algorithm sha512 */
        hash.update(password);
        let value = hash.digest('hex');
        return {
            salt: salt,
            passwordHash: value
        };
    },
    encryptPassword: function(password, saltValue) {
        const salt = saltValue
        return this.sha512(password, salt);
    }

}