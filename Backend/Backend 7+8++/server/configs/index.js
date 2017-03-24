let express = require('express');
let bodyParser = require('body-parser');

module.exports = {
	port : 8080,

	settingExpress : (app) => {
		app.use(bodyParser.urlencoded({extended:false}));
		app.use(bodyParser.json());
	},

	mongoUri   : 'mongodb://localhost/web5',
	secret	   : 'iamlost',
	role  	 	 : ['bug mau', 'guest', 'user', 'admin'],
	permission : ['view', 'edit', 'create', 'delete']
}
