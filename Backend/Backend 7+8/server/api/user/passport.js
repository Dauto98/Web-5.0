let passport = require('passport');
let LocalStrategy = require('passport-local').Strategy;
let User = require('./userModel.js')

module.exports = () => {
	passport.use(new LocalStrategy(function(username, password, done){
		User.findOne({username: username}).exec((err, user) => {
			if (err) {
				return done(err);
			};
			if (!user) {
				return done(null, false, {message: 'This account doesn\'t exist'});
			};
			if (!user.authenticate(password)) {
				return done(null, false, {message: 'Incorrect password'});
			}
			return done(null, user);
		})
	}));
};
