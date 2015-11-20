var mongoose = require('mongoose');

var CommentSchema = new mongoose.Schema({
	comment: { type: String, trim: true},
	username: { type: String, trim: true},
	_User: { type: mongoose.Schema.Types.ObjectId, ref:'User'},
	_Message: { type: mongoose.Schema.Types.ObjectId, ref:'Message'},
	created_at: { type: Date, default: Date.now },
	updated_at: { type: Date, default: Date.now }
});

mongoose.model('Comment', CommentSchema);


CommentSchema.path('comment').required(true, "comment is required");
CommentSchema.path('_Message').required(true, "you can create comments associated with a  post");
CommentSchema.path('_User').required(true, "you must be logged in to create a topic");
