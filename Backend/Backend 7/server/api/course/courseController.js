//Course is a model
let Course = require('./courseModel.js');

module.exports = {
	getAll : (req, res) => {
		Course.find((err, data) => {
			if (err) {
				console.log(err);
			} else {
				res.json(data);
			}
		})
	},

	create : (req, res) => {
		let webCourse = new Course({
			"name"  : req.body.name,
			"title"	:	req.body.title
		});
		webCourse.save((err, data) => {
			if (err) {
				console.log(err);
			} else {
				res.send("success");
			}
		});
	}
}

// {
// 	"name"	: "Web Full Stack",
// 	"title"	: "front + back"
// }
