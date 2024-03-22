const express = require('express');
const Job = require('../models/jobs');
const router = express.Router();
const bcrypt = require('bcryptjs');
const Applicant = require('../models/applicants');
const jwt = require('jsonwebtoken')
const {generateNewPasswordToken, sendNewPasswordVerification, generateNewEmailToken, sendNewEmailVerification} = require('../configs/email-config');
const {jwtDecode} = require('jwt-decode');
const JobApplication = require('../models/jobApplications');
const Admin = require('../models/admins');
const Resume = require('../models/resumes');
const ObjectId = require('mongodb').ObjectID;

router.get('/fetch-jobs-list-applicant/:id', async (req, res, next) => {
    const result = await Applicant.find({_id: req.params.id});
    const jobApplicationIds = result[0].jobApplicationsM.map(application => application.toString());
    const toFilterJobs = [];
    
    for (let id of jobApplicationIds) {
      const jobApp = await JobApplication.find({_id: id});
      toFilterJobs.push(jobApp[0].jobIDForeignKeyM);
    }
    Job.find({jobEnlistedM: true, _id: {$nin: toFilterJobs}})
    .then(result => {
      JobApplication.find()
        .then(jobApps => {
          res.json({jobs:result, jobApplications: jobApps})
        })
    })
});


router.get('/fetch-jobs-list-admin', (req, res, next) => {
  Job.find()
    .then(jobsList => res.json({jobs: jobsList}))
})

router.get('/fetch-jobs-list', (req, res, next) => {
  Job.find({jobEnlistedM: true})
    .then(jobsList => res.json({jobs: jobsList}))
})


router.post('/set-new-password', (req, res, next) => {
  const token = generateNewPasswordToken(req.body.applicantID, req.body.newPassword)
  sendNewPasswordVerification(req.body.applicantEmail, req.body.applicantFirstName, token)
    .then(result => res.send(result))

router.get('/verify-new-password', (req, res, next) => {
    const obtainedToken = req.query.token
    const decodedToken = jwtDecode(obtainedToken)
    const newPassword = decodedToken.newPassword
    const applicantID = decodedToken.applicantID
    jwt.verify(obtainedToken, process.env.JWT_SECRET, (err) => {
        if (err) {
            res.status(400).send('Invalid or expired verification link.');
        } else {
          bcrypt.hash(newPassword, 10).then(hash => {
            const newCredential = {passwordM: hash}
            Applicant.updateOne({_id: applicantID}, newCredential)
              .then(result => res.send(`password successfully changed!`))
          })
        }
    })
})
})

router.post('/set-new-first-name', (req, res, next) => {
  Applicant.updateOne({_id: req.body.applicantID}, {firstNameM: req.body.applicantFirstName})
    .then(result => res.send(result))
})

router.post('/set-new-first-name-admin', (req, res, next) => {
  Admin.updateOne({_id: req.body.applicantID}, {firstNameM: req.body.applicantFirstName})
    .then(result => res.send(result))
})

router.post('/set-new-last-name', (req, res, next) => {
  Applicant.updateOne({_id: req.body.applicantID}, {lastNameM: req.body.applicantLastName})
    .then(result => res.send(result))
})

router.post('/set-new-last-name-admin', (req, res, next) => {
  Admin.updateOne({_id: req.body.applicantID}, {lastNameM: req.body.applicantLastName})
    .then(result => res.send(result))
})


router.post('/set-new-email', (req, res, next) => {
  const token = generateNewEmailToken(req.body.applicantID, req.body.applicantEmail)
  sendNewEmailVerification(req.body.applicantEmail, req.body.applicantFirstName, token)
    .then(result => res.send(result))
})

router.get('/verify-new-email', (req, res, next) => {
//   {
//   applicantID: '65dd72b804d5b587baf5a106',
//   newEmail: 'itsaedren@gmail.com',
//   exp: 1711017998,
//   iat: 1710413198
// }
    const obtainedToken = req.query.token
    const decodedToken = jwtDecode(obtainedToken)
    const newEmail = decodedToken.newEmail
    const applicantID = decodedToken.applicantID
    jwt.verify(obtainedToken, process.env.JWT_SECRET, (err) => {
        if (err) {
            res.status(400).send('Invalid or expired verification link.');
        } else {
          Applicant.find({_id: applicantID})
            .then(result => {
              if (result.length > 0) {
                console.log(result)
                const newCredential = {emailM: newEmail}
                Applicant.updateOne({_id: applicantID}, newCredential)
                  .then(result => res.send(`applicant email successfully changed!`))
                } else {
                  const newCredential = {emailM: newEmail}
                  Admin.updateOne({_id:applicantID}, newCredential)
                    .then(result => res.send(`admin email successfully changed!`))
                }
            })
            
        }
    })
})

router.post('/delist-job', (req, res, next) => {
  Job.updateOne({_id: req.body.jobID}, {jobEnlistedM: false})
    .then(res.send({success: 'successfully delisted'}))
})

router.post('/enlist-job', (req, res, next) => {
  Job.updateOne({_id: req.body.jobID}, {jobEnlistedM: true})
    .then(res.send({success: 'successfully enlisted'}))
})


router.post('/delete-account', (req, res, next) => {
   Applicant.findOne({_id: req.body.applicantID})
    .then(applicant => {
      console.log(applicant)
      applicant.jobApplicationsM.map((jobApplicationID, index) => (
        JobApplication.deleteOne({_id: jobApplicationID})
          .then(result => console.log(result, 'job app deletion'))))
        
      Resume.deleteOne({applicantIDForeignKeyM: applicant._id})
            .then(result => console.log(result, 'resume deletion'))
            
      Applicant.deleteOne({_id: applicant._id})
        .then(res.json({deletionSuccess: 'account successfully deleted!'}))

})})


router.post('/withdraw-application', (req, res, next) => {
  JobApplication.updateOne({_id: req.body.jobApplicationID}, {currentStepM: 'withdrawnApplication'})
    .then(result => res.json({success: 'Withdrawn Application'}))

  
})

router.post('/create-account-admin', (req, res, next) => {
  bcrypt.hash(req.body.confirmPasswordAdmin, 10).then(hash => {
    const newAdmin = new Admin({
    emailM: req.body.emailAdmin,
    firstNameM: req.body.firstNameAdmin,
    lastNameM: req.body.lastNameAdmin,
    passwordM: hash,
    admin: 'true'
  })
    newAdmin.save()
  })
  res.json({success: 'succeeded!'})
})

router.get('/get-job-apps-summary', (req, res, next) => {
  JobApplication.find()
    .then(result => res.send(result))
})


router.get('/get-job-stats', (req, res, next) => {
  JobApplication.find()
    .then(jobApplications => {
      Job.find()
        .then(jobs => {
          console.log(jobs, jobApplications)
          res.json({jobs: jobs, jobApplications: jobApplications})
        })
    })
})
module.exports = router;