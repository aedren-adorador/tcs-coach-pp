const express = require('express');
const JobApplication = require('../../../models/jobApplications');
const router = express.Router();

router.post('/submit-demo-link', (req, res, next) => {
    JobApplication.updateOne({_id: req.body.submittedJobApplicationDetails[0][0]._id}, {teachingDemoM: req.body.demoLink, dateSubmittedTeachingDemoM: new Date(), currentStepM: 'submittedTeachingDemo'})
        .then(result => res.send(result))
})

module.exports = router;