// controllers/userController.js
const User = require("../models/User");

exports.follow = async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      console.log('user to follow',user)
      const currentUser = await User.findById(req.body.userId);
      console.log('curr',req.body.userId)
      if (!user.followers.includes(req.body.userId)) {
        await user.updateOne({ $push: { followers: req.body.userId } });
        await currentUser.updateOne({ $push: { following: req.params.id } });
        res.status(200).json("User has been followed");
      } else {
        res.status(403).json("You already follow this user");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You cannot follow yourself");
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
        res.status(200).json("User has been unfollowed");
      } else { 
        res.status(403).json("You do not follow this user");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You cannot unfollow yourself");
  }
};

exports.loadUser = async (req, res) => {
  try {
    const user = await User.findById(req.user).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
exports.loadUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).select("-password").populate({
      path: 'posts',
      populate: [
        { path: 'userId', select: 'username profilePicture' }, // Populate user info in posts
        { path: 'likes', select: 'username profilePicture' }, // Populate likes with user info
        {
          path: 'comments',
          populate: { path: 'userId', select: 'username profilePicture' }, // Populate comments with user info
        },
      ],
    });;
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Route to load user by username
exports.getuserByUsername = async (req, res) => {
  try {
    const username = req.params.username;
    // Find the user by username
    const user = await User.findOne({ username }).select("-password").populate({
      path: 'posts',
      populate: [
        { path: 'userId', select: 'username profilePicture' }, // Populate user info in posts
        { path: 'likes', select: 'username profilePicture' }, // Populate likes with user info
        {
          path: 'comments',
          populate: { path: 'userId', select: 'username profilePicture' }, // Populate comments with user info
        },
      ],
    }) .populate('followers', 'username profilePicture') // Populate followers with user info
    .populate('following', 'username profilePicture');;

    if (!user) { 
      return res.status(404).json({ message: "User not found" });
    }

    // Return the user data
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.searchUsers = async (req, res) => {
  try {
    const keyword = req.query.keyword;
    if(keyword){
      console.log("key",keyword)
    }else{
      console.log('no key')
    }
    if (keyword) {
      
      const users = await User.find({
        $or: [
          { username: { $regex: keyword, $options: 'i' } },
          { name: { $regex: keyword, $options: 'i' } }
        ]
      }).limit(5); // Limit to 5 results for performance

      return res.status(200).json({
        success: true,
        users
      });
    } else {
      return res.status(400).json({
        success: false,
        message: 'Keyword is required'
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
};