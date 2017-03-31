let mongoose = require('mongoose');

let user = mongoose.Schema({
	username	 : String,
	id 				 : {
		type 			: Number,
		unique		: true,
		required 	: true
	},
	gamePlayed : [{
		name			: String,
		highscore	: Number
	}]
});

module.exports = mongoose.model('user', user);
