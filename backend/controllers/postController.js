const Post = require('../models/Post');

exports.createPost = async (req, res) => {
    const newPost = new Post(req.body);
    try {
        const savedPost = await newPost.save();
        res.status(200).json(savedPost);
    } catch (err) {
        res.status(500).json(err);
    }
};

exports.getPost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        res.status(200).json(post);
    } catch (err) {
        res.status(500).json(err);
    }
};

exports.updatePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post.userId.toString() === req.body.userId) {
            await post.updateOne({ $set: req.body });
            res.status(200).json('The post has been updated');
        } else {
            res.status(403).json('You can update only your posts');
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

exports.deletePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post.userId.toString() === req.body.userId) {
            await post.deleteOne();
            res.status(200).json('The post has been deleted');
        } else {
            res.status(403).json('You can delete only your posts');
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

exports.likePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post.likes.includes(req.body.userId)) {
            await post.updateOne({ $push: { likes: req.body.userId } });
            res.status(200).json('The post has been liked');
        } else {
            await post.updateOne({ $pull: { likes: req.body.userId } });
            res.status(200).json('The post has been disliked');
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

exports.addComment = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        const newComment = {
            userId: req.body.userId,
            content: req.body.content,
        };
        await post.updateOne({ $push: { comments: newComment } });
        res.status(200).json('Comment has been added');
    } catch (err) {
        res.status(500).json(err);
    }
};
