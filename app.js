//require modules
const express = require('express');
const methodOverride = require('method-override');
const morgan = require('morgan');
const mongoose = require('mongoose');
const session = require('express-session');
const flash = require('connect-flash');
const MongoStore = require('connect-mongo');
const User = require('./models/users');

const connectionRoutes = require('./routes/connectionRoutes')
const mainRoutes = require('./routes/mainRoutes')
const userRoutes = require('./routes/userRoutes');

///create app
const app = express();

//figure app
let port = 3000;
let host = 'localhost';
let url = 'mongodb://localhost:27017/NBAD';
app.set('view engine', 'ejs');

//connect to database
mongoose.connect(url)
    .then(() => {
        app.listen(port, host, () => {
            console.log('Server is running on port', port);
        });
    })
    .catch(err => console.log(err.message));

//mount middlware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('tiny'));
app.use(methodOverride('_method'));

app.use(session({
    secret: 'vshjidfuhvsdkjfnsfjsdiv',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60 * 60 * 1000 },
    store: new MongoStore({ mongoUrl: 'mongodb://localhost:27017/NBAD' })
}));

app.use(flash());

app.use((req, res, next) => {
    console.log(req.session);
    res.locals.users = req.session.users || null;
    res.locals.successMessages = req.flash('success');
    res.locals.errorMessages = req.flash('error');
    next();
});


//set up routes
app.use('/', mainRoutes);
app.use('/connections', connectionRoutes);
app.use('/users', userRoutes);

app.use((req, res, next) => {
    let err = new Error('The server cannot locate ' + req.url);
    err.status = 404;
    next(err);

});
app.use((err, req, res, next) => {
    console.log(err.stack);
    if (!err.status) {
        err.status = 500;
        err.message = ('Internal Server Error')
    }
    res.status(err.status);
    res.render('error', { error: err });
});

