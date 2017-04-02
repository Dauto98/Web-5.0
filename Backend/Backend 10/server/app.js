let express = require('express');
let app = express();
let server = require('http').Server(app);
let mongoose = require('mongoose');
let io = require('socket.io')(server);

app.use(express.static('../client'));

mongoose.connect('mongodb://localhost/web5');

let Message = mongoose.model('message', {content: String});

app.get('/allMess', (req, res) => {
	Message.find().exec((err, data) => {
		res.json(data);
	});
});

io.on('connection', (socket) => {
	socket.broadcast.emit('new client connected', 'a new client is such');
	socket.on('new chat', (data) => {
		let message = new Message({content: data});
		message.save((err, mess) => {
			console.log('saved');
		})
		io.emit('receive a new chat', data);
	});
	socket.on('disconnect', () => {
		io.emit('a client is disconnected', 'a client is disconnected');
	});
})

server.listen(3000, () => {
	console.log("server run at 3000");
});
