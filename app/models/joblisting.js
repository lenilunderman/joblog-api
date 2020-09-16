// importing moongose to create the schema
const mongoose = require('mongoose')

// create the schema for the job listing
const jobListingSchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: true
  },
  companyPosition: {
    type: String,
    required: true
  },
  companyPerson: {
    type: String,
    required: false
  },
  companyInfo: {
    type: String,
    required: false
  },
  companyDate: {
    type: String,
    required: false
  },
  companyReplied: {
    type: String,
    required: false
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('JobListing', jobListingSchema)
