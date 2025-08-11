const express = require('express');
const multer = require('multer');
const path = require('path');
const {
  registerUser,
  loginUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  getAllFundis,
  updateUserProfile,
  getAllClients,
  getUserProfile
} = require('../controllers/userControllers');

const { authenticateToken, authorizeAdmin } = require('../middlewares/authorizerAdmin');

const router = express.Router();

// ✅ Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // store images in uploads/ folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // unique file name
  }
});

const upload = multer({ storage });

// Public routes
router.post('/register', registerUser);
router.post('/login', loginUser);

// ✅ Get all fundis
router.get('/fundis', getAllFundis);

// Admin-protected
router.get('/all', authenticateToken, authorizeAdmin, getAllUsers);
router.get('/clients', authenticateToken, authorizeAdmin, getAllClients);

// ✅ Profile routes
router.get('/profile', authenticateToken, getUserProfile);
router.put(
  '/profile',
  authenticateToken,
  upload.single('profileImage'), // ⬅ handle image upload here
  updateUserProfile
);

// Protected user routes
router.get('/:id', authenticateToken, getUserById);
router.put('/:id', authenticateToken, updateUser);
router.delete('/:id', authenticateToken, authorizeAdmin, deleteUser);

module.exports = router;
