const express = require('express');
const controller = require('../controllers/userController');
const { isGuest, isLoggedIn } = require('../middlewares/auth');
const { logInLimiter } = require('../middlewares/rate_limiters');
const { validateSignUp, validateLogin, validateResults} = require('../middlewares/validator');

const router = express.Router();

//GET /stories/new: send html form for creating a new story

router.get('/new', isGuest, controller.new);

//POST /user: create a new user

router.post('/new', isGuest, validateSignUp, validateResults, controller.create);

router.get('/login', isGuest, controller.login);

router.post('/login', logInLimiter, isGuest, validateLogin, validateResults,  controller.signin);


router.get('/profile', isLoggedIn, controller.profile);

router.get('/logout', isLoggedIn, controller.logout);


module.exports = router;