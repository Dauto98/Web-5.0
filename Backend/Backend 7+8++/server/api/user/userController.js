let User = require('./userModel.js');

module.exports = {
	find	: (req, res) => {
		if (req.query) {
			let query = {};
			if (req.query.name) {
				query.name = req.query.name;
			};
			if (req.query.username) {
				query.username = req.query.username;
			};
			if (req.query.ageFrom) {
				if (!query.age) {
					query.age = {};
				};
				query.age.$gte = parseInt(req.query.ageFrom);
			};
			if (req.query.ageTo) {
				if (!query.age) {
					query.age = {};
				};
				query.age.$lte = parseInt(req.query.ageTo);
			};
			if (req.school) {
				query.school = req.query.school;
			};
			User.find(query).sort('name').populate({path: 'created', select: 'name -_id'}).exec((err, data) => {
				if (err) {
					res.send("ERROR: ", err);
				} else {
					res.json(data);
				}
			});
		} else {
			res.json([]);
		};
	},

	create	: (req, res) => {
		if (req.body) {
			User.findOne({username: req.body.username}).exec((err, data) => {
				if (data) {
					res.json({status: false, message: "user is already existed"});
				} else {
					let newUser = new User(req.body);
					newUser.save().then(
						(data) => {res.json({status: true, message: "user's created"})},
						(err) => {res.send(err)}
					)
				}
			})
		}
	},

	edit 	: (req, res) => {
		if (req.body) {
			User.findOne({username: req.body.username}).exec((err, data) => {
				if (data) {
					data.name = req.body.name;
					data.age = req.body.age;
					data.school = req.body.school;
					data.username = req.body.newUsername;

					data.save().then(
						(newData) => {res.json({status: true, message: "user's updated"})},
						(err) => {res.json(err)}
					);
				} else {
					res.json({status: false, message: "this user doesn't exist"})
				};
			});
		} else {
			res.json({status: false, message: "update failed"})
		}
	},

	deleteUser 	: (req, res) => {
		User.findOne({username: req.params.username}).exec((err, data) => {
			if (data) {
				data.remove((err) => {
					if (err) {
						res.json({status: false, message: "remove failed"});
					} else {
						res.json({status: true, message: "remove success"});
					};
				});
			} else {
				res.json({status: false, message: "don't have such user to delete"});
			};
		});
	},
}
