const rateLimit = require('express-rate-limit');

exports.logInLimiter = rateLimit({
    windowMs: 60 * 1000,//1 minute time window
    max: 5,
    //message: ' Too many login request. Try again Later'
    handler: (req, res, next) => {
        let err = new Error('Too many login request. Try again Later');
        err.status = 429;
        return next(err)
    }
});
