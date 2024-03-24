const express = require('express');
const JobApplication = require('../../models/jobApplications');
const router = express.Router();
const {generateInterviewToken, sendInterviewInvite, sendDemoInvite, sendOnboardingRequirementsChecklist, sendRejectionEmail} = require('../../configs/email-config');
const Applicant = require('../../models/applicants');
const fs = require('fs');
const Criteria = require('../../models/criteria');
const { S3Client, PutObjectCommand, GetObjectCommand } = require("@aws-sdk/client-s3");
const {getSignedUrl} = require('@aws-sdk/s3-request-presigner')
const bucket_name = process.env.BUCKET_NAME
const bucket_region = process.env.BUCKET_REGION
const access_key = process.env.AWS_ACCESS_KEY_ID
const secret_access_key = process.env.AWS_SECRET_ACCESS_KEY

const s3 = new S3Client({
  credentials: {
    accessKeyId: access_key, 
    secretAccessKey: secret_access_key
  }, 
    region: bucket_region
})

const s3_onboarding = new S3Client({
  credentials: {
    accessKeyId: access_key, 
    secretAccessKey: secret_access_key
  }, 
    region: 'ap-southeast-2'
})


router.get('/get-job-applications-joined-with-applicants', async (req, res, next) => {
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
      as: 'applicantJoinedDetails'  // merged data array
    }
  },
]).exec();

const updated = []
for (let jobApp of result) {
  if (jobApp.resumeM !== '') {
    const getObjectParams = {
    Bucket: bucket_name,
    Key: jobApp.resumeM
    }
    const command = new GetObjectCommand(getObjectParams)
    const url = await getSignedUrl(s3, command, {expiresIn: '7200'})
    jobApp.resumeM = url

    if (jobApp.teachingDemoM !== '') {
      const getObjectParams2 = {
      Bucket: 'tcs-coach-pp-demo-zips',
      Key: jobApp.teachingDemoM
      }
      const command2 = new GetObjectCommand(getObjectParams2)
      const url2 = await getSignedUrl(s3, command2, {expiresIn: '7200'})
      jobApp.teachingDemoM = url2
    }

    if (jobApp.onboardingRequirementsM !== '') {
      const getObjectParams3 = {
      Bucket: 'tcs-coach-pp-onboarding-reqs',
      Key: jobApp.onboardingRequirementsM
      }
      const command3 = new GetObjectCommand(getObjectParams3)
      const url3 = await getSignedUrl(s3_onboarding, command3, {expiresIn: '7200'})
      jobApp.onboardingRequirementsM = url3
    }
    updated.push(jobApp)
  }
}
res.json({joinedApplicantAndJobApplicationDetails: updated})
});

router.post('/send-interview-invite', async (req, res, next) => {
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

  JobApplication.updateOne({_id: req.body.jobApplicationID}, {currentStepM: 'waitingForInterviewSubmission', interviewTokenM: token, interviewQuestionsM: details.jobQuestions})
    .then(
      Applicant.find({_id: req.body.applicantID})
        .then(applicant => {
          if (applicant[0].isNotifsOnM) {
            sendInterviewInvite(details.emailAddress, details.position, stringifiedDeadline, details.firstName)
              .then(result => {
                JobApplication.updateOne({_id: req.body.jobApplicationID}, {deadlineDateInterviewM: new Date(details.oneWeekDeadline)})
                  .then(
                    res.json({success: 'Interview Invite Sent via Email!', joinedApplicantAndJobApplicationDetails: filteredUpdateLevel2})
                  )  
              })
          } else {
            JobApplication.updateOne({_id: req.body.jobApplicationID}, {deadlineDateInterviewM: new Date(details.oneWeekDeadline)})
                  .then(
                    res.json({success: 'Interview Invite Sent via Email!', joinedApplicantAndJobApplicationDetails: filteredUpdateLevel2})
                  )
          }
        })
      
    )
})

router.get('/get-applicants', (req, res, next) => {
  Applicant.find()
    .then(applicants => {
      res.json({applicants: applicants})
    })
})

router.get('/get-interview-responses/:details', async (req, res, next) => {
    // Key: `${req.body.applicantID}-${req.body.jobID}-Question${req.body.questionNumber}`,
  const details = JSON.parse(req.params.details)

  const obtainedVideoInterviews = []
  for (let i = 1; i < parseInt(details.questions.length)+1; i++) {
    const getObjectParams = {
    Bucket: process.env.BUCKET_NAME_INTERVIEWS,
    Key: `${details.applicantID}-${details.jobID}-Question${i}`
    }
    const command = new GetObjectCommand(getObjectParams)
    const url = await getSignedUrl(s3, command, {expiresIn: '7200'})
    await obtainedVideoInterviews.push(url)
  }
  res.send(obtainedVideoInterviews)
})

router.get('/get-applicant-criteria-scores/:id', async (req, res, next) => {
  const details = JSON.parse(req.params.id, 'ha')
  const jobApplication = await JobApplication.find({_id: details.applicantID})
  if (Object.keys(jobApplication[0].interviewCriteriaScoresM).length === 0) {
    const freshCriteria = {}
    const criteria = await Criteria.find()

    for (let criterion of criteria) {
      freshCriteria[criterion.criterionM] = [0, '']
    }
    res.send(freshCriteria)

  } else {
    res.send(jobApplication[0].interviewCriteriaScoresM)
  }
  
})


router.post('/save-interview-feedback', (req, res, next) => {
  const interviewCriteriaScoresSave = {interviewCriteriaScoresM: req.body.interviewCriteriaScores}
  JobApplication.updateOne({_id: req.body.chosenApplicantAllJobApplicationDetails.chosenApplicantAllJobApplicationDetails._id}, interviewCriteriaScoresSave)
    .then(result => {
      JobApplication.find({_id: req.body.chosenApplicantAllJobApplicationDetails.chosenApplicantAllJobApplicationDetails._id})
        .then(updatedJobApplication => res.send(updatedJobApplication[0].interviewCriteriaScoresM)) 
    })
})

router.post('/send-demo-invite', (req, res, next) => {
  if (req.body.applicantJoinedDetails[0].isNotifsOnM) {
    sendDemoInvite(req.body.applicantJoinedDetails[0].emailM, req.body.positionAppliedToM, req.body.applicantJoinedDetails[0].firstNameM)
    .then(() => {
      JobApplication.updateOne({_id: req.body._id}, {currentStepM: 'waitingForTeachingDemoSubmission'})
        .then(result => {
          JobApplication.find({_id: req.body._id})
            .then(result => {
              res.send(result)
            })
        })
    })
  } else {
    JobApplication.updateOne({_id: req.body._id}, {currentStepM: 'waitingForTeachingDemoSubmission'})
        .then(result => {
          JobApplication.find({_id: req.body._id})
            .then(result => {
              res.send(result)
            })
        })
  }
  
})

router.post('/send-onboarding-invite', (req, res, next) => {
  Applicant.find({_id: req.body.applicantIDForeignKeyM})
    .then(applicant => {
      if (applicant[0].isNotifsOnM) {
        sendOnboardingRequirementsChecklist(applicant[0].emailM, req.body.positionAppliedToM, applicant[0].firstNameM)
        .then(() => {
          JobApplication.updateOne({_id: req.body._id}, {currentStepM: 'waitingForOnboardingRequirementsSubmission'})
            .then(result => res.send(result))
        })
      } else {
         JobApplication.updateOne({_id: req.body._id}, {currentStepM: 'waitingForOnboardingRequirementsSubmission'})
            .then(result => res.send(result))
      }
    })
})

router.post('/finish-hiring', (req, res, next) => {
  JobApplication.updateOne({_id: req.body._id}, {currentStepM: 'finishedHiringApplicant'})
    .then(result => res.send(result))
})

router.post('/send-rejection-email', (req, res, next) => {
  // sendRejectionEmail(emailAddressInput, applicantName)
  Applicant.find({_id: req.body.applicantIDForeignKeyM})
    .then(applicant => {
      sendRejectionEmail(applicant[0].emailM, applicant[0].firstNameM)
        .then(() => {
          JobApplication.updateOne({_id: req.body._id}, {currentStepM: 'rejectedApplicant'})
            .then(result => res.send(result))
        })
    })
})

module.exports = router;