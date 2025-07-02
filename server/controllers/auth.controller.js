const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const db = require('../models');
const User = db.User;

// Use your environment variable or fallback
const secretKey = process.env.JWT_SECRET || 'default_secret_key';

// ==========================
// Register User Controller
// ==========================
exports.registerUser = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    // Check for existing user
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      role: role || 'user' // Default role is 'user'
    });

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error('Register Error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// =======================
// Login User Controller
// =======================
exports.loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find user
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT
    const token = jwt.sign(
      {
        id: user.id,
        username: user.username,
        role: user.role // Important for admin access
      },
      secretKey,
      { expiresIn: '1h' }
    );

    // Return token
    res.json({ token });
  } catch (err) {
    console.error('Login Error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};
