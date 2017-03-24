let express = require('express');
let controller = require("./userController.js");
let passport = require('passport');
let router = express.Router();
let jwt = require('jsonwebtoken');
let configs = require('../../configs/index.js');

require('./passport.js')();

router.get('/getUser', controller.find);

router.post('/create', controller.create);

router.put('/update', controller.edit);

router.delete('/delete/:username', controller.deleteUser);

router.post('/login', (req, res, next) => {
	passport.authenticate('local', function(err, user, info) {
		let error = err || info;
		if (error) {
			return res.status(401).json(error);
		}
		let token = jwt.sign({data: user}, configs.secret, {expiresIn: '10m'});
		res.json({status: true, message: 'login successful', token: token});
	})(req, res, next);
});

module.exports = router;
