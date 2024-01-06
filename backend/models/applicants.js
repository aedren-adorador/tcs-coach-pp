const mongoose = require('mongoose');

const applicantSchema = mongoose.Schema({
    emailM: {type:String, required: true, unique: true},
    firstNameM: {type: String, required: true},
    lastNameM: {type: String, required: true},
    passwordM: {type: String, required: true},
    admin: {type: String, required: true, default: 'false'},

    contactNumberM: {type: String, required: false, default: null},
    birthdayM: {type: Date, required: false, default: null},
    educationM: {type: Array, required: false, default: null},
    linkedInM: {type: String, required: false, default: null},
    f2f: {type: String, required: false, default: null},
    addressM: {type: String, required: false, default: null},
    choachingExperienceM: {type: String, required: false, default: null},
    areasOfExpertiseM: {type: String, required: false, default: null},
    sourceOfInfoM: {type: String, required: false, default: null},
    availabilityM: {type: Array, required: false, default: null},
    internetSpeedM: {type: Array, required: false, default: null},
    referredByM: {type: Array, required: false, default: null},
    positionAppliedToM: {type: String, required: false, default: null},
    dateSubmittedApplicationM: {type: Date, required: false, default: null},
    dateSubmittedInterviewM: {type: Date, required: false, default: null},
    dateSubmittedTeachingDemoM: {type: Date, required: false, default: null},
    dateSubmittedOnboardingRequirementsM: {type: Date, required: false, default: null},
    finalVerdictM: {type: String, required: false, default: null},
})

const Applicant = mongoose.model('Applicant', applicantSchema);

module.exports = Applicant;