const mongoose = require('mongoose');

const jobSchema = mongoose.Schema({
    jobTitleM: {type:String, required: true},
    jobLocationM: {type: String, required: true},
    jobDescriptionM: {type: String, required: true},
    jobResponsibilitiesM: {type: String, required: true},
    jobQualificationsM: {type: String, required: true},
    jobSegmentationM: {type: String, required: true},
    jobCreatedAt: {type: Date, default: Date.now()}
})

const Job = mongoose.model('Job', jobSchema);

module.exports = Job;
