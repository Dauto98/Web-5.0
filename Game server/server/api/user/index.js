let express = require('express');
let router = express.Router();
let controller = require('/userController.js');

//create an user
router.post('/create', controller.createUser);

//update score for user
router.post('/updateScore', controller.updateScore);

//get a list of user with id, without score
router.get('/getAll', controller.getAllUser);

//get all game played by the specific user with highscore
router.get('/:id/getAll', controller.getAll);

//get highscore in 1 game played by the specific user
router.get('/:id/:name', controller.getSpecificGame);

module.exports = router;
