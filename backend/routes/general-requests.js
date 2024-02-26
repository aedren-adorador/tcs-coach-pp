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

router.get('/fetch-jobs-list-applicant/:id', (req, res, next) => {
  JobApplication.find({applicantIDForeignKeyM: req.params.id})
    .then(jobApplication => {
      if (jobApplication.length === 0) {
        Job.find({jobEnlistedM: true})
          .then(result => res.json({jobs: result}))
      } else {
        Job.find({jobEnlistedM: true})
        .then(jobsList => {
          const newJobsList = jobsList.filter((i, index) => i._id.toString() !== jobApplication[0].jobIDForeignKeyM)
          res.json({jobs: newJobsList})
        })
      }
    })
})

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
    const obtainedToken = req.query.token
    const decodedToken = jwtDecode(obtainedToken)
    const newEmail = decodedToken.newEmail
    const applicantID = decodedToken.applicantID
    jwt.verify(obtainedToken, process.env.JWT_SECRET, (err) => {
        if (err) {
            res.status(400).send('Invalid or expired verification link.');
        } else {
            const newCredential = {emailM: newEmail}
            Applicant.updateOne({_id: applicantID}, newCredential)
              .then(result => res.send(`email successfully changed!`))
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
  console.log(req.body)
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
  console.log(req.body)
  Applicant.find({_id: req.body.applicantID})
    .then(applicant => {
      const copy = [...applicant[0].jobApplicationsM]
      const newArrayOfJobApplications = copy.filter((jobApp, index) => (jobApp.toString() !== req.body.jobApplicationID.toString()))
      Applicant.updateOne({_id: req.body.applicant.ID}, newArrayOfJobApplications)
        .then(result => console.log(result))
    })
  JobApplication.deleteOne({_id: req.body.jobApplicationID})
    .then(result => console.log(result))

  res.json({success: 'Withdrawn Application'})
})

module.exports = router;