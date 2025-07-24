const mongoose = require('mongoose')

const jobSchema = new mongoose.Schema({
  title: String,
  description: String,
  category: String,
  budget: Number,
  location: String,
  status: {
    type: String,
    enum: ['open', 'assigned', 'completed'],
    default: 'open',
  },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true })

module.exports = mongoose.model('Job', jobSchema)


