const express = require('express');
const JobApplication = require('../../../models/jobApplications');
const {uploadDemoZip} = require('../../../configs/multer-config')
const router = express.Router();
const { S3Client, PutObjectCommand, GetObjectCommand } = require("@aws-sdk/client-s3");
const {getSignedUrl} = require('@aws-sdk/s3-request-presigner')
const bucket_name = process.env.BUCKET_NAME_DEMOS
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


router.post('/submit-demo-link', uploadDemoZip.single('demoZip'), async (req, res, next) => {
        console.log(req.file)
        console.log(req.body)

    const params = {
        Bucket: bucket_name,
        Key: `${req.body.applicantID}-${req.body.jobID}-DemoZip`,
        Body: req.file.buffer,
        ContentType: req.file.mimetype
    }
    const command = new PutObjectCommand(params)
    await s3.send(command)
    
    const result = await JobApplication.updateOne({applicantIDForeignKeyM: req.body.applicantID, jobIDForeignKeyM: req.body.jobID}, {teachingDemoM: `${req.body.applicantID}-${req.body.jobID}-DemoZip`, dateSubmittedTeachingDemoM: new Date(), currentStepM: 'submittedTeachingDemo'})
    
    res.send(result)
})

module.exports = router;