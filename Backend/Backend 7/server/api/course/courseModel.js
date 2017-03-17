let mongoose = require('mongoose');

let course = mongoose.Schema({
	name	: {
		type	: String,
		unique	: true,
		require	: true
	},
	title	: String,
	img		: String,
	description	:	String
});

//exports a model
module.exports = mongoose.model('course', course);
