
const express = require('express');
const Resume = require('../../../models/resumes')
const JobApplication = require('../../../models/jobApplications');
const router = express.Router();
// const fs = require('fs');
const {upload} = require('../../../configs/multer-config');
const { S3Client, PutObjectCommand, GetObjectCommand } = require("@aws-sdk/client-s3");
const {getSignedUrl} = require('@aws-sdk/s3-request-presigner')
require('dotenv').config();
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

router.post('/upload-resume', upload.single('resume'), async (req, res, next)  => {
  const params = {
    Bucket: bucket_name,
    Key: `${req.body.applicantID}-${req.body.jobID}`,
    Body: req.file.buffer,
    ContentType: req.file.mimetype
  }
  const command = new PutObjectCommand(params)
  await s3.send(command)
  
  await JobApplication.updateOne({ applicantIDForeignKeyM: req.body.applicantID, jobIDForeignKeyM: req.body.jobID }, { resumeM: `${req.body.applicantID}-${req.body.jobID}`})
  
  const updatedApplication = await JobApplication.findOne({applicantIDForeignKeyM: req.body.applicantID, jobIDForeignKeyM: req.body.jobID})
  const getObjectParams = {
    Bucket: bucket_name,
    Key: updatedApplication.resumeM
  }

  const command2 = new GetObjectCommand(getObjectParams)
  const url = await getSignedUrl(s3, command2, {expiresIn: '86400'})
  res.send({updatedApplication, url})
  }) 


router.get('/get-job-application-resume/:details', (req, res, next) => {
  const details = JSON.parse(req.params.details)
  JobApplication.findOne({applicantIDForeignKeyM:details.applicantID, jobIDForeignKeyM: details.jobID})
    .then(result => res.json({savedResumeLink: result.resumeM}))
})



module.exports = router;