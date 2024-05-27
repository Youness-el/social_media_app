const router = require('express').Router();
const { register, login, checkAuthStatus } = require('../controllers/authController');
const verifyToken = require('../middlewares/verifyToken'); // Assuming you have a middleware for verifying tokens

// Routes for user registration and login
router.post('/register', register);
router.post('/login', login);

// Route for checking authentication status
router.get('/status', verifyToken, checkAuthStatus);

module.exports = router;
