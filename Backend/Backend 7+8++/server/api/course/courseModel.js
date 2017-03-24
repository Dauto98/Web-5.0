let mongoose = require('mongoose');

let course = mongoose.Schema({
	name	: {
		type	: String,
		unique	: true,
		require	: true
	},
	title	: String,
	img		: String,
	description	:	String,
	createBy : {
		type : mongoose.Schema.Types.ObjectId,
		ref	 : 'user'
	},
	taughtBy	:	[{
		type	: mongoose.Schema.Types.ObjectId,
		ref		: 'instructor'
	}]
});

//exports a model
module.exports = mongoose.model('course', course);
