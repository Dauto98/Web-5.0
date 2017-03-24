let Instructor = require('./instructorModel.js');
let Course = require('../course/courseModel.js');

module.exports = {
	find	: (req, res) => {
		Instructor.find().sort('name').select('-_id').populate({path: 'teach', select: 'name -_id'}).exec((err, data) => {
			if (err) {
				res.send(err);
			} else {
				res.json(data);
			}
		});
	},

	create	: (req, res) => {
		let newIntructor = new Instructor(req.body);
		newIntructor.save((err, data) => {
			if (err) {
				res.json({status: false, message: 'error while creating instructor'});
			} else {
				if (req.body.teach) {
					//add this instructor to courses' profile
					for (var i = 0; i < data.teach.length; i++) {
						Course.findOneAndUpdate({'_id' : data.teach[i]}, {$push: {"taughtBy" : data._id}}).exec((err, userData) => {
							if (err) {
								res.json({status: false, message: err});
							};
						});
					}
				}
				res.json({status: true, message: 'success'});
			}
		})
	}
}
