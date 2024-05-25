const Message = require('../models/Message');

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
