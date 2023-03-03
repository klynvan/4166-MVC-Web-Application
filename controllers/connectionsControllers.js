const { connect, Connection } = require('mongoose');
const connection = require('../models/connections');
const model = require('../models/connections')
const RSVP = require('../models/rsvp');


exports.index = (req, res) => {
    //res.send('send all connection');
    model.find()
        .then(connections => res.render('./story/index', { connections }))
        .catch(err => next(err));
};

exports.new = (req, res) => {
    res.render('./story/new');
    //res.send('created new stort');

};


exports.create = (req, res, next) => {
    //res.send('created new stort');
    let connection = new model(req.body);
    connection.hostname = req.session.users;
    connection.save()
        .then((connection) => res.redirect('/connections'))
        .catch(err => {
            if (err.name === 'ValidationError') {
                err.status = 400;

            }
            next(err);
        });

};

exports.show = (req, res, next) => {
    let id = req.params.id;
    model.findById(id).populate('hostname', 'firstName lastName')
        .then(connection => {
            if (connection) {
                return res.render('./story/show', { connection });
            } else {
                let err = new Error('Cannot find a connection with id ' + id);
                err.status = 404;
                next(err);
            }
        })
        .catch(err => next(err));
};

exports.edit = (req, res, next) => {
    let id = req.params.id;
    model.findById(id)
        .then(connection => {
            if (connection) {
                return res.render('./story/edit', { connection });
            } else {
                let err = new Error('Cannot find a connection with id ' + id);
                err.status = 404;
                next(err);
            }
        })
        .catch(err => next(err));
};

exports.update = (req, res, next) => {
    let connection = req.body;
    let id = req.params.id;

    model.findByIdAndUpdate(id, connection)
        .then(connection => {
            if (connection) {
                res.redirect('/connections/' + id);
            } else {
                let err = new Error('Cannot find a connection with id ' + id);
                err.status = 404;
                next(err);
            }
        })
        .catch(err => {
            if (err.name === 'ValidationError')
                err.status = 400;
            next(err)
        });
};

exports.delete = (req, res, next) => {
    let id = req.params.id;
    model.findByIdAndDelete(id, { useFindandModify: false })
        .then(connection => {
            if (connection) {
                res.redirect('/connections');
            } else {
                let err = new Error('Cannot find a connection with id ' + id);
                err.status = 404;
                next(err);
            }
        })
        .catch(err => next(err));

};

exports.rsvp = (req, res, next) => {
    let id = req.params.id;
    let cur_user = req.session.users;
    //rsvp = req.session.users; // user that clicks rsvp is recorded 

    



    //d_check = RSVP.findById(id);
    //if (id_check == false) {
    //let rsvp_new = new RSVP({ connection_rsvp: id }, { attendee: cur_user }, { attendance: 'Undecided' });
    //rsvp_new.save();
    //} else {
    //RSVP.findOneAndUpdate({ connection_rsvp: id, attendee: cur_user }, { attendance: 'Yes' })
    //  .then(() => {
    // res.render('./users/profile');
    // })
    //.catch(err => next(err));
    //}

};
