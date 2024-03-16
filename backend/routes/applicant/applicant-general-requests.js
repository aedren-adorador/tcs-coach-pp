const express = require('express');
const JobApplication = require('../../models/jobApplications');
const Admin = require('../../models/admins');
const Applicant = require('../../models/applicants');
const router = express.Router();

router.get('/get-job-application/:details', async (req, res, next) => {
  const applicantDetails = await Applicant.find({_id: req.params.details})
  const jobApplicationIds = applicantDetails[0].jobApplicationsM.map(application => application.toString());

  const allApplications = []
  for (let jobApp of jobApplicationIds) {
    const application = await JobApplication.find({_id: jobApp})
    allApplications.push(application)
  }
  res.send(allApplications)

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
