const express = require('express');
const Job = require('../models/jobs');
const router = express.Router();

router.get('/fetch-jobs-list', (req, res, next) => {
  Job.find()
    .then(jobsList => res.json({jobs: jobsList}))
})

module.exports = router;