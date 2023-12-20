const mongoose = require('mongoose');

const applicantSchema = mongoose.Schema({
    emailM: {type:String, required: true},
    firstNameM: {type: String, required: true},
    lastNameM: {type: String, required: true},
    passwordM: {type: String, required: true}
})

const Applicant = mongoose.model('Applicant', applicantSchema);

module.exports = Applicant;