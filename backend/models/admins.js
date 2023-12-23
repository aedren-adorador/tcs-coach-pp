const mongoose = require('mongoose');

const adminSchema = mongoose.Schema({
    emailM: {type:String, required: true, unique: true},
    firstNameM: {type: String, required: true},
    lastNameM: {type: String, required: true},
    passwordM: {type: String, required: true},
    admin: {type: Boolean, default: 'true'}
})

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;