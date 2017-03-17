let mongoose = require('mongoose');

let user =  mongoose.Schema({
	name			: String,
	username	: {
		type			: String,
		require		: true
	},
	age				: Number,
	school		: String
});

module.exports = mongoose.model('user', user);
