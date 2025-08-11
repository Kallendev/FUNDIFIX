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

  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
