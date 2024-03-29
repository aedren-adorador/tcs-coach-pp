const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Applicant = require('../../models/applicants');
const {sendEmail, generateVerificationToken, generateForgotPasswordToken, sendForgotPasswordVerification } = require('../../configs/email-config');
const Admin = require('../../models/admins');
const bcrypt = require('bcryptjs');

router.post('/send-verification-email', (req, res) => {
    Applicant.findOne({emailM: req.body.email.toLowerCase()})
      .then(result => {
        if (result===null) {
          const email = req.body.email
          const token = {string: generateVerificationToken(email)}
        
          sendEmail(email, token.string)
            .then(success => res.json({successMessage: 'Verification link sent to your email!'}))
        } else {
          res.status(400).json({errorMessage: 'Email already taken!'})
        }
      })
})

router.get('/verify',(req, res) => {
    const obtainedToken = req.query.token
    const obtainedEmail = req.query.email
    jwt.verify(obtainedToken, process.env.JWT_SECRET, (err) => {
        if (err) {
            res.status(400).send('Invalid or expired verification link.');
        } else {
            res.redirect(`${process.env.MAIN_URL}/create-applicant-account?email=${encodeURIComponent(obtainedEmail)}`)
        }
    })
})


router.post('/login', (req, res, next) => {
  Admin.findOne({emailM: req.body.emailLogin.toLowerCase()})
    .then(isAdmin => {
      if (isAdmin) {
        bcrypt.compare(req.body.passwordLogin, isAdmin.passwordM)
          .then(isPasswordCorrect => {
            if (isPasswordCorrect) {
              const token = jwt.sign({userID: isAdmin._id, admin: isAdmin.admin}, process.env.JWT_SECRET, {expiresIn: '1hr'})
              res.json({success: true, token: token})
            } else {
              console.log("ERROR WRONG PASS")
              res.json({success: false})
            }
          })
      } else {
         Applicant.findOne({emailM: req.body.emailLogin.toLowerCase()})
        .then(isApplicant => {
          if (isApplicant) {
            bcrypt.compare(req.body.passwordLogin, isApplicant.passwordM)
            .then(isPasswordCorrect => {
              if (isPasswordCorrect) {
                const token = jwt.sign({userID: isApplicant._id, admin: isApplicant.admin}, process.env.JWT_SECRET, {expiresIn: '1hr'})
                res.json({success: true, token: token})
              } else {
                console.log("ERROR WRONG PASS")
                res.json({success: false})
              }
            })
          } else {
            res.json({sucess: false})
          }
        })
      }
    })
})

router.post('/create-account', (req, res, next) => {
  console.log(req.body)
  bcrypt.hash(req.body.confirmPassword, 10).then(hash => {
    const newApplicant = new Applicant({
    emailM: req.body.email,
    firstNameM: req.body.firstName,
    lastNameM: req.body.lastName,
    passwordM: hash,
    isNotifsOnM: req.body.notifs
  })
  newApplicant.save()
  })
})


router.post('/send-forgot-password-email', (req, res, next) => {
  const token = generateForgotPasswordToken(req.body.applicantEmail)
  sendForgotPasswordVerification(req.body.applicantEmail, token)
    .then(result => res.send(result))
})


router.get('/verify-forgot-password',(req, res) => {
    const obtainedToken = req.query.token
    const obtainedEmail = req.query.email
    jwt.verify(obtainedToken, process.env.JWT_SECRET, (err) => {
        if (err) {
            res.status(400).send('Invalid or expired verification link.');
        } else {
            res.redirect(`${process.env.MAIN_URL}/set-new-password?email=${encodeURIComponent(obtainedEmail)}`)
        }
    })
})

router.post('/set-new-password', (req, res, next) => {
  bcrypt.hash(req.body.setPassword, 10)
    .then(hash => {
      Applicant.updateOne({emailM: req.body.email}, {passwordM: hash})
        .then(result => {
          console.log(result)
          res.send(result)
        })
    })
})

module.exports = router;
