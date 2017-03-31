let Game = require('./gameModel.js');

module.exports = {
	getAll : (req, res) => {
		Game.findOne({'name' : req.params.name}).select('-_id').exec((err, data) => {
			if (err) {
				res.send(err);
			} else {
				data.highscore = data.highscore.sort((a, b) => {
					if (a.score < b.score) {
						return -1;
					};
					if (a.score > b.score) {
						return 1;
					};
					return 0;
				});
				res.json(data);
			}
		})
	},

	getSpecificUser : (req, res) => {
		Game.findOne({'name' : req.params.name}).select('-_id').exec((err, data) => {
			data.highscore = data.highscore.find((value, index) => {
				return value.id = req.params.id;
			});
			res.json(data);
		});
	},

	getAllGame	: (req, res) => {
		Game.find().select('name id').exec((err, data) => {
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
