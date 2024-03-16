const express = require('express');
const Resume = require('../../../models/resumes')
const JobApplication = require('../../../models/jobApplications');
const router = express.Router();
const fs = require('fs');
const {upload} = require('../../../configs/multer-config');

router.post('/upload-resume', upload.single('resume'), (req, res, next)  => {
  JobApplication.find({applicantIDForeignKeyM: req.body.applicantID, jobIDForeignKeyM: req.body.jobID})
    .then(result => {
      if (result[0].resumeM.length !== '') {
                console.log("YESSS")

        const filePath = `${process.env.RESUME_STATIC}/`+result[0].resumeM
        fs.unlink(filePath, (err) => {
          if (err) {
            console.error('Error deleting file:', err);
            return;
          }
        })
      }
      const toUpdate = { resumeM: req.file.filename }
      JobApplication.updateOne({applicantIDForeignKeyM: req.body.applicantID, jobIDForeignKeyM: req.body.jobID}, toUpdate)
        .then(result => {
            JobApplication.findOne({applicantIDForeignKeyM: req.body.applicantID, jobIDForeignKeyM: req.body.jobID})
            .then(updatedApplication => {
              res.send(updatedApplication); // Send the updated object in response
            })
          })
    })
})

router.get('/get-job-application-resume/:details', (req, res, next) => {
  const details = JSON.parse(req.params.details)
  JobApplication.findOne({applicantIDForeignKeyM:details.applicantID, jobIDForeignKeyM: details.jobID})
    .then(result => res.json({savedResumeLink: result.resumeM}))
})



module.exports = router;