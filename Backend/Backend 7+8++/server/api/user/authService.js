let jwt = require('jsonwebtoken');
let configs = require('../../configs/index.js');
let compose = require('composable-middleware');


module.exports = {
	authentication :  function(){
		return compose().use(function(req, res,next){
			jwt.verify(req.headers.authorization, configs.secret, (err, decoded) => {
				if (err) {
					res.json({status: false, message: err});
				} else {
					req.user = decoded.data;
					return next();
				}
			});
		})
	},

	checkPermission : function(checkWhat, permissionRequire){
		if (!permissionRequire || !checkWhat) {
			console.log("you forgot your permission, or forgot what you want to check ?? :D ??");
		};

		return compose().use(this.authentication())
										.use(function(req, res, next){
											if (configs.permission.indexOf(req.user.permission[checkWhat]) >= configs.permission.indexOf(permissionRequire)) {
												next();
											} else {
												res.json({status: false, message: 'you don\'t have permission to carry out this action'})
											}
										})
	},

	hasRole : function(roleRequire){
		if (!roleRequire) {
			console.log("you forgot your role");
		}

		return compose().use(this.authentication())
										.use(function(req, res, next){
											if (configs.role.indexOf(req.user.role) >= configs.role.indexOf(roleRequire)) {
												next();
											} else {
												res.json({status: false, message: "you don't have permission to carry out this action"});
											}
										})
	}
}
