const express = require('express');
const router = express.Router();
const {
  registerUser,
  authUser,
  getUserProfile,
  logoutUser,
} = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');
const { validateRegister, validateLogin } = require('../middleware/validation');

router.post('/register', validateRegister, registerUser);
router.post('/login', validateLogin, authUser);
router.post('/logout', logoutUser);
router.route('/profile').get(protect, getUserProfile);

module.exports = router;