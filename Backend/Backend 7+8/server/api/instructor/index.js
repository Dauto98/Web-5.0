let express = require('express');
let controller = require('./instructorController.js');
let router = express.Router();

router.get('/getAll', controller.find);

router.post('/create', controller.create);

module.exports = router;
