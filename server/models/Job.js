const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  budget: { type: Number, required: true },
  location: { type: String, required: true },
  status: {
    type: String,
    enum: ['open', 'assigned', 'completed'],
    default: 'open',
  },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // client
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null }, // fundi
}, { timestamps: true });

module.exports = mongoose.model('Job', jobSchema);

