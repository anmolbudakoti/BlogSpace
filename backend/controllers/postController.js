const { validationResult } = require('express-validator');
const Post = require('../models/Post');
const Comment = require('../models/Comment');

const getPosts = async (req, res) => {
  try {
    const posts = await Post.find({})
      .populate('author', 'name email')
      .sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate('author', 'name email')
      .populate('likes', 'name email');

    if (post) {
      res.json(post);
    } else {
      res.status(404).json({ message: 'Post not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createPost = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { title, content } = req.body;

    const post = new Post({
      title,
      content,
      author: req.user._id,
    });

    const createdPost = await post.save();
    await createdPost.populate('author', 'name email');

    res.status(201).json(createdPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updatePost = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const post = await Post.findById(req.params.id);

    if (post) {
      if (post.author.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
        return res.status(401).json({ message: 'Not authorized to update this post' });
      }

      post.title = req.body.title || post.title;
      post.content = req.body.content || post.content;

      const updatedPost = await post.save();
      await updatedPost.populate('author', 'name email');

      res.json(updatedPost);
    } else {
      res.status(404).json({ message: 'Post not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (post) {
      if (post.author.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
        return res.status(401).json({ message: 'Not authorized to delete this post' });
      }

      await Comment.deleteMany({ post: post._id });
      await Post.findByIdAndDelete(req.params.id);
      res.json({ message: 'Post removed' });
    } else {
      res.status(404).json({ message: 'Post not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (post) {
      if (post.likes.includes(req.user._id)) {
        post.likes = post.likes.filter(
          (like) => like.toString() !== req.user._id.toString()
        );
      } else {
        post.likes.push(req.user._id);
      }

      const updatedPost = await post.save();
      await updatedPost.populate('author', 'name email');
      await updatedPost.populate('likes', 'name email');

      res.json(updatedPost);
    } else {
      res.status(404).json({ message: 'Post not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
  likePost,
};