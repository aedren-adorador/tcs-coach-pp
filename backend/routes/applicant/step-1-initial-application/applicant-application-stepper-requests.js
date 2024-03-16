const express = require('express');
const JobApplication = require('../../../models/jobApplications');
const Applicant = require('../../../models/applicants');
const router = express.Router();

router.post('/save-job-application-progress', (req, res, next) => {
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
          .then(result => {
            console.log(result)
            JobApplication.findOne({applicantIDForeignKeyM:req.body.applicantIDForeignKey, jobIDForeignKeyM: req.body.jobIDForeignKey})
              .then(result => {
                res.json({updatedJobApplication: result})
              })
        })
      } else {
      }
    })
})

router.post('/save-job-application-progress-education-info', (req, res, next) => {
  JobApplication.findOne({applicantIDForeignKeyM:req.body.applicantData.applicantIDForeignKeyM, jobIDForeignKeyM: req.body.applicantData.jobIDForeignKeyM})
    .then(record => {
      if(record) {
        const updatedJobApplication = {
          educationM: req.body.educationGroup,
        }
        JobApplication.updateOne({applicantIDForeignKeyM:req.body.applicantData.applicantIDForeignKeyM, jobIDForeignKeyM: req.body.applicantData.jobIDForeignKeyM}, updatedJobApplication)
          .then(result => {
            JobApplication.findOne({applicantIDForeignKeyM:req.body.applicantData.applicantIDForeignKeyM, jobIDForeignKeyM: req.body.applicantData.jobIDForeignKeyM})
              .then(result => {
                res.json({updatedJobApplication: result})
              })
        })
      } else {
      }
    })
})


router.post('/save-job-application-progress-work-info', (req, res, next) => {
  console.log(req.body)
  JobApplication.updateOne({applicantIDForeignKeyM:req.body.applicantData.applicantIDForeignKeyM, jobIDForeignKeyM: req.body.applicantData.jobIDForeignKeyM}, {linkedInM: req.body.linkedInLink})
    .then(result => {
      JobApplication.findOne({applicantIDForeignKeyM:req.body.applicantData.applicantIDForeignKeyM, jobIDForeignKeyM: req.body.applicantData.jobIDForeignKeyM})
        .then(result => {
          res.json({updatedJobApplication: result})
        })
    })
})

router.post('/save-job-application-progress-questions-info', (req, res, next) => {
  console.log(req.body)
  const updatedDetails = {
    areasOfExpertiseM: req.body.details.checkedAreasOfExpertise,
    coachingExperienceM: req.body.details.checkedCoachingExperience,
    availabilityM:req.body.details.checkedAvailabilities,
    internetSpeedM: req.body.details.internetSpeed,
    referredByM: req.body.details.referredBy
  }
  JobApplication.updateOne({applicantIDForeignKeyM:req.body.applicantData.applicantIDForeignKeyM, jobIDForeignKeyM: req.body.applicantData.jobIDForeignKeyM}, updatedDetails)
    .then(result => {
      res.json({updatedJobApplication: result})
    })
})

router.get('/verify-application-if-continue-or-new/:details', (req, res, next) => {
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

router.post('/save-job-application-id-to-applicant', (req, res, next) => {
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

router.get('/get-updated-details/:id', (req, res, next) => {
  const details = JSON.parse(req.params.id)
  JobApplication.find({applicantIDForeignKeyM: details.applicantIDForeignKeyM, jobIDForeignKeyM: details.jobIDForeignKeyM})
    .then(result => res.send(result))
})


router.get('/get-updated-details-summary/:id', (req, res, next) => {
  const details = JSON.parse(req.params.id)
  JobApplication.find({applicantIDForeignKeyM: details.applicantIDForeignKeyM, jobIDForeignKeyM: details.jobIDForeignKeyM})
    .then(result => {
      Applicant.find({_id: result[0].applicantIDForeignKeyM})
        .then(applicant => {
          res.send({result, applicant})
        })
    })
})


module.exports = router;