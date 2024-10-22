// authControllers.js
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Register a new user
exports.registerUser = async (req, res) => {
  const { email, password, username, role, organizationName, id } = req.body;

  try {
    // Ensure all necessary fields are present
    if (!email || !password || !username || !role) {
      return res.status(400).json({ msg: 'Please provide all required fields' });
    }

    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: 'User already exists' });

    // Create new user - password will be hashed by the pre-save middleware
    user = new User({
      email,
      password, // Don't hash here - let the pre-save middleware handle it
      username,
      role,
      organizationName,
      id
    });

    // Save user to database
    await user.save();

    // Create and sign JWT
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Return the token and user details
    res.json({
      token,
      user: {
        id: user._id,
        username: user.username,
        role: user.role
      }
    });

  } catch (error) {
    console.error(`Error during registration: ${error.message}`);
    res.status(500).json({ msg: 'Server error' });
  }
};

// Login an existing user
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Ensure email and password are provided
    if (!email || !password) {
      return res.status(400).json({ msg: 'Please provide both email and password' });
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

    // Use the matchPassword method from the User model
    const isMatch = await user.matchPassword(password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

    // Create and sign JWT
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Return the token and user details
    res.json({
      token,
      user: {
        id: user._id,
        username: user.username,
        role: user.role
      }
    });

  } catch (error) {
    console.error(`Error during login: ${error.message}`);
    res.status(500).json({ msg: 'Server error' });
  }
};
