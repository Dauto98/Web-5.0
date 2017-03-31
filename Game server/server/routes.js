module.exports = function(app){
	app.use('/game', requrie('./api/game/index.js'));
	app.use('/user', require('./api/user/index.js'));
}
