const router = require('express').Router();
const { follow, unfollow } = require('../controllers/userController');

router.put('/:id/follow', follow);
router.put('/:id/unfollow', unfollow);

module.exports = router;
