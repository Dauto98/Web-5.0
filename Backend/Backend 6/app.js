let express = require('express');
app = express();

app.use(express.static(__dirname + '/client'))

//1st way to implement route
app.get('/', (req, res) => {
	res.end('hello');
})

//2nd way to implement route, for different requests on the same url
app.route('/test')
	.get((req, res) => {
		console.log('you take get');
	})
	.post((req, res) => {
		console.log('you take post');
	})

app.listen(9000, () => {
	console.log('listen at 9000');
})
