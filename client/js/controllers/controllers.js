app.controller('topicsController', function(session, topicFactory, userFactory){
	var _this = this;
	
	topicFactory.getMessages(function(messages){
		_this.messages = messages;
	});

	_this.addMessage = function(){
		topicFactory.addMessage(_this.newMessage, function(){
			topicFactory.getMessages(function(messages){
				_this.messages = messages;
			});
		});
	}

});

app.controller('conversationsController', function(session, $routeParams, topicFactory, userFactory){
	var _this = this;

	topicFactory.getConvo($routeParams.id, function(convo){
		_this.convo = convo;
	});

	_this.addComment = function(){
		_this.newComment.message_id = _this.convo._id;

		session.checkSession(function(sessionUser){
			if(sessionUser){
				session.storeUser(sessionUser);
				session.getUser(function(sUser){
					_this.newComment.username = sUser.username;
					topicFactory.addComment(_this.newComment, function(convo){
						topicFactory.getConvo($routeParams.id, function(convo){
							_this.convo = convo;
							_this.newComment = {};
						});
					});
				}); 
			}
		});

	}
})

app.controller('usersController', function(session, userFactory) {
	var _this = this;
	userFactory.getUsers(function(users){
		_this.users = users;
	});

	_this.status = 'account';

	this.currentUser = {};

	_this.addUser = function(){
		userFactory.addUser(_this.newUser, function(){
			userFactory.getUsers(function(users){
				_this.users = users;
			});

			_this.newUser = {};

		});
	}

	_this.removeUser = function(id){
		userFactory.removeUser(id, function(){
			userFactory.getUsers(function(users){
				_this.users = users;
			});

		});
	}

	_this.userAction = function() {
		if(_this.status == 'account'){
			userFactory.authenticate(_this.user, function(sessionUser){
				if(!sessionUser){
					_this.feedback = "Invalid Credentials";
				} else {
					_this.feedback = "You've been logged in successfully!";
					session.storeUser(sessionUser);
					session.getUser(function(sUser){
						_this.currentUser = sUser;
					}); 
					_this.user = {};
				}
			});
		} else {
			userFactory.addUser(_this.user, function(user){
				session.storeUser(user);
				session.getUser(function(sUser){
					_this.currentUser = sUser;
				}); 
				_this.user = {};
			});
		}
	}

	_this.checkSession = function(){
		session.checkSession(function(sessionUser){
			if(sessionUser){
				session.storeUser(sessionUser);
				session.getUser(function(sUser){
					_this.currentUser = sUser;
				}); 
			}
		});
	}

	_this.inSession = function() {
		return (!jQuery.isEmptyObject(_this.currentUser));
	}

	_this.destroySession = function(){
		_this.currentUser =  {};
		session.destroySession();
		_this.feedback = "You've been logged out successfully!";
	}

	_this.checkSession();

});