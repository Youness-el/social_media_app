const express = require('express');
const router = express.Router();
const { sendMessage, getMessages, getChatList } = require('../controllers/messageController');

// Send a message
router.post('/sendMessage/', sendMessage);

// Get messages between two users
router.get('/getMessages/:senderId/:receiverId', getMessages);

// Get chat list for a user
router.get('/getChatList/chatlist/:userId', getChatList);

module.exports = router;
