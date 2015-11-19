var users = require('./../controllers/users.js');
var comments = require('./../controllers/comments.js');
var messages = require('./../controllers/messages.js');

module.exports = function(app) {

	app.get('/allUsers', function(req, res) {
		users.allUsers(req, res);
	});

	app.post('/addUser', function(req, res){
		users.addUser(req,res);
	});

	app.get('/deleteUser/:id', function(req, res){
		users.deleteUser(req, res);
	});

	app.post('/authenticateUser', function(req, res){
		users.authenticateUser(req,res);
	})

	app.get('/destroySession', function(req, res){
		delete req.session;
		res.json(true);
	});

	app.get('/checkSession', function(req, res){
		users.maintainUser(req, res);
	});

	app.get('/allMessages', function(req, res){
		messages.allMessages(req,res);
	});

	app.post('/addMessage', function(req, res){
		messages.addMessage(req, res);
	})

	app.get('/getconvo/:id', function(req, res){
		messages.getConvo(req, res);
	});

};