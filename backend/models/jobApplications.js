const mongoose = require('mongoose');

const jobApplication = mongoose.Schema({
    applicantIDForeignKeyM : {type: String, required: false, default: ''},
    jobIDForeignKeyM : {type: String, required: false, default: ''},
    contactNumberM: {type: String, required: false, default: ''},
    birthdayM: {type: Date, required: false, default: ''},
    educationM: {type: Array, required: false, default: []},
    resumeM: {type: String, required: false, default: ''},
    linkedInM: {type: String, required: false, default: ''},
    f2fM: {type: String, required: false, default: ''},
    addressM: {type: String, required: false, default: ''},
    coachingExperienceM: {type: Array, required: false, default: []},
    areasOfExpertiseM: {type: Array, required: false, default:[]},
    sourceOfInfoM: {type: String, required: false, default: ''},
    availabilityM: {type: Array, required: false, default: []},
    internetSpeedM: {type: String, required: false, default: ''},
    referredByM: {type: String, required: false, default: ''},
    positionAppliedToM: {type: String, required: false, default: ''},

    currentStepM: {type: String, required: false, default: ''},
    dateSubmittedApplicationM: {type: Date, required: false, default: ''},

    dateSubmittedInterviewM: {type: Date, required: false, default: ''},
    deadlineDateInterviewM: {type: Date, required: false, default: ''},
    interviewTokenM: {type: String, required: false, default: ''},
    interviewCriteriaScoresM: {type: Object, required: false, default: {}},

    dateSubmittedTeachingDemoM: {type: Date, required: false, default: ''},
    deadlineDateTeachingDemoM: {type: Date, required: false, default: ''},
    teachingDemoTokenM: {type: String, required: false, default: ''},

    dateSubmittedOnboardingRequirementsM: {type: Date, required: false, default: ''},
    deadlineDateOnboardingRequirementsM: {type: Date, required: false, default: ''},
    onboardingRequirementsTokenM: {type: String, required: false, default: ''},
 
    finalVerdictM: {type: String, required: false, default: ''}
})

const JobApplication = mongoose.model('JobApplication', jobApplication);

module.exports = JobApplication;