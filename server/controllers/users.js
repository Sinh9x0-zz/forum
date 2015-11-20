var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports = (function() {
	return {
		allUsers: function(req, res) {
			User.find({}, function(err, results) {
				if(err) {
					console.log(err);
				} else {
					res.json(results);
				}
			});
		},

		addUser: function(req, res){
			var newUser = new User({
				username: req.body.username,
				email: req.body.email,
				password: req.body.password,
				created_at: new Date(),
				updated_at: new Date()
			});

			newUser.save(function(err, user){
				if(err) {
					console.log(err);
				} else {
					req.session.username = user.username;
					req.session.user_id = user._id;
					res.json(user);	
				}
			});

		},

		authenticateUser: function(req, res){
			User.findOne({username: req.body.username}, function(err, user){
				if(err){
					res.json(err);
				} else {
					if(user) {
						if(req.body.password == user.password){
							req.session.username = user.username;
							req.session.user_id = user._id;
							console.log('Session User ID: ', req.session.user_id);
						}
					} 
					res.json(user);	
				}
			});
		},

		maintainUser: function(req, res){
			User.findOne({_id: req.session.user_id}, function(err, user){
				if(err){
					res.json(err);
				} else {
					res.json(user);
				}
			});
		}
	}

})();