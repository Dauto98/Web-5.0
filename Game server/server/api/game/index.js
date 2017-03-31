let express = require('express');
let router = express.Router();
let controller = require('./gameController.js');

//get a list of game with id, withour highscore
router.get('/all', controller.getAllGame);

//get top highscore of 1 specific game
router.get('/:name/all', controller.getAll);

//get highscore of 1 user in 1 game
router.get('/:name/:id', controller.getSpecificUser);

//create a game
router.post('/create', controller.createGame);

module.exports = router;
