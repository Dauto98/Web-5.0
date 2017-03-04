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
			tempData["user2"] = request.body;
			let addedData = JSON.stringify(tempData);
			fs.writeFile('./user.json', addedData, (error) => {
				if (error) {
					response.end(error);
				}
			})
		}
	})
})

app.put('/editUser', (request, response) => {
	fs.readFile('./user.json', (error, data) => {
		if (error) {
			response.end(error);
		} else {
			let tempData = JSON.parse(data);
			let added = request.body;
			if (Object.keys(tempData) === Object.keys(added)) {
				for (var i in added[Object.keys(added)]) {
					for(var j in tempData[Object.keys(tempData)]){
						if (i === j) {
							if (added[Object.keys(added)][i] !== tempData[Object.keys(tempData)][j]) {
								tempData[Object.keys(tempData)][j] = added[Object.keys(added)][i];
							}
						}
					}
				}
			};
		}
	})
})

let server = app.listen(8080, () => {
	console.log("server listen at 8080");
})
