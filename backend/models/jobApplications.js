const mongoose = require('mongoose');

const jobApplication = mongoose.Schema({
    applicantIDForeignKeyM : {type: String, required: false, default: null},
    jobIDForeignKeyM : {type: String, required: false, default: null},
    contactNumberM: {type: String, required: false, default: null},
    birthdayM: {type: Date, required: false, default: null},
    educationM: {type: Array, required: false, default: null},
    linkedInM: {type: String, required: false, default: null},
    f2fM: {type: String, required: false, default: null},
    addressM: {type: String, required: false, default: null},
    coachingExperienceM: {type: String, required: false, default: null},
    areasOfExpertiseM: {type: String, required: false, default: null},
    sourceOfInfoM: {type: String, required: false, default: null},
    availabilityM: {type: Array, required: false, default: null},
    internetSpeedM: {type: String, required: false, default: null},
    referredByM: {type: String, required: false, default: null},
    positionAppliedToM: {type: String, required: false, default: null},

    currentStepM: {type: String, required: false, default: null},
    dateSubmittedApplicationM: {type: Date, required: false, default: null},
    dateSubmittedInterviewM: {type: Date, required: false, default: null},
    dateSubmittedTeachingDemoM: {type: Date, required: false, default: null},
    dateSubmittedOnboardingRequirementsM: {type: Date, required: false, default: null},
    finalVerdictM: {type: String, required: false, default: null}
})

const JobApplication = mongoose.model('JobApplication', jobApplication);

module.exports = JobApplication;