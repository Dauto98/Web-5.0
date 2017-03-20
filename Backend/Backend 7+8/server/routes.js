module.exports = function (app){
	app.use('/api/user', require('./api/user/index.js'));
	app.use('/api/course', require('./api/course/index.js'));
	app.use('/api/instructor', require('./api/instructor/index.js'));
}
