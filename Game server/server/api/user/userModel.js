let mongoose = require('mongoose');

let gamePlayedShema = mongoose.Schema({
	name		: String,
	highscore : Number
},{_id : false});

let user = mongoose.Schema({
	username	 : String,
	id 				 : {
		type 			: Number,
		unique		: true,
		required 	: true
	},
	gamePlayed : [gamePlayedShema]
});

module.exports = mongoose.model('user', user);
