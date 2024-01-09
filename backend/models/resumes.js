const mongoose = require('mongoose');

const resumeSchema = mongoose.Schema({
    applicantIDForeignKeyM: {type: String, required: true},
    jobIDForeignKeyM: {type: String, required: true, unique: true},
    resumeFileNameM: {type: String, required: true, },
})

const Resume = mongoose.model('Resume', resumeSchema);

module.exports = Resume;