const express = require('express');
const {
  registerUser,
  loginUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  getAllFundis,
  getAllClients // ✅ added
} = require('../controllers/userControllers');

const { authenticateToken, authorizeAdmin } = require('../middlewares/authorizerAdmin');

const router = express.Router();

// Public routes
router.post('/register', registerUser);
router.post('/login', loginUser);

// ✅ Get all fundis (public or protected — here I made it public)
router.get('/fundis', getAllFundis);

// Admin-protected route to get all users
router.get('/all', authenticateToken, authorizeAdmin, getAllUsers);
router.get('/clients', authenticateToken, authorizeAdmin, getAllClients);

// Protected routes
router.get('/:id', authenticateToken, getUserById);
router.put('/:id', authenticateToken, updateUser);
router.delete('/:id', authenticateToken, authorizeAdmin, deleteUser);

module.exports = router;
