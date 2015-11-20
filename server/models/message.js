var mongoose = require('mongoose');

var MessageSchema = new mongoose.Schema({
	topic: { type: String, trim: true},
	category: { type: String, trim: true},
	message: { type: String, trim: true},
	_User: { type: mongoose.Schema.Types.ObjectId, ref:'User'},
	comments: [{ type: mongoose.Schema.Types.ObjectId, ref:'Comment'}],
	created_at: { type: Date, default: Date.now },
	updated_at: { type: Date, default: Date.now }
});

mongoose.model('Message', MessageSchema);

MessageSchema.path('_User').required(true, "you must be logged in to create a topic");
MessageSchema.path('topic').required(true, "Topic is required");
MessageSchema.path('category').required(true, "Category is required");