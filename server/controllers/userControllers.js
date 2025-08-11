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
// Get all clients
const getAllClients = async (req, res) => {
  try {
    const clients = await User.find({ role: "client" }).select("-password");
    res.status(200).json(clients);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get logged-in user's profile
const getUserProfile = async (req, res) => {
  try {
    const userId = req.user.userId; // From authenticateToken middleware

    const user = await User.findById(userId).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
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
const updateUserProfile = async (req, res) => {
  try {
    console.log('🔍 Incoming body:', req.body);
    console.log('📷 Incoming file:', req.file);

    if (!req.user?.userId) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    const user = await User.findById(req.user.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    // ✅ Name
    if (req.body.name?.trim()) {
      user.name = req.body.name.trim();
    }

    // ✅ Skills - handle array or comma-separated string
    if (req.body.skills) {
      if (Array.isArray(req.body.skills)) {
        user.skills = req.body.skills.map(s => s.trim()).filter(Boolean);
      } else {
        user.skills = req.body.skills
          .split(',')
          .map(s => s.trim())
          .filter(Boolean);
      }
    }

    // ✅ Experience & Location
    if (req.body.experience?.trim()) {
      user.experience = req.body.experience.trim();
    }
    if (req.body.location?.trim()) {
      user.location = req.body.location.trim();
    }

    // ✅ Profile Image (absolute URL)
    if (req.file) {
      const baseUrl = `${req.protocol}://${req.get('host')}`;
      user.profileImage = `${baseUrl}/uploads/${req.file.filename}`;
    }

    const updatedUser = await user.save();
    const { password, ...safeUser } = updatedUser._doc;

    res.json({
      message: 'Profile updated successfully',
      user: safeUser
    });

  } catch (error) {
    console.error('❌ Update profile error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
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
  getAllClients,
  getUserProfile,
  updateUser,
  updateUserProfile,
  deleteUser
};
