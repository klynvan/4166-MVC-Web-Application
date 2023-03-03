const express = require('express');
const controller = require('../controllers/mainControllers');


const router = express.Router();

//get index
router.get('/', controller.index);
//GET /about:
router.get('/about', controller.about);
// get contact
router.get('/contact', controller.contact);




module.exports = router;