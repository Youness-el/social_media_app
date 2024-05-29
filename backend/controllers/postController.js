const Post = require("../models/Post");
const User = require("../models/User");
const cloudinary = require("cloudinary").v2;
const dotenv = require("dotenv");
dotenv.config();
// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
exports.createPost = async (req, res) => {
  const { userId, content, imageUrl } = req.body;
  // Upload profile picture to Cloudinary if provided
  let image = '';
  if (imageUrl) {
      console.log('Uploading profile picture to Cloudinary...');
      const uploadedResponse = await cloudinary.uploader.upload(imageUrl, {
          folder: "socialMedia/posts"
      });
      image = uploadedResponse.secure_url;
      console.log('Profile picture uploaded:', image);
  }else{throw new Error('no img is uploaded')}
  try {
    // Create a new post
    const newPost = new Post({ userId, content, imageUrl:image });
    const savedPost = await newPost.save();

    // Update the user's posts array
    await User.findByIdAndUpdate(userId, { $push: { posts: savedPost._id } });

    // Populate userId field with user object
    const populatedPost = await Post.findById(savedPost._id).populate('userId', 'username profilePicture');

    res.status(200).json(populatedPost);
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
      res.status(200).json("The post has been updated");
    } else {
      res.status(403).json("You can update only your posts");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.deletePost = async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      console.log(post)
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }
      console.log('userId',req.body.userId) // i get userId undefined
      console.log(post.userId._id)
      if (post.userId.toString() === req.body.userId) {
        await post.deleteOne();
        res.status(200).json({ message: "The post has been deleted" });
      } else {
        res.status(403).json({ message: "You can delete only your posts" });
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  

exports.likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post.likes.includes(req.body.userId)) {
      await post.updateOne({ $push: { likes: req.body.userId } });
      res.status(200).json("The post has been liked");
    } else {
      await post.updateOne({ $pull: { likes: req.body.userId } });
      res.status(200).json("The post has been disliked");
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
      content: req.body.comment,
    };
    post.comments.push(newComment);
    await post.save();

    // Get the latest comment with populated user information
    const latestComment = post.comments[post.comments.length - 1];

    res
      .status(200)
      .json({ message: "Comment has been added", comment: latestComment });
  } catch (err) {
    res.status(500).json(err);
  }
};

// Add getPosts function
exports.getPosts = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 3;
  const skip = (page - 1) * limit;

  try {
    const posts = await Post.find()
      .skip(skip)
      .limit(limit)
      .populate("userId", "username profilePicture")
      .populate('comments.userId', 'username profilePicture');
    res
      .status(200)
      .json({
        posts,
        currentPage: page,
        totalPages: Math.ceil((await Post.countDocuments()) / limit),
        totalPosts: Math.ceil((await Post.countDocuments()))
      });
  } catch (err) {
    res.status(500).json(err);
  }
};
