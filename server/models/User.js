const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['admin', 'client', 'fundi'],
      default: 'client',
    },
    skills: {
      type: [String], // Example: ['Plumbing', 'Carpentry']
      default: [],
    },
    experience: {
      type: String, // Example: '5 years'
      default: '',
    },
    location: {
      type: String, // Example: 'Nairobi, Kenya'
      default: '',
    },
      profileImage: {
      type: String,
      default: ''
    },
    phone: {
      type: String,
      default: ''
    },
    ratings: [{
      ratedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      rating: { type: Number, min: 1, max: 5 },
      comment: { type: String, default: '' },
      createdAt: { type: Date, default: Date.now }
    }],
    averageRating: {
      type: Number,
      default: 0
    },
    jobsCompleted: {
      type: Number,
      default: 0
    },
    jobsPosted: {
      type: Number,
      default: 0
    },
    successRate: {
      type: Number,
      default: 0
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
