const express = require('express');
const router = express.Router();

const {
  createJob,
  getAllJobs,
  getJobById,
  updateJob,
  deleteJob
} = require('../controllers/jobControllers');

const { authenticateToken } = require('../middlewares/authorizerAdmin');

// ✅ Public routes
router.get('/', getAllJobs);
router.get('/:id', getJobById);

// ✅ Protected routes (any logged-in user)
router.post('/', authenticateToken, createJob);

// ✅ Optional: Only creator or admin can update/delete
router.put('/:id', authenticateToken, updateJob);
router.delete('/:id', authenticateToken, deleteJob);

module.exports = router;
