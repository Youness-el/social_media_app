// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/verifyToken');
const { follow, unfollow, loadUser, getuserByUsername } = require('../controllers/userController');

router.get('/data', verifyToken, loadUser);
router.get('/:username', verifyToken, getuserByUsername);
router.post('/:id/follow', verifyToken, follow);
router.post('/:id/unfollow', verifyToken, unfollow);

module.exports = router;
