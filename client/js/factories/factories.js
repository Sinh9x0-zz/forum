app.factory('userFactory', function($http){
	var factory = {};

	factory.getUsers = function(callback){
		$http.get('/allUsers').success(function(output){
			callback(output);
		});
	}

	factory.getUser = function(){
		$http.get('/findUser').success(function(output){
			callback(output);
		});
	}

	factory.addUser = function(newUser, callback){
		$http.post('/addUser', newUser).success(function(user){
			callback(user);
		});
	}

	factory.removeUser = function(id, callback){
		$http.get('/deleteUser/' + id).success(function(){
			callback();
		});
	}

	factory.authenticate = function(user, callback){
		$http.post('/authenticateUser/', user).success(function(sessionUser){
			callback(sessionUser);
		});
	}

	return factory;
})

app.factory('topicFactory', function ($http){
	var factory = {};

	factory.getMessages = function(callback){
		$http.get('/allMessages').success(function(output){
			callback(output);
		});
	}

	factory.addMessage = function(newMessage, callback){
		$http.post('/addMessage', newMessage).success(function(output){
			callback(output);
		});
	}

	factory.addComment = function(newComment, callback){
		$http.post('/addComment', newComment).success(function(output){
			callback(output);
		});
	}

	factory.getConvo = function(tid, callback){
		$http.get('/getConvo/' + tid).success(function(output){
			callback(output);
		});
	}

	return factory;
})

app.factory('session', function($http){
	var session = {};

	session.user = {}

	session.storeUser = function(user){
		session.user = user;
	}

	session.getUser = function(callback){
		callback(session.user);
	}

	session.destroySession = function(){
		$http.get('/destroySession').success(function(){
			console.log('session ended');
		});
	}

	session.checkSession = function(callback){
		$http.get('/checkSession').success(function(sessionUser){
			callback(sessionUser);
		});
	}

	return session;
})