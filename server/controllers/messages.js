var mongoose = require('mongoose');
var Message = mongoose.model('Message');
var Comment = mongoose.model('Comment');
var User = mongoose.model('User');

module.exports = (function() {
	return {
		allMessages: function(req, res) {
			Message.find({})
				.populate('comments')
				.populate('_User')
				.exec(function(err, data){
					res.json(data);
				});
		},

		addMessage: function(req, res){
			var newMessage = new Message({
				_User: req.session.user_id,
				message: req.body.message,
				topic: req.body.topic,
				category: req.body.category,
				created_at: new Date(),
				updated_at: new Date()
			});

			newMessage.save(function(err, data){
				if(err) {
					console.log(err);
				} else {
					res.json(data);	
				}
			});

		},

		getConvo: function(req, res){
			Message.findOne({_id: req.params.id})
				.populate('_User') 
				.populate('comments')
				.exec(function (err, data){
					res.json(data);
				});
		},

		addComment: function(req, res){
			var newComment = new Comment({
				username: req.body.username,
				_User: req.session.user_id,
				_Message: req.body.message_id, 
				comment: req.body.message,
				created_at: new Date(),
				updated_at: new Date()
			});

			console.log(newComment);

			newComment.save(function(err, cdata){
				if(err) {
					console.log(err);
				} else {
					Message.update({_id: cdata._Message}, {$push: {comments: cdata.id}}, function (err, mdata){
						User.update({_id: cdata._User}, {$push: {comments: cdata.id}}, function(err, udata){
							res.json(cdata);	
						});
					});
				}
			});
		}
		
	}

})();