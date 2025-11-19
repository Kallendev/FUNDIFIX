const Job = require('../models/Job.js');
const User = require('../models/User.js');

// CREATE JOB — allowed for clients
const createJob = async (req, res) => {
  try {
    if (req.user.role !== 'client') {
      return res.status(403).json({ message: 'Only clients can create jobs' });
    }

    const { title, description, category, budget,location } = req.body;

    if (!title || !description ||!location || !category || budget === undefined) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    if (budget < 0) {
      return res.status(400).json({ message: 'Budget must be a positive number' });
    }

    const job = new Job({
      title,
      description,
      category,
      budget,
      location,
      createdBy: req.user.userId,
    });

    await job.save();

    await User.findByIdAndUpdate(req.user.userId, {
      $inc: { jobsPosted: 1 }
    });

    res.status(201).json({ message: 'Job created successfully', job });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET ALL JOBS
const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find().populate('createdBy assignedTo');
    res.status(200).json({ jobs });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET SINGLE JOB BY ID
const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id).populate('createdBy assignedTo');
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    res.status(200).json({ job });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// controllers/jobControllers.js (add this function somewhere near the others)

const getJobsByClient = async (req, res) => {
  try {
    // req.user.userId is populated by your authenticateToken middleware
    const clientId = req.user?.userId;
    if (!clientId) {
      return res.status(400).json({ message: 'Client id not found in token' });
    }

    // Find jobs created by this client
    const jobs = await Job.find({ createdBy: clientId }).populate('createdBy assignedTo');

    // Keep same response shape as getAllJobs (object with jobs property)
    return res.status(200).json({ jobs });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};


// UPDATE JOB — only job creator can update
const updateJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    if (job.createdBy.toString() !== req.user.userId && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to update this job' });
    }

    const previousStatus = job.status;
    const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (previousStatus !== 'completed' && req.body.status === 'completed' && updatedJob.assignedTo) {
      await User.findByIdAndUpdate(updatedJob.assignedTo, {
        $inc: { jobsCompleted: 1 }
      });
    }

    res.status(200).json({ message: 'Job updated successfully', job: updatedJob });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE JOB — only job creator can delete
const deleteJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    if (job.createdBy.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Not authorized to delete this job' });
    }

    await job.remove();
    res.status(200).json({ message: 'Job deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const applyForJob = async (req, res) => {
  try {
    const jobId = req.params.id;
    const fundiId = req.user.userId;

    if (req.user.role !== 'fundi') {
      return res.status(403).json({ message: 'Only fundis can apply for jobs' });
    }

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    if (job.applicants.includes(fundiId)) {
      return res.status(400).json({ message: 'You have already applied for this job' });
    }

    job.applicants.push(fundiId);
    await job.save();

    res.status(200).json({ message: 'Application submitted successfully', job });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createJob,
  getAllJobs,
  getJobById,
  updateJob,
  deleteJob,
  getJobsByClient,
  applyForJob,
};
