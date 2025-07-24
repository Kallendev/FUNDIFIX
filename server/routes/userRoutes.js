const express = require('express');
const {
  registerUser,
  loginUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser
} = require('../controllers/userControllers');
const { authenticateToken, authorizeAdmin } = require('../middlewares/authorizerAdmin');

const router = express.Router();

// Public routes
router.post('/register', registerUser);
router.post('/login', loginUser);

// Admin-protected route to get all users
router.get('/all', authenticateToken, authorizeAdmin, getAllUsers);

// Protected routes
router.get('/:id', authenticateToken, getUserById);
router.put('/:id', authenticateToken, updateUser);
router.delete('/:id', authenticateToken, authorizeAdmin, deleteUser); // optionally admin-only

module.exports = router;
