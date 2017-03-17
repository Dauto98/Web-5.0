let express = require('express');
let configs = require('./configs/index.js');
let mongoose = require('mongoose');

let app = express();
configs.settingExpress(app);

let routes = require('./routes.js')(app);

mongoose.connect(configs.mongoUri);
mongoose.connection.on('error', console.error.bind(console, 'connection error'));
mongoose.connection.once('open', () => {
	console.log('connect DB success');
})

app.listen(configs.port, (err) => {
	console.log('app is running at port ' + configs.port);
})
