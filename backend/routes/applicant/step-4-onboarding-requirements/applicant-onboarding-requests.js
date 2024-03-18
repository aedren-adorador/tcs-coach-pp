const express = require('express');
const JobApplication = require('../../../models/jobApplications');
const router = express.Router();

router.post('/submit-onboarding-link', (req, res, next) => {
    console.log(req.body)
    JobApplication.updateOne({_id: req.body.submittedJobApplicationDetails[0][0]._id}, {onboardingRequirementsM: req.body.onboardingLink, dateSubmittedTeachingDemoM: new Date(), currentStepM: 'submittedOnboardingRequirements'})
        .then(result => res.send(result))
})

module.exports = router;