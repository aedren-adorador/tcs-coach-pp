const express = require('express');
const Resume = require('../../../models/resumes')
const JobApplication = require('../../../models/jobApplications');
const router = express.Router();
const fs = require('fs');
const {upload} = require('../../../configs/multer-config');
const path = require('path');


router.post('/upload-resume', upload.single('resume'), (req, res, next)  => {
  Resume.findOne({applicantIDForeignKeyM: req.body.id, jobIDForeignKeyM: req.body.jobID})
    .then(record => {
      if (record) {
        const filePath = 'backend/files/resumes/'+record.resumeFileNameM
        fs.unlink(filePath, (err) => {
          if (err) {
            console.error('Error deleting file:', err);
            return;
          }
        });
        const toUpdate = { resumeFileNameM: req.file.filename }
        Resume.updateOne({applicantIDForeignKeyM: req.body.id, jobIDForeignKeyM: req.body.jobID}, toUpdate)
          .then(result => {
            console.log("Updated Resume for " + req.body.firstName + ' ' + req.body.lastName)
            Resume.findOne({applicantIDForeignKeyM: req.body.id, jobIDForeignKeyM: req.body.jobID})
              .then(result => {
                const resumeLink = `${process.env.REACT_APP_SYS_URL}/backend/files/resumes/${result.resumeFileNameM}`
                JobApplication.updateOne({applicantIDForeignKeyM: req.body.id, jobIDForeignKeyM: req.body.jobID}, {resumeM:resumeLink})
                  .then(()=>{
                    console.log('Updated Job Application Resume Link in Backend')
                    res.json({resumeLink:resumeLink})
                  }) 
              })
          })
      } else {
        const newResume = new Resume({
          resumeFileNameM: req.file.filename,
          applicantIDForeignKeyM: req.body.id,
          jobIDForeignKeyM: req.body.jobID
        })
        newResume.save()
          .then(result => {
            console.log('Resume saved!')
            const resumeLink = `${process.env.REACT_APP_SYS_URL}/backend/files/resumes/${result.resumeFileNameM}`
            JobApplication.updateOne({applicantIDForeignKeyM: req.body.id, jobIDForeignKeyM: req.body.jobID}, {resumeM:resumeLink})
              .then(()=>{
                console.log('Updated Job Application Resume Link in Backend')
                res.json({resumeLink:resumeLink})
              }) 
          })
      }
    })
})

router.get('/get-job-application-resume/:details', (req, res, next) => {
  const details = JSON.parse(req.params.details)
  JobApplication.findOne({applicantIDForeignKeyM:details.applicantID, jobIDForeignKeyM: details.jobID})
    .then(result => res.json({savedResumeLink: result.resumeM}))
})


module.exports = router;