const fs = require('fs');
const hihi = require('express');
const bodyParser = require('body-parser');
let app = hihi();
let router = hihi.Router();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(router);

app.get('/getUser', (requests, response) => {
	fs.readFile('./user.json', (error, data) => {
		if (error) {
			response.end(error);
		} else {
			response.end(data);
		}
	})
});

app.post('/addUser', (request, response) => {
	fs.readFile('./user.json', (error, data) => {
		if (error) {
			response.end(error);
		} else {
			let tempData = JSON.parse(data);
			tempData.push(request.body);
			fs.writeFile('./user.json', JSON.stringify(tempData, null, 2), (error) => {
				if (error) {
					response.end(error);
				}
			})
		}
	})
})

app.put('/editUser', (request, response) => {
	//check how many users will be edited
	let editUser = [];
	if (request.query.userName.constructor === Array) {
		editUser = request.query.userName;
	} else {
		editUser[0] = request.query.userName;
	}

	fs.readFile('./user.json', (error, data) => {
		if (error) {
			response.end(error);
		} else {
			let tempData = JSON.parse(data);
			let added = request.body;

			editUser.forEach((mod) => {
				tempData.forEach(function(user, index){
					if (user.userName == mod) {
						let userKey = Object.keys(user);
						let editUserKey = Object.keys(added);

						for (let i = 0; i < editUserKey.length; i++) {
							for (let j = 0; j < userKey.length; j++){
								if (editUserKey[i] === userKey[j]) {
									user[userKey[j]] = added[editUserKey[i]];
									break;
								}
								if (j === userKey.length - 1) {
									user[editUserKey[i]] = added[editUserKey[i]];
								}
							}
						};
					}
				});
			})
			fs.writeFile('./user.json', JSON.stringify(tempData, null, 2), (error) => {
				if (error) {
					response.end(error);
				}
			})
		}
	})
})

let server = app.listen(8080, () => {
	console.log("server listen at 8080");
})
