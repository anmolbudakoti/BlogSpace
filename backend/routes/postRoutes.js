const express = require('express');
const router = express.Router();
const {
  getPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
  likePost,
} = require('../controllers/postController');
const { protect } = require('../middleware/authMiddleware');
const { validatePost } = require('../middleware/validation');

router
  .route('/')
  .get(getPosts)
  .post(protect, validatePost, createPost);

router
  .route('/:id')
  .get(getPostById)
  .put(protect, validatePost, updatePost)
  .delete(protect, deletePost);

router.route('/:id/like').put(protect, likePost);

module.exports = router;