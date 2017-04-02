let User = require('./userModel.js');
let Game = require('../game/gameModel.js');

module.exports = {
	createUser : (req, res) => {
		let newUser = new User(req.body);
		newUser.save((err, data) => {
			if (err) {
				res.send(err);
			} else {
				res.send("success, your ID is " + newUser.id);
			};
		});
	},

	//updateScore, send in body: id, game and score
	//update score in user data, then in game data
	updateScore	: (req, res) => {
		// find the user
		User.findOne({"id" : req.body.id}).exec((err, data) => {
			if (err) {
				res.send(err);
			} else {
				//find the game in the user's gamePlayed array
				let game = data.gamePlayed.find((value, index) => {
					return value.name === req.body.name;
				});
				// if the game exist in the gamePlayed array, then update new score, otherwise set the 1st score of the game
				if (game) {
					if (game.highscore < req.body.score) {
						// update
						data.gamePlayed[data.gamePlayed.indexOf(game)].highscore = req.body.score;
						// save the user to the DB
						User.findOneAndUpdate({'id' : req.body.id}, {'gamePlayed' : data.gamePlayed}).exec((err, data_update) => {
							if (err) {
								res.send(err);
							} else {
								console.log(data_update);
							}
						});
						res.json({status: true, message: 'update success 1'});
					} else {
						// the score is lower, just send the message
						res.json({status: true, message: 'update success 2'});
					}
				} else {
					//create new game object
					game = {
						name 			: req.body.name,
						highscore	: req.body.score
					};
					console.log("game: ", game);
					//save it to user data
					data.gamePlayed.push(game);
					console.log("data game played: ", data.gamePlayed);
					// save the user to the DB
					User.findOneAndUpdate({'id' : req.body.id}, {'gamePlayed' : data.gamePlayed}).exec((err, data_update) => {
						if (err) {
							res.send(err);
						} else {
							console.log("data user: ", data_update);
						}
					});
					// update highscore array in game
					Game.findOne({'name' : req.body.name}).exec((err, data_game) => {
						if (err) {
							res.send(err);
						} else {
							//add id to the highscore array
							data_game.highscore.push(data._id);
							// save the game to the DBs
							Game.findOneAndUpdate({'name' : req.body.name}, {'highscore' : data_game.highscore}).exec((err, data_gameUpdate) => {
								if (err) {
									res.send(err);
								} else {
									console.log("data game: ", data_gameUpdate);
								}
							});
						}
					});
					res.json({status: true, message: 'update success 3'});
				};
			}
		})
	},

	getAll : (req, res) => {
		User.findOne({'id' : req.params.id}).select('-_id -__v').exec((err, data) => {
			if (err) {
				res.send(err);
			} else {
				res.json(data);
			};
		});
	},

	getSpecificGame	: (req, res) => {
		User.findOne({'id' : req.params.id}).select('-_id -__v').exec((err, data) => {
			if (err) {
				res.send(err);
			} else {
				data.gamePlayed = data.gamePlayed.find((value, index) => {
					return value.name === req.params.name;
				});
				res.json(data);
			}
		})
	},

	getAllUser	: (req, res) => {
		User.find().select('-_id -__v').exec((err, data) => {
			if (err) {
				res.send(err);
			} else {
				res.json(data);
			}
		})
	}
}
