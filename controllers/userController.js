const { validationResult } = require('express-validator');
const Users = require('../models/users');
const Connection = require('../models/connections');
const rsvp = require('../models/rsvp');

exports.new = (req, res) => {
    res.render('./users/new');
};

//create new user
exports.create = (req, res, next) => {
    let errors = validationResult(req);

    let users = new Users(req.body);
    if (users.email)
        users.email = users.email.toLowerCase();

    users.save()
        .then(() => res.redirect('/users/login'))
        .catch(err => {
            if (err.name === 'ValidationError') {
                req.flash('error', err.message);
                return res.redirect('/users/new')
            }
            if (err.code === 11000) {
                req.flash('error', 'Email address has be taken')
                return res.redirect('/users/new')
            }

            next(err);
        });
};



// get the login form
exports.login = (req, res) => {
    res.render('./users/login');
};

exports.signin = (req, res) => {

    // authenticate user email
    let email = req.body.email;

    if (email)
        email = email.toLowerCase();

    let password = req.body.password;

    //get the user that matches the email
    Users.findOne({ email: email })
        .then(users => {
            if (users) {
                //user found in dtatabase
                users.comparePassword(password)
                    .then(result => {
                        if (result) {
                            req.session.users = users._id; //store user's if
                            req.flash('success', 'You have sucessfully logged in!');
                            res.redirect('/users/profile');
                        } else {
                            console.log('wrong password');
                            req.flash('error', 'Wrong password!');
                            res.redirect('/users/login')
                        }
                    })
            } else {
                console.log('wrong email address');
                req.flash('error', 'Wrong email address!');
                res.redirect('/users/login');
            }
        })
        .catch()
};

exports.profile = (req, res, next) => {
    let id = req.session.users;
    Promise.all([Users.findById(id), Connection.find({ hostname: id }), rsvp.find({ attendee: id })])
        .then(results => {
            const [user, connection] = results;
            res.render('./users/profile', { user, connection });
        })
        .catch(err => next(err));
};

exports.logout = (req, res, next) => {
    req.session.destroy(err => {
        if (err)
            return next(err);
        else
            res.redirect('/');
    });
};


