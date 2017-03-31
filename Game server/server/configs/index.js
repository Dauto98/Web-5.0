let bodyParser = require('body-parser');

module.exports = {
	port	: 9876,

	settingExpress	:	(app) => {
		app.use(bodyParser.urlencoded({extended : false}));
		app.use(bodyParser.json());
	},

	mongoUri	: 'mongodb://localhost/gameServer'
}
