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
const JobApplication = require('./models/jobApplications');
const fs = require('fs');

const Resume = require('./models/resumes');
require('dotenv').config();
const multer = require('multer');
const { stringify } = require('querystring');
const { Blob } = require('buffer');

// Mandatory Settings
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/resumes', express.static('resumes'))

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './resumes')
  },
  filename: function (req, file, cb) {
    cb(null, 'TCS-Resume-'+Math.round(Math.random() * 1E9)+'-'+file.originalname)
  }
})

const upload = multer({ storage: storage })


const interviewStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './interview-recordings');
  },
  filename: function (req, file, cb) {
    console.log('HERE WE GO')
    cb(null, 'TCS-Interview-' + Math.round(Math.random() * 1E9)+'.webm');
  }
});

const uploadInterview = multer({ storage: interviewStorage });


app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS, PUT"
  );
  next();
});

mongoose.connect(process.env.MONGODB_CONNECT, {
  // useNewUrlParser: true
})
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

function generateInterviewToken(applicantID, jobAppID) {
  const expirationTime = Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60;
  return jwt.sign({ applicantID, jobAppID, exp: expirationTime }, process.env.JWT_SECRET);
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

async function sendInterviewInvite(emailAddressInput, position, deadline, applicantName) {
  await transporter.sendMail({
      from: process.env.USER_EMAIL,
      to: emailAddressInput,
      subject: "Congratulations! The Coding School Application - Interview Invitation",
      html: `<p style='font-size: 14px'>Dear ${applicantName}</p><br/><p>We are pleased to inform you that you have passed the initial screening for the ${position} position! The next step of the application process would be an asynchronous video interview which will further make us get to know you more in terms of experience, values, and qualities for the role. Do not worry as we have provided a quick tutorial before you take the interview. Please note that you have until ${deadline} to take the interview, and <strong>it can be accessed by logging-in to your TCS Coach++ account.</strong> Goodluck!`
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

app.post('/api/send-interview-invite', async (req, res, next) => {
  const details = req.body
  const stringifiedDeadline = new Date(details.oneWeekDeadline).toDateString()
  const update = await JobApplication.aggregate([
            {
              $lookup: {
                from: 'applicants',  
                let: { localFieldConverted: { $toObjectId: '$applicantIDForeignKeyM' } },
                pipeline: [
                  {
                    $match: {
                      $expr: {
                        $eq: ['$_id', '$$localFieldConverted']
                      }
                    }
                  }
                ],
                as: 'applicantJoinedDetails'
              }
            },
          ]).exec();
  const filteredUpdate = update.filter(jobApp => jobApp._id.toString() === req.body.jobApplicationID)
  const filteredUpdateLevel2 = [{...filteredUpdate[0], currentStepM: 'waitingForInterviewSubmission'}]
  const token = generateInterviewToken(req.body.applicantID, req.body.jobApplicationID)
  JobApplication.updateOne({_id: req.body.jobApplicationID}, {currentStepM: 'waitingForInterviewSubmission', interviewTokenM: token})
    .then(
      sendInterviewInvite(details.emailAddress, details.position, stringifiedDeadline, details.firstName)
        .then(result => {
          JobApplication.updateOne({_id: req.body.jobApplicationID}, {deadlineDateInterviewM: new Date(details.oneWeekDeadline)})
            .then(
              res.json({success: 'Interview Invite Sent via Email!', joinedApplicantAndJobApplicationDetails: filteredUpdateLevel2})
            )  
        })
    )
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

app.post('/api/verify-interview-token', (req, res, next) => {
  JobApplication.findOne({_id: req.body.jobApplicationID})
    .then(result => {
      jwt.verify(result.interviewTokenM, process.env.JWT_SECRET, (err) => {
        if (err) {
            res.status(400).send('Invalid or expired interview link.');
        } else {
            res.json({success: 'interview link verified!', token: result.interviewTokenM})
        }
      })
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

app.get('/api/get-job-to-update/:id', (req, res, next) => {
  Job.findOne({_id:req.params.id})
    .then(result => res.json({jobToUpdate: result}))
})

app.put('/api/update-job', (req, res, next) => {
  const updatedJob = {
    jobTitleM: req.body.jobTitle,
    jobLocationM: req.body.jobLocation,
    jobDescriptionM: req.body.jobDescription,
    jobResponsibilitiesM: req.body.jobResponsibilities,
    jobQualificationsM: req.body.jobQualifications,
    jobSegmentationM: req.body.jobSegmentation
  }
  Job.updateOne({_id: req.body.jobId}, updatedJob)
    .then(result => res.json({success: 'updated!'}))
})


app.post('/api/save-job-application-progress', (req, res, next) => {
  JobApplication.findOne({applicantIDForeignKeyM:req.body.applicantIDForeignKey, jobIDForeignKeyM: req.body.jobIDForeignKey})
    .then(record => {
      if(record) {
        const updatedJobApplication = {
          applicantIDForeignKeyM : req.body.applicantIDForeignKey,
          jobIDForeignKeyM : req.body.jobIDForeignKey,
          contactNumberM: req.body.contactNumber,
          birthdayM: req.body.birthday,
          educationM: req.body.education,
          linkedInM: req.body.linkedIn,
          f2fM: req.body.f2f,
          address: req.body.address,
          coachingExperienceM: req.body.coachingExperience,
          areasOfExpertiseM: req.body.areasOfExpertise,
          sourceOfInfoM: req.body.sourceOfInfo,
          availabilityM: req.body.availability,
          internetSpeedM: req.body.internetSpeed,
          referredByM: req.body.referredBy,
          positionAppliedToM: req.body.positionAppliedTo,
          currentStepM: req.body.currentStep,
          dateSubmittedApplicationM: req.body.dateSubmittedApplication,
          dateSubmittedInterviewM: req.body.dateSubmittedInterview,
          dateSubmittedTeachingDemoM: req.body.dateSubmittedTeachingDemo,
          dateSubmittedOnboardingRequirementsM: req.body.dateSubmittedOnboardingRequirements,
          finalVerdictM: req.body.finalVerdict
        }
        JobApplication.updateOne({applicantIDForeignKeyM:req.body.applicantIDForeignKey, jobIDForeignKeyM: req.body.jobIDForeignKey}, updatedJobApplication)
          .then(() => (
            JobApplication.findOne({applicantIDForeignKeyM:req.body.applicantIDForeignKey, jobIDForeignKeyM: req.body.jobIDForeignKey})
              .then(result => res.json({updatedJobApplication: result}))
          ))
      } else {

      }
    })
})

app.get('/api/verify-application-if-continue-or-new/:details', (req, res, next) => {
   const details = JSON.parse(req.params.details);
   JobApplication.findOne({applicantIDForeignKeyM: details.applicantData._id, jobIDForeignKeyM: details.jobData._id})
   .then(record => {
      if (record) {
        res.json({jobApplicationSavedDetails: record})
      } else {
        const newJobApplication = new JobApplication({
          applicantIDForeignKeyM: details.applicantData._id,
          jobIDForeignKeyM: details.jobData._id
        })
        newJobApplication.save()
          .then(record => {
            res.json({jobApplicationSavedDetails: record})
          })
      }
    })
})


app.post('/api/upload-resume', upload.single('resume'), (req, res, next)  => {
  Resume.findOne({applicantIDForeignKeyM: req.body.id, jobIDForeignKeyM: req.body.jobID})
    .then(record => {
      if (record) {
        const filePath = 'resumes/'+record.resumeFileNameM
        fs.unlink(filePath, (err) => {
          if (err) {
            console.error('Error deleting file:', err);
            return;
          }
        });
        const toUpdate = { resumeFileNameM: req.file.filename }
        Resume.updateOne({applicantIDForeignKeyM: req.body.id, jobIDForeignKeyM: req.body.jobID}, toUpdate)
          .then(result => {
            console.log("Updated Resume for " + req.body.firstName + ' ' + req.body.lastName)
            Resume.findOne({applicantIDForeignKeyM: req.body.id, jobIDForeignKeyM: req.body.jobID})
              .then(result => {
                const resumeLink = `http://localhost:3001/resumes/${result.resumeFileNameM}`
                JobApplication.updateOne({applicantIDForeignKeyM: req.body.id, jobIDForeignKeyM: req.body.jobID}, {resumeM:resumeLink})
                  .then(()=>{
                    console.log('Updated Job Application Resume Link in Backend')
                    res.json({resumeLink:resumeLink})
                  }) 
              })
          })
      } else {
        const newResume = new Resume({
          resumeFileNameM: req.file.filename,
          applicantIDForeignKeyM: req.body.id,
          jobIDForeignKeyM: req.body.jobID
        })
        newResume.save()
          .then(result => {
            console.log('Resume saved!')
            const resumeLink = `http://localhost:3001/resumes/${result.resumeFileNameM}`
            JobApplication.updateOne({applicantIDForeignKeyM: req.body.id, jobIDForeignKeyM: req.body.jobID}, {resumeM:resumeLink})
              .then(()=>{
                console.log('Updated Job Application Resume Link in Backend')
                res.json({resumeLink:resumeLink})
              }) 
          })
      }
    })
})

app.get('/api/get-job-application-resume/:details', (req, res, next) => {
  const details = JSON.parse(req.params.details)
  JobApplication.findOne({applicantIDForeignKeyM:details.applicantID, jobIDForeignKeyM: details.jobID})
    .then(result => res.json({savedResumeLink: result.resumeM}))
})

app.post('/api/save-job-application-id-to-applicant', (req, res, next) => {
  const toUpdateDetailsForJobApp = { dateSubmittedApplicationM: new Date(), positionAppliedToM: req.body.position, currentStepM: req.body.currentStep }
  JobApplication.updateOne({applicantIDForeignKeyM: req.body.applicantID, jobIDForeignKeyM: req.body.jobID}, toUpdateDetailsForJobApp)
    .then(
       JobApplication.findOne({applicantIDForeignKeyM: req.body.applicantID, jobIDForeignKeyM: req.body.jobID})
        .then(result => {
          Applicant.findOne({_id: req.body.applicantID})
            .then(toUpdateApplicant => {
                const toUpdateDetails = {
                  jobApplicationsM: toUpdateApplicant.jobApplicationsM.includes(result._id) ? [toUpdateApplicant.jobApplicationsM]:[...toUpdateApplicant.jobApplicationsM, result._id],
                }
                Applicant.updateOne({_id: req.body.applicantID}, toUpdateDetails)
                    .then(result => res.json({result: result}))
              }
            )
          }
        )
    )
})


app.get('/api/get-job-application/:details', (req, res, next) => {
  const jobApplicationID = req.params.details
  JobApplication.findOne({_id:jobApplicationID })
    .then(record => res.json({submittedApplicationDetails: record}))
})

app.get('/api/get-job-applications-joined-with-applicants', async (req, res, next) => {
  const result = await JobApplication.aggregate([
  {
    $lookup: {
      from: 'applicants',  
      let: { localFieldConverted: { $toObjectId: '$applicantIDForeignKeyM' } },
      pipeline: [
        {
          $match: {
            $expr: {
              $eq: ['$_id', '$$localFieldConverted']
            }
          }
        }
      ],
      as: 'applicantJoinedDetails'  // The alias for the merged data
    }
  },
]).exec();
res.json({joinedApplicantAndJobApplicationDetails: result})
  
});

app.post('/api/submit-interview', uploadInterview.single('interview'), (req, res) => {
  console.log(req.file)
})

module.exports = app;