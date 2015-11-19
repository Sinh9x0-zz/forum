var mongoose = require('mongoose');

var CommentSchema = new mongoose.Schema({
	username: { type: String, trim: true },
	comment: { type: String, trim: true},
	_User: { type: mongoose.Schema.Types.ObjectId, ref:'User'},
	_Message: { type: mongoose.Schema.Types.ObjectId, ref:'Message'},
	created_at: { type: Date, default: Date.now },
	updated_at: { type: Date, default: Date.now }
});

mongoose.model('Comment', CommentSchema);

CommentSchema.path('username').required(true, "Username is required");
CommentSchema.path('comment').required(true, "comment is required");
