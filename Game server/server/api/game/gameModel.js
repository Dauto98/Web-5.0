let mongoose = require('mongoose');

let game = mongoose.Schema({
	name			: {
		type			: String,
		required	: true,
		unique		: true
	},
	id 				: {
		type			: Number,
		required	: true,
		unique		: true
	},
	highscore	: [{
		id 				: Number,
		username	: String,
		score			: Number
	}]
});

module.exports = mongoose.model('game', game);
