const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
	chat_id: {
		type: String,
		required: true,
	},
	content: {
		type: String,
		required: true,
	},
	sent_by: {
		type: String,
		required: true,
	}
}, { timestamps: mongoose.timestamps });

module.exports = mongoose.model('Message', messageSchema);