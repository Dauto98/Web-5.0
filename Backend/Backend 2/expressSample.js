const fs = require('fs');
const express = require('express');
var app = express();
var router = express.Router();

var user4 = {
	"user3" : {
		 "name" : "tuyen",
	 "password" : "password3",
	 "profession" : "laptrinhvien",
	 "id": 4
	}
}

app.post('/createUser', function(req, res){
	fs.readFile('./user.json', function(error, data){
		if (error) {
			res.end(error);
		} else {
			// response.end(data);
			var tempData = JSON.parse(data);
			tempData['user4'] = user4;
			res.json(tempData);
		}
	})
})

app.get('/getUser', function(request, response){
	fs.readFile('./user.json', function(error, data){
		if (error) {
			response.end(error);
		} else {
			response.end(data);
		}
	})
})

app.get('/', function(request, response){
	fs.readFile('./user.json', function(error, data){
		if (error) {
			response.end(error);
		} else {
			response.end('anh tro giang better than main teacher');
		}
	})
})

var server = app.listen(8081, function(){
	console.log('server run at localhost:8081');
})
