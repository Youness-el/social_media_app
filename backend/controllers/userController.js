const User = require('../models/User');

exports.follow = async (req, res) => {
    if (req.body.userId !== req.params.id) {
        try {
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);
            if (!user.followers.includes(req.body.userId)) {
                await user.updateOne({ $push: { followers: req.body.userId } });
                await currentUser.updateOne({ $push: { following: req.params.id } });
                res.status(200).json('User has been followed');
            } else {
                res.status(403).json('You already follow this user');
            }
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(403).json('You cannot follow yourself');
    }
};

exports.unfollow = async (req, res) => {
    if (req.body.userId !== req.params.id) {
        try {
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);
            if (user.followers.includes(req.body.userId)) {
                await user.updateOne({ $pull: { followers: req.body.userId } });
                await currentUser.updateOne({ $pull: { following: req.params.id } });
                res.status(200).json('User has been unfollowed');
            } else {
                res.status(403).json('You do not follow this user');
            }
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(403).json('You cannot unfollow yourself');
    }
};
