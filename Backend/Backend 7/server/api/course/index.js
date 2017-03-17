let express = require('express');
let controller = require('./courseController.js')
let router = express.Router();

router.get('/all', controller.getAll);

router.post('/create', controller.create);

module.exports = router;
