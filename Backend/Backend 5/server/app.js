const express = require('express');
let mongoose = require('mongoose');
let app = express();

//connect to database or create new one if there isn't and existed database
mongoose.connect('mongodb://localhost/web5');
//above function create a connection object, use to check connectivity
let dbConnection = mongoose.connection;
dbConnection.on('error', console.error.bind(console, 'DB error'));
dbConnection.once('open', () => {});

//add file from server to browser when connection begin, not when resolve http request
app.use(express.static(__dirname + '/../client'));


//create schema for test
let testSchema = mongoose.Schema(
	{
		sections : [
			{
				purpose : String,
				content : String,
				parts		: [
					{
						purpose		: String,
						content		: String,
						questions	:	[
							{
								type		: {type : String},
								content	: String,
								answers	: [
									{
										value	: String,
										label	: String
									}
								]
							}
						]
					}
				]
			}
		]
	}
)

//create model for test, also connect to Test collection on mongoDB, or if doesn't exist, create a new one
let Test = mongoose.model('Test', testSchema);

//create test1 document on Test collection
let test1 = new Test(
{
  "sections" : [
    {
      "purpose": "READING AND WRITING",
      "content" : "",
      "parts" : [
        {
          "purpose"	 	: "Read the passage and decide which is the best answer. Circle the letter A, B, C or D next to the word you choose.",
          "content" 	: "Paper is named for papyrus, a reed like plant used by ancient Egyptians as writing material more than 5000 years ago. The Chinese invented the paper that we use 2000 years ago.",
          "questions" : [
            {
              "type"    : "single",
              "content" : "According to the passage, the paper that we use was first invented by",
              "answers" : [
                {
                  "value" : "A",
                  "label" : "the Chinese"
                },{
                  "value" : "B",
                  "label" : "the Egyptians"
                },{
                  "value" : "C",
                  "label" : "ancient cultures"
                }
              ]
            },
            {
              "type"    : "multiple",
              "content" : "According to the passage, the paper that we use was first invented by",
              "answers" : [
                {
                  "value" : "A",
                  "label" : "the Chinese"
                },{
                  "value" : "B",
                  "label" : "the Egyptians"
                },{
                  "value" : "C",
                  "label" : "ancient cultures"
                }
              ]
            },
            {
              "type"    : "single",
              "content" : "According to the passage, the paper that we use was first invented by",
              "answers" : [
                {
                  "value" : "A",
                  "label" : "the Chinese"
                },{
                  "value" : "B",
                  "label" : "the Egyptians"
                },{
                  "value" : "C",
                  "label" : "ancient cultures"
                }
              ]
            },
            {
              "type"    : "fill",
              "content" : "According to the passage, the paper that we use was first invented by"
            }
          ]
        }
      ]
    }
  ]
});

//save doc test1 to db
test1.save().then(
	(doc) => {console.log(doc);},
	(error) => {console.log(error);}
);

// let getSomething = new mongoose.Query;
// getSomething.find({name: 'khanh'}).exec((data) => {console.log(data);});
//TODO: how to list collection ????
// db.collectionNames((err, name) => {
// 	console.log(name);
// })


//TODO: how to drop collection
// db.db.dropCollection("Test?");

// drop database which is being connected
// db.dropDatabase();

app.get('/test', (req, res) => {
	// Test.find({}, {'__v' : 0}).exec()
	// .then((data) => {
	// 	res.send(data[data.length-1]);
	// 	}, (err) => {
	// 		console.log(err);
	// 	}
	// )

	dbConnection.db.listCollections().toArray(function (err, names) {
		if (err) {
			console.log(err);
		} else {
			res.send(names);
		}
	});
});

app.listen(8888);
