const express = require('express');
const JobApplication = require('../../../models/jobApplications');
const router = express.Router();
const {uploadInterview} = require('../../../configs/multer-config');
const jwt = require('jsonwebtoken');

router.post('/update-interview-to-finished', (req, res, next) => {
  JobApplication.updateOne({_id: req.body._id}, {dateSubmittedInterviewM: new Date(), currentStepM: 'submittedVideoInterview'})
    .then(res.json({success: 'Successfully finished video interview!'}))
})

router.post('/submit-interview', uploadInterview.single('interview'), (req, res, next) => {
  console.log(req.file)
  res.json({success: 'Video response uploaded successfully!'})
})

router.post('/verify-interview-token', (req, res, next) => {
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

module.exports = router;