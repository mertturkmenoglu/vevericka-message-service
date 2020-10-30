const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
	fst: {
		type: String,
		required: true,
	},
	snd: {
		type: String,
		required: true,
	},
}, { timestamps: mongoose.timestamps });

module.exports = mongoose.model('Chat', chatSchema);