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
		type	: mongoose.Schema.Types.ObjectId,
		ref		: 'user'
	}]
});

module.exports = mongoose.model('game', game);
