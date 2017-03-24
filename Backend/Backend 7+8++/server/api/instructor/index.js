let express = require('express');
let controller = require('./instructorController.js');
let router = express.Router();
let auth = require('../user/authService.js');

router.get('/getAll', auth.checkPermission('instructor', 'view'), controller.find);

router.post('/create', auth.hasRole('admin'), auth.checkPermission('instructor', 'create'), controller.create);

module.exports = router;
