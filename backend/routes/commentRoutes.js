const express = require('express');
const router = express.Router();
const {
  getCommentsByPost,
  createComment,
  updateComment,
  deleteComment,
} = require('../controllers/commentController');
const { protect } = require('../middleware/authMiddleware');
const { validateComment } = require('../middleware/validation');

router
  .route('/post/:postId')
  .get(getCommentsByPost)
  .post(protect, validateComment, createComment);

router
  .route('/:id')
  .put(protect, validateComment, updateComment)
  .delete(protect, deleteComment);

module.exports = router;