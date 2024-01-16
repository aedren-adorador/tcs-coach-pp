const express = require('express');
const JobApplication = require('../../models/jobApplications');
const Admin = require('../../models/admins');
const Applicant = require('../../models/applicants');
const router = express.Router();

router.get('/get-job-application/:details', (req, res, next) => {
  const jobApplicationID = req.params.details
  JobApplication.findOne({_id:jobApplicationID })
    .then(record => res.json({submittedApplicationDetails: record}))
})

router.post('/get-user-info', (req, res, next) => {
  Admin.findOne({_id: req.body.id})
    .then(isAdmin => {
      if (isAdmin) {
        res.json(isAdmin)
      } else {
        Applicant.findOne({_id: req.body.id})
          .then(applicant => {
            res.json(applicant)
          })
      }
    })
})

module.exports = router;
