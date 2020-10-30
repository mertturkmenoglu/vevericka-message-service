const Message = require('../models/Message');
const Chat = require('../models/Chat');

const getUserChats = async (req, res) => {
	const username = req.params.username;
	const chat1 = await Chat.find({ fst: username });
	const chat2 = await Chat.find({ snd: username });

	return res.json({
		chat: [...chat1, ...chat2]
	});
}

const getUserChatWith = async (req, res) => {
	const fst = req.params.fst;
	const snd = req.params.snd;

	const chat1 = await Chat.findOne({ fst, snd });

	if (chat1) {
		return res.json({
			chat: chat1,
		});
	}

	const chat2 = await Chat.findOne({ fst: snd, snd: fst });

	if (chat2) {
		return res.json({
			chat: chat2,
		});
	}

	return res.status(404).json({
		message: "Chat not found",
		status_code: 404,
	});
}

const createNewChat = async (req, res) => {
	const { fst, snd } = req.body;

	if (!fst || !snd) {
		return res.status(400).json({
			message: "Bad request",
			status_code: 400,
		});
	}

	const chat = new Chat({
		fst,
		snd,
	});

	try {
		const saved = await chat.save();
		return res.status(201).json({ chat: saved });
	} catch (err) {
		console.error(err);
		return res.status(500).json({
			message: 'Create chat failed',
			status_code: 500,
		});
	}
}

const newMessageToChat = async (req, res) => {
	const chatIdParam = req.params.chat_id;
	const { content, sent_by } = req.body;

	if (!chatIdParam || !content || !sent_by) {
		return res.status(400).json({
			message: 'Bad request',
			status_code: 400,
		});
	}

	const chat = await Chat.findById(chatIdParam);

	if (!chat) {
		return res.status(400).json({
			message: 'Bad request',
			status_code: 400,
		});
	}

	if (chat.fst != sent_by && chat.snd != sent_by) {
		return res.status(400).json({
			message: 'Bad request',
			status_code: 400,
		});
	}

	const msg = new Message({
		content,
		sent_by,
		chat_id: chatIdParam,
	});

	try {
		const saved = await msg.save();
		return res.status(201).json({ message: saved });
	} catch (err) {
		console.log(err);
		return res.status(500).json({
			message: "New message failed",
			status_code: 500,
		});
	}
}

const getMessages = async (req, res) => {
	const fst = req.params.fst;
	const snd = req.params.snd;

	const chat1 = await Chat.findOne({ fst, snd });
	const chat2 = await Chat.findOne({ fst: snd, snd: fst });

	if (!chat1 && !chat2) {
		return res.status(404).json({
			message: "Not found",
			status_code: 404
		});
	}

	const chat = chat1 ? chat1 : chat2;

	const messages = await Message.find({ chat_id: chat._id });
	return res.json({ messages });
}

module.exports = {
	getUserChats,
	getUserChatWith,
	createNewChat,
	newMessageToChat,
	getMessages
};