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
          .then(() => (
            JobApplication.findOne({applicantIDForeignKeyM:req.body.applicantIDForeignKey, jobIDForeignKeyM: req.body.jobIDForeignKey})
              .then(result => res.json({updatedJobApplication: result}))
          ))
      } else {
      }
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


module.exports = router;