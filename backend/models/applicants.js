const mongoose = require('mongoose');

const applicantSchema = mongoose.Schema({
    emailM: {type:String, required: true, unique: true},
    firstNameM: {type: String, required: true},
    lastNameM: {type: String, required: true},
    passwordM: {type: String, required: true},
    admin: {type: String, required: true, default: 'false'},
    applied: {type: Boolean, required: true, default: false},
})

const Applicant = mongoose.model('Applicant', applicantSchema);

module.exports = Applicant;