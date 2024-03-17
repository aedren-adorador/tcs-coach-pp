const express = require('express');
const JobApplication = require('../../models/jobApplications');
const router = express.Router();
const {generateInterviewToken, sendInterviewInvite} = require('../../configs/email-config');
const Applicant = require('../../models/applicants');
const fs = require('fs');
const Criteria = require('../../models/criteria');


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
res.json({joinedApplicantAndJobApplicationDetails: result})
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
      sendInterviewInvite(details.emailAddress, details.position, stringifiedDeadline, details.firstName)
        .then(result => {
          JobApplication.updateOne({_id: req.body.jobApplicationID}, {deadlineDateInterviewM: new Date(details.oneWeekDeadline)})
            .then(
              res.json({success: 'Interview Invite Sent via Email!', joinedApplicantAndJobApplicationDetails: filteredUpdateLevel2})
            )  
        })
    )
})

router.get('/get-applicants', (req, res, next) => {
  Applicant.find()
    .then(applicants => {
      res.json({applicants: applicants})
    })
})

router.get('/get-interview-responses/:details', (req, res, next) => {
  const details = JSON.parse(req.params.details)
  fs.readdir(`${process.env.INTERVIEW_STATIC}/${details.applicantFirstName}-${details.applicantLastName}-${details.applicantID}`, (err, files) => {
    res.send(files);
  })
})

router.get('/get-applicant-criteria-scores/:id', async (req, res, next) => {
  const details = JSON.parse(req.params.id, 'ha')
  const jobApplication = await JobApplication.find({_id: details.applicantID})
  if (!Object.keys(jobApplication[0].interviewCriteriaScoresM)) {
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

module.exports = router;