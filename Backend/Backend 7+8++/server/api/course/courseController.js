//Course is a model
let Course = require('./courseModel.js');
let User = require('../user/userModel.js');
let Instructor = require('../instructor/instructorModel.js');
let jwt = require('jsonwebtoken');
let configs = require('../../configs/index.js');

module.exports = {
	getAll : (req, res) => {
		Course.find().sort("name").select('-_id').populate({path: 'createBy', select: 'name -_id'}).populate({path: 'taughtBy', select: 'name -_id'}).exec((err, data) => {res.json(data)});
	},

	create : (req, res) => {
		let webCourse = new Course(req.body);
		webCourse.createBy = req.user;
		webCourse.save((err, data) => {
			if (err) {
				res.send(err);
			} else {
				//add this course to creator's profile
				User.findOneAndUpdate({'_id' : data.createBy}, {$push: {"created" : data._id}}).exec((err, userData) => {
					if (err) {
						res.json({status: false, message: err});
					};
				});
				//add this course to instructor's profile
				for (let i = 0; i < data.taughtBy.length; i++) {
					Instructor.findOneAndUpdate({'_id' : data.taughtBy[i]}, {$push: {"teach" : data._id}}).exec((err, userData) => {
						if (err) {
							res.json({status: false, message: err});
						};
					});
				}
				res.send("success");
			}
		});
	}
}
