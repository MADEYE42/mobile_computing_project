// backend/controllers/authController.js
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { generateToken } = require('../config/auth');

// Register User
const registerUser = async (req, res) => {
  try {
    console.log('Registration request body:', req.body); // Debug log

    const { name, email, password } = req.body;

    // Validate input
    if (!name || !email || !password) {
      console.log('Missing required fields:', { name, email, password }); // Debug log
      return res.status(400).json({
        message: 'Please provide all required fields',
        missing: {
          name: !name,
          email: !email,
          password: !password
        }
      });
    }

    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      console.log('User already exists:', email); // Debug log
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password using bcryptjs
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword
    });

    if (user) {
      console.log('User created successfully:', user._id); // Debug log
      const token = generateToken(user._id);
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token
      });
    }

  } catch (error) {
    console.error('Registration error:', error); // Debug log
    res.status(500).json({ 
      message: 'Server error during registration',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Login User
const loginUser = async (req, res) => {
  try {
    console.log('Login request body:', req.body); // Debug log

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide email and password' });
    }

    const user = await User.findOne({ email });
    
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = generateToken(user._id);
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ 
      message: 'Server error during login',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Get User Profile
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (user) {
      res.json({
        _id: user.id,
        name: user.name,
        email: user.email,
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { registerUser, loginUser, getUserProfile };
