let mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/web5');

let Cat = mongoose.model('Cat', {age : {
	type : Number,
	validate: {
		validator: function(v){
			return (v >= 18 && v <= 81);
		},
		message: 'Chua du tuoi'
	}
}});

let cat1 = new Cat({age : 17});

cat1.save().then(function (doc) {
	console.log(doc);
}, function (error) {
	console.log(error);
})
