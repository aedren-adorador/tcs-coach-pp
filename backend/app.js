const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const Applicant = require('./models/applicants');
const Admin = require('./models/admins');
const Job = require('./models/jobs');
const ObjectId = require('mongodb').ObjectId;

require('dotenv').config();

// Mandatory Settings
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

mongoose.connect(process.env.MONGODB_CONNECT)
  .then(() => {console.log('connected to mongodb!')})
  .catch(() => {console.log('failed to connect')})

// Nodemailer Config
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: process.env.USER_EMAIL,
        pass: 'lzak mkcu qfft unlu',
    }
});

function generateVerificationToken(email) {
  const expirationTime = Math.floor(Date.now() / 1000) + 45 * 60;
  return jwt.sign({ email, exp: expirationTime }, process.env.JWT_SECRET);
}

async function sendEmail(emailAddressInput, token) {
    const verificationLink = `http://localhost:3001/api/auth/verify?token=${token}&email=${emailAddressInput}`
    await transporter.sendMail({
      from: process.env.USER_EMAIL, // sender address
      to: emailAddressInput, // list of receivers
      subject: "[Action Required] The Coding School Application - Verify your account",
      html: `<p style='font-size: 14px'>Dear Applicant</p><br/><p>Thank you for your interest in applying to The Coding School! To proceed with your account creation, kindly verify your email by clicking on this link: <a href=${verificationLink}><p>Confirm Here</p><a/></p>`
    })
}

// Main Requests
app.post('/api/auth/send-verification-email', (req, res, next) => {
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

app.get('/api/auth/verify',(req, res, next) => {
    const obtainedToken = req.query.token
    const obtainedEmail = req.query.email
    jwt.verify(obtainedToken, process.env.JWT_SECRET, (err) => {
        if (err) {
            res.status(400).send('Invalid or expired verification link.');
        } else {
            res.redirect(`http://localhost:3000/create-applicant-account?email=${encodeURIComponent(obtainedEmail)}`)
        }
    })
})

app.post('/api/auth/create-account', (req, res, next) => {
  bcrypt.hash(req.body.confirmPassword, 10).then(hash => {
    const newApplicant = new Applicant({
    emailM: req.body.email,
    firstNameM: req.body.firstName,
    lastNameM: req.body.lastName,
    passwordM: hash
  })
  newApplicant.save()
  })
})

app.post('/api/auth/login', (req, res, next) => {
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

app.post('/api/get-user-info', (req, res, next) => {
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

app.post('/api/create-account/admin', (req, res, next) => {
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

app.get('/api/get-applicants', (req, res, next) => {
  Applicant.find()
    .then(applicants => {
      res.json({applicants: applicants})
    })
})

app.post('/api/create-job', (req, res, next) => {
  console.log(req.body)
  const newJob = new Job({
    jobTitleM: req.body.jobTitle,
    jobLocationM: req.body.jobLocation,
    jobDescriptionM: req.body.jobDescription,
    jobResponsibilitiesM: req.body.jobResponsibilities,
    jobQualificationsM: req.body.jobQualifications,
    jobSegmentationM: req.body.jobSegmentation
  })
  newJob.save()
    .then(res.json({result: newJob}))
})


app.get('/api/fetch-jobs-list', (req, res, next) => {
  Job.find()
    .then(jobsList => res.json({jobs: jobsList}))
})

app.delete('/api/delete-job/:id', (req, res, next) => {
  Job.deleteOne({_id: req.params.id})
    .then(
      Job.find()
        .then(updatedJobs => [
          res.json({updatedJobs: updatedJobs})
        ])
    )
})
module.exports = app;