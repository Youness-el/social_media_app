const router = require('express').Router();
const {
    createPost,
    getPost,
    updatePost,
    deletePost,
    likePost,
    addComment,
} = require('../controllers/postController');

router.post('/', createPost);
router.get('/:id', getPost);
router.put('/:id', updatePost);
router.delete('/:id', deletePost);
router.put('/:id/like', likePost);
router.post('/:id/comment', addComment);

module.exports = router;
