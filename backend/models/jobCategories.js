const mongoose = require('mongoose');

const jobCategory = mongoose.Schema({
    categoryM: { type: String, default: ''}
})

const JobCategory = mongoose.model('JobCategory', jobCategory);

module.exports = JobCategory;

