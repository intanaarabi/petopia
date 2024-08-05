const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const auth = require('../middleware/auth');

const router = express.Router();

// Register a new user
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }
    // Create a new user
    const user = new User({
      name,
      email,
      password
    });

    // Save the user
    const newUser = await user.save();

    // Generate a token
    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Send the response
    return res.status(201).json({
      token
    });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
});

// Login a user and generate a token
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return res.json({
      token
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

// Verify token
router.get('/verify-token', auth, async (req, res) => {
  return res.status(200).json({
    valid: true
  });
});


router.get('/profile', auth, async (req,res) => {
  try {
    const {name, email} = await User.findById(req.user);
    return res.json({
      name,
      email
    });
  } catch (err){
    return res.status(500).json({ message: err.message });
  }
})
  
module.exports = router;
