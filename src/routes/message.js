const express = require('express');

const { getUserChats, getUserChatWith, createNewChat, newMessageToChat, getMessages } = require('../controllers/messageController');

const router = express.Router();

// Get all chat names of a user
router.route('/get_chats/:username').get(getUserChats);

// Get chat (between fst user and snd user)
router.route('/get_chat/:fst/:snd').get(getUserChatWith);

router.route('/get_messages/:fst/:snd').get(getMessages);

// Create chat between fst and snd
router.route('/new_chat').post(createNewChat);

// Send a new message to a chat
router.route('/new_message/:chat_id').post(newMessageToChat);

module.exports = router;