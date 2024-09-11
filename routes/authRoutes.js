const express = require('express');
const { registerUser, loginUser } = require('../controllers/authController');
const { body } = require('express-validator');

const router = express.Router();

// Register a new user
router.post('/register', [
  body('username', 'Username is required').not().isEmpty(),
  body('password', 'Password must be at least 6 characters').isLength({ min: 6 })
], registerUser);

// Login user
router.post('/login', [
  body('username', 'Username is required').not().isEmpty(),
  body('password', 'Password is required').exists()
], loginUser);

module.exports = router;
