const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cloudinary = require("cloudinary").v2;
const dotenv = require("dotenv");
dotenv.config();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
console.log('e',cloudinary.config());
// Route handler for /api/auth/status
exports.checkAuthStatus = async (req, res) => {
  try {
    const user = await User.findById(req.user).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Error checking authentication status" });
  }
};

exports.register = async (req, res) => {
    const { username, email, password, profilePicture } = req.body;
 
    console.log('Received registration data:', req.body);

    try {
        // Check if username or email already exists
        console.log('Checking if user exists...');
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            console.log('User already exists:', existingUser);
            return res.status(400).json({ error: 'Username or email already exists' });
        }

        // Upload profile picture to Cloudinary if provided
        let profilePictureUrl = '';
        if (profilePicture) {
            console.log('Uploading profile picture to Cloudinary...');
            const uploadedResponse = await cloudinary.uploader.upload(profilePicture, {
                folder: "socialMedia/users_pfp"
            });
            profilePictureUrl = uploadedResponse.secure_url;
            console.log('Profile picture uploaded:', profilePictureUrl);
        }else{throw new Error('no img is uploaded')}

        // Hash the password
        if (!password) {
            throw new Error('Password is required');
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log('Password hashed successfully');

        // Create a new user
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            profilePicture: profilePictureUrl
        });
        console.log('Saving new user...');
        const savedUser = await newUser.save();
        console.log('User saved successfully:', savedUser);
        res.status(201).json(savedUser);
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Error creating user' });
    }
};

// Login user
exports.login = async (req, res) => {
  const { identifier, password } = req.body;
  try {
    // Check if user exists with username or email
    const user = await User.findOne({
      $or: [{ username: identifier }, { email: identifier }],
    });
    if (!user) {
      return res.status(400).json({ error: "Invalid username or email" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid password" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({ token, userId: user._id });
  } catch (error) {
    res.status(500).json({ error: "Error logging in" });
  }
};
