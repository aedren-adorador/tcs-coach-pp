const mongoose = require('mongoose');

const applicantSchema = mongoose.Schema({
    emailM: {type:String, required: true, unique: true},
    firstNameM: {type: String, required: true},
    lastNameM: {type: String, required: true},
    passwordM: {type: String, required: true},
    admin: {type: String, required: true, default: 'false'},

    contactNumber: {type: String, required: false},
    birthday: {type: Date, required: false},
    education: {type: Array, required: false},
    
})

const Applicant = mongoose.model('Applicant', applicantSchema);

module.exports = Applicant;