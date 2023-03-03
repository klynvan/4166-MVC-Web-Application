const express = require('express');
const controller = require('../controllers/connectionsControllers');
const { isLoggedIn, isHost } = require('../middlewares/auth');
const { validateId } = require('../middlewares/validator');



const router = express.Router();

//GET /connections: send all connections to users
router.get('/', controller.index);

//GET /connections/new: send html form for creating a new connection
router.get('/new', isLoggedIn, controller.new);

//POST /connections/new: create new story 
router.post('/', isLoggedIn, controller.create);

//GET /connections/:id: send details of story identified by id
router.get('/:id', validateId, controller.show);

//GET /connections/:id:/edit: send html form for editing a connection
router.get('/:id/edit', validateId, isLoggedIn, isHost, controller.edit);

//PUT /connections/:id: update connection identified by id
router.put('/:id', validateId, isLoggedIn, isHost, controller.update);

//DELETE /connections/:id:  delete connection identified by id
router.delete('/:id', validateId, isLoggedIn, isHost, controller.delete);

router.get('/:id/rsvp', isLoggedIn, controller.rsvp);

module.exports = router;
