// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/verifyToken');
const { follow, unfollow, loadUser, getuserByUsername,searchUsers, loadUserById } = require('../controllers/userController');

router.get('/data', verifyToken, loadUser);
router.get('/findbyusername/:username', verifyToken, getuserByUsername);
router.get('/findbyId/:userId', verifyToken, loadUserById);
router.put('/follow/:id/', verifyToken, follow);
router.put('/unfollow/:id/', verifyToken, unfollow);
router.get('/find/',verifyToken, searchUsers);

module.exports = router;
