const mongoose = require('mongoose');

const applicantSchema = mongoose.Schema({
    emailM: {type:String, required: true, unique: true},
    firstNameM: {type: String, required: true},
    lastNameM: {type: String, required: true},
    passwordM: {type: String, required: true},
    admin: {type: String, required: true, default: 'false'},

    contactNumberM: {type: String, required: false},
    birthdayM: {type: Date, required: false},
    educationM: {type: Array, required: false},
    linkedInM: {type: String, required: false},
    f2f: {type: String, required: false},
    addressM: {type: String, required: false},
    choachingExperienceM: {type: String, required: false},
    areasOfExpertiseM: {type: String, required: false},
    sourceOfInfoM: {type: String, required: false},
    availabilityM: {type: Array, required: false},
    internetSpeedM: {type: Array, required: false},
    referredByM: {type: Array, required: false},
    dateSubmittedApplication: {type: Date, required: false},
    dateSubmittedInterview: {type: Date, required: false},
    dateSubmittedTeachingDemo: {type: Date, required: false},
    dateSubmittedOnboardingRequirements: {type: Date, required: false}
})

const Applicant = mongoose.model('Applicant', applicantSchema);

module.exports = Applicant;