let mongoose = require('mongoose');

let instructor = mongoose.Schema({
	name : {
		type		: String,
		require	:	true
	},
	age	: Number,
	teach	: [{
		type	: mongoose.Schema.Types.ObjectId,
		ref		: 'course'
	}]
});

module.exports = mongoose.model('instructor', instructor);
