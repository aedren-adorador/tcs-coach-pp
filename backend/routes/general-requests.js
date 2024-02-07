const express = require('express');
const Job = require('../models/jobs');
const router = express.Router();
const bcrypt = require('bcryptjs');
const Applicant = require('../models/applicants');
const jwt = require('jsonwebtoken')
const {generateNewPasswordToken, sendNewPasswordVerification} = require('../../backend/configs/email-config');
const {jwtDecode} = require('jwt-decode');


router.get('/fetch-jobs-list', (req, res, next) => {
  Job.find()
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


// router.post('/create-account', (req, res, next) => {
//   bcrypt.hash(req.body.confirmPassword, 10).then(hash => {
//     const newApplicant = new Applicant({
//     emailM: req.body.email,
//     firstNameM: req.body.firstName,
//     lastNameM: req.body.lastName,
//     passwordM: hash
//   })
//   newApplicant.save()
//   })
// })




module.exports = router;