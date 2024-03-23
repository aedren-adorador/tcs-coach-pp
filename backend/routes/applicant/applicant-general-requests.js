const express = require('express');
const JobApplication = require('../../models/jobApplications');
const Admin = require('../../models/admins');
const Applicant = require('../../models/applicants');
const router = express.Router();
const { S3Client, PutObjectCommand, GetObjectCommand, ListObjectsCommand } = require("@aws-sdk/client-s3");
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

router.get('/get-job-application/:details', async (req, res, next) => {
  const applicantDetails = await Applicant.find({_id: req.params.details})
  const jobApplicationIds = applicantDetails[0].jobApplicationsM.map(application => application.toString());

  const allApplications = []
  for (let jobApp of jobApplicationIds) {
    const application = await JobApplication.find({_id: jobApp})
    const getObjectParams = {
      Bucket: bucket_name,
      Key: application[0].resumeM
    }
    const command = new GetObjectCommand(getObjectParams)
    const url = await getSignedUrl(s3, command, {expiresIn: '300'})
    application[0].resumeM = url
    allApplications.push(application)
  }
  res.send(allApplications)

})

router.post('/get-user-info', (req, res, next) => {
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

module.exports = router;
