const Connection = require('../models/connections');

//check if user is a guest
exports.isGuest = (req, res, next) => {
    if (!req.session.users) {
        return next();
    } else {
        req.flash('error', 'You are logged in already');
        return res.redirect('/users/profile');
    }
};
//check if user authenticated
exports.isLoggedIn = (req, res, next) => {
    if (req.session.users) {
        return next();
    } else {
        req.flash('error', 'You  must log in');
        return res.redirect('/users/login');
    }
};
//check if user is author
exports.isHost = (req, res, next) => {
    let id = req.params.id;
    Connection.findById(id)
        .then(connection => {
            if (connection) {
                if (connection.hostname == req.session.users) {
                    return next();
                } else {
                    let err = new Error('Unathorized User');
                    err.status = 401;
                    return next(err);
                }
            } else {
                let err = new Error('Cannot find a connection with id ' + id);
                err.status = 404;
                next(err);
            }
        })
        .catch(err => next(err));
};
