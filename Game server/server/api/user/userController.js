let User = require('./userModel.js');
let Game = require('./gameModel.js');

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
					return value.name = req.body.name;
				});
				// if the game exist in the gamePlayed array, then update new score, otherwise set the 1st score of the game
				if (game) {
					if (game.highscore < req.body.score) {
						// update
						data.gamePlayed[data.gamePlayed.indexOf(game)].highscore = req.body.score;
						// save the user to the DB
						User.findOneAndUpdate({'id' : req.body.id}, {'gamePlayed' : data.gamePlayed});
						// update highscore array in game
						Game.findOne({'name' : req.body.name}).exec((err, data) => {
							if (err) {
								res.send(err);
							} else {
								//get that user in the game's highscore array
								let updateUser = data.highscore.find((value, index) => {
									return value.id = req.body.id;
								});
								//update
								data.highscore[data.highscore.indexOf(updateUser)].score = req.body.score;
								// save the game to the DB
								Game.findOneAndUpdate({'name' : req.body.name}, {'highscore' : data.highscore});
							}
						});
						res.json({status: true, message: 'update success'});
					} else {
						// the score is lower, just send the message
						res.json({status: true, message: 'update success'});
					}
				} else {
					//create new game object
					game = {
						name 			: req.body.name,
						highscore	: req.body.score
					};
					//save it to user data
					data.gamePlayed.push(game);
					// save the user to the DB
					User.findOneAndUpdate({'id' : req.body.id}, {'gamePlayed' : data.gamePlayed});
					// update highscore array in game
					Game.findOne({'name' : req.body.name}).exec((err, data) => {
						if (err) {
							res.send(err);
						} else {
							//create new data
							let newUser = {
								id				: req.body.id,
								username	: data.username,
								score			: req.body.score
							}
							//update
							data.highscore.push(newUser);
							// save the game to the DB
							Game.findOneAndUpdate({'name' : req.body.name}, {'highscore' : data.highscore});
						}
					});
					res.json({status: true, message: 'update success'});
				};
			}
		})
	},

	getAll : (req, res) => {
		User.findOne({'id' : req.params.id}).select('-_id').exec((err, data) => {
			if (err) {
				res.send(err);
			} else {
				res.json(data);
			};
		});
	},

	getSpecificGame	: (req, res) => {
		User.findOne({'id' : req.params.id}).select('-_id').exec((err, data) => {
			if (err) {
				res.send(err);
			} else {
				data.gamePlayed = data.gamePlayed.find((value, index) => {
					return value.name = req.params.name;
				});
				res.json(data);
			}
		})
	},

	getAllUser	: (req, res) => {
		User.find().select('username id').exec((err, data) => {
			if (err) {
				res.send(err);
			} else {
				res.json(data);
			}
		})
	}
}
