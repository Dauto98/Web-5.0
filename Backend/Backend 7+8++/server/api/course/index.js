let express = require('express');
let controller = require('./courseController.js')
let router = express.Router();
let auth = require('../user/authService.js');

router.get('/all', auth.checkPermission('course', 'view'), controller.getAll);

router.post('/create', auth.hasRole('user'), auth.checkPermission('course', 'create'), controller.create);

module.exports = router;
