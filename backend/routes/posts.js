const router = require('express').Router();
const {
    createPost,
    getPost,
    updatePost,
    deletePost,
    likePost,
    addComment,
    getPosts,
} = require('../controllers/postController');

router.post('/', createPost);
router.get('/:id', getPost);
router.put('/:id', updatePost);
router.delete('/:id', deletePost);
router.put('/:id/like', likePost);
router.post('/:id/comment', addComment);
router.get('/', getPosts); // Add this line

module.exports = router;
