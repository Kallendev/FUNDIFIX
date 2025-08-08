const User = require('../models/User.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// ✅ Register a new user
const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Validate input
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Please provide name, email, and password' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'Email already in use' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Prevent admin role being set via registration
    const userRole = role === 'admin' ? 'client' : (role || 'client');

    // Create user
    const user = new User({
      name,
      email,
      password: hashedPassword,
      role: userRole
    });

    await user.save();

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Exclude password before sending response
    const { password: _, ...safeUser } = user._doc;

    res.status(201).json({
      message: 'User registered successfully',
      user: safeUser,
      token
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Login user
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    const { password: _, ...safeUser } = user._doc;

    res.status(200).json({ token, user: safeUser });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Get all users (admin only)
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Get all fundis
const getAllFundis = async (req, res) => {
  try {
    const fundis = await User.find({ role: "fundi" }).select("-password");
    res.status(200).json(fundis);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// ✅ Get user by ID
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Update user
const updateUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const updatedData = { name, email, role };

    if (password) {
      updatedData.password = await bcrypt.hash(password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(req.params.id, updatedData, {
      new: true
    }).select('-password');

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'User updated', updatedUser });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Delete user
const deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getAllUsers,
  getUserById,
  getAllFundis,
  updateUser,
  deleteUser
};
