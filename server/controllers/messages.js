var mongoose = require('mongoose');
var Message = mongoose.model('Message');

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
				password: req.body.password,
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
				.exec(function (err, data){
					res.json(data);
				});
		}
		
	}

})();