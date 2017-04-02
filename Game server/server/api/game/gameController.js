let Game = require('./gameModel.js');
let User = require('../user/userModel.js');

module.exports = {
	getAll : (req, res) => {
		Game.findOne({'name' : req.params.name}).select('-_id -__v').populate({path: 'highscore', select: '-_id -__v'}).exec((err, data) => {
			if (err) {
				res.send(err);
			} else {
				//extract only 1 needed game in the gamePlayed array populated in highscore array
				let sortedHighscore = [];
				data.highscore.forEach((value, index) => {
					let temp = value.gamePlayed.find((val, ind) => {
						return val.name == req.params.name;
					});
					let temp2 = {};
					temp2.highscore = temp.highscore;
					temp2.username = value.username;
					temp2.id = value.id;
					sortedHighscore.push(temp2);
				});
				//sort the highscore list
				sortedHighscore = sortedHighscore.sort((a, b) => {
					if (a.highscore < b.highscore) {
						return 1;
					};
					if (a.highscore > b.highscore) {
						return -1;
					}
					return 0;
				});
				//replace it with old data
				let resData = {};
				resData.name = data.name;
				resData.id = data.id;
				resData.highscore = sortedHighscore;
				res.json(resData);
			};
		})
	},

	getSpecificUser : (req, res) => {
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

	getAllGame	: (req, res) => {
		Game.find().select('-_id -__v').exec((err, data) => {
			if (err) {
				res.send(err);
			} else {
				res.json(data);
			}
		})
	},

	createGame	: (req, res) => {
		let newGame = new Game(req.body);
		newGame.save((err, data) => {
			if (err) {
				res.send(err);
			} else {
				res.send('success');
			}
		});
	}
}
