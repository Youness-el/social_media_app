const Message = require('../models/Message');
const User = require('../models/User');

exports.sendMessage = async (req, res) => {
    const { senderId, receiverId, content } = req.body;
    try {
        const newMessage = new Message({ senderId, receiverId, content });
        const savedMessage = await newMessage.save();
        res.status(200).json(savedMessage);
    } catch (err) {
        res.status(500).json(err);
    }
};

exports.getMessages = async (req, res) => {
    const { senderId, receiverId } = req.params;
    try {
        const messages = await Message.find({
            senderId: { $in: [senderId, receiverId] },
            receiverId: { $in: [senderId, receiverId] },
        }).sort({ createdAt: 1 });
        res.status(200).json(messages);
    } catch (err) {
        res.status(500).json(err);
    }
};

// Message controller
exports.getChatList = async (req, res) => {
    const userId = req.params.userId;
    console.log("req.params.userId", req.params.userId)
    try {
        // Fetch chat list from the database
    console.log("req.params.userId", req.params.userId)

        const messages = await Message.find({
            $or: [{ senderId: userId }, { receiverId: userId }]
        }).sort({ createdAt: -1 }).exec();

        // Group messages by the other user
        const chatList = {};
        messages.forEach(message => {
            const otherUserId = message.senderId.toString() === userId ? message.receiverId.toString() : message.senderId.toString();
            if (!chatList[otherUserId] || message.createdAt > chatList[otherUserId].createdAt) {
                chatList[otherUserId] = message;
            }
        });

        // Retrieve user details for each chat
        const chatListArray = await Promise.all(Object.keys(chatList).map(async (otherUserId) => {
            const user = await User.findById(otherUserId).select('username profilePicture');
            return { user, message: chatList[otherUserId] };
        }));

        res.status(200).json(chatListArray);
    } catch (err) {
        res.status(500).json(err);
    }
};
