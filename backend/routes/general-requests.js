const express = require('express');
const Job = require('../models/jobs');
const router = express.Router();
const bcrypt = require('bcryptjs');
const Applicant = require('../models/applicants');
const jwt = require('jsonwebtoken')
const {generateNewPasswordToken, sendNewPasswordVerification, generateNewEmailToken, sendNewEmailVerification} = require('../configs/email-config');
const {jwtDecode} = require('jwt-decode');
const JobApplication = require('../models/jobApplications');


router.get('/fetch-jobs-list-applicant/:id', (req, res, next) => {
  JobApplication.find({applicantIDForeignKeyM: req.params.id})
    .then(jobApplication => {
      Job.find({jobEnlistedM: true})
        .then(jobsList => {
          const newJobsList = jobsList.filter((i, index) => i._id.toString() !== jobApplication[0].jobIDForeignKeyM)
          res.json({jobs: newJobsList})
        })
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

router.post('/set-new-last-name', (req, res, next) => {
  Applicant.updateOne({_id: req.body.applicantID}, {lastNameM: req.body.applicantLastName})
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
module.exports = router;