const mongoose = require('mongoose');

const criteria = mongoose.Schema({
    criterionM: { type: String, default: ''}
})

const Criteria = mongoose.model('Criteria', criteria);

module.exports = Criteria;

