let mongoose = require('mongoose');

// open connection to the database
mongoose.connect('mongodb://localhost/web5');

// model Cat is like a class to construct document, model(name, schema)
let Cat = mongoose.model('Cat', {age : {
	type : Number,
	validate: {
		validator: function(v){
			return (v >= 18 && v <= 81);
		},
		message: 'Chua du tuoi'
	}
}});

//create a doc
let cat1 = new Cat({age : 17});

//save doc to DB, then a promise ?
cat1.save().then(function (doc) {
	console.log(doc);
}, function (error) {
	console.log(error);
})
