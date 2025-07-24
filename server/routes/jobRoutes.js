const express = require('express');
const router = express.Router();

const {
  createJob,
  getAllJobs,
  getJobById,
  updateJob,
  deleteJob
} = require('../controllers/jobControllers');

const { authenticateToken, authorizeAdmin } = require('../middlewares/authorizerAdmin');

// Public routes
router.get('/', getAllJobs);
router.get('/:id', getJobById);

// Protected routes (admin only)
router.post('/', authenticateToken, authorizeAdmin, createJob);
router.put('/:id', authenticateToken, authorizeAdmin, updateJob);
router.delete('/:id', authenticateToken, authorizeAdmin, deleteJob);

module.exports = router;
