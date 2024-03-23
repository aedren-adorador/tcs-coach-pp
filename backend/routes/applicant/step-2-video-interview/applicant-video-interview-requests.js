const express = require('express');
const JobApplication = require('../../../models/jobApplications');
const router = express.Router();
const {uploadInterview} = require('../../../configs/multer-config');
const jwt = require('jsonwebtoken');
const { S3Client, GetObjectCommand, PutObjectCommand, ListObjectsCommand } = require("@aws-sdk/client-s3");
const {getSignedUrl} = require('@aws-sdk/s3-request-presigner')
const bucket_name = process.env.BUCKET_NAME_INTERVIEWS
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

router.post('/update-interview-to-finished', (req, res, next) => {
  JobApplication.updateOne({_id: req.body[0][0]._id}, {dateSubmittedInterviewM: new Date(), currentStepM: 'submittedVideoInterview'})
    .then(res.json({success: 'Successfully finished video interview!'}))
})

router.post('/submit-interview', uploadInterview.single('interview'), async (req, res, next) => {
  const params = {
    Bucket: 'tcs-coach-pp-video-interviews',
    Key: `${req.body.applicantID}-${req.body.jobID}-Question${req.body.questionNumber}`,
    Body: req.file.buffer,
    ContentType: 'video/webm'
  }
  console.log(params)
  const command = new PutObjectCommand(params)
  await s3.send(command)
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