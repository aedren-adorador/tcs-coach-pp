const express = require('express');
const Job = require('../../models/jobs');
const router = express.Router();


router.post('/create-job', (req, res, next) => {
   const newJob = new Job({
    jobTitleM: req.body.jobTitle,
    jobLocationM: req.body.jobLocation,
    jobDescriptionM: req.body.jobDescription,
    jobResponsibilitiesM: req.body.jobResponsibilities,
    jobQualificationsM: req.body.jobQualifications,
    jobSegmentationM: req.body.jobSegmentation,
    jobCategoryM: req.body.jobCategory
  })
  newJob.save()
    .then(res.json({result: newJob}))
})


router.get('/get-job-to-update/:id', (req, res, next) => {
  Job.findOne({_id:req.params.id})
    .then(result => res.json({jobToUpdate: result}))
})

router.delete('/delete-job/:id', (req, res, next) => {
  Job.deleteOne({_id: req.params.id})
    .then(
      Job.find()
        .then(updatedJobs => [
          res.json({updatedJobs: updatedJobs})
        ])
    )
})

router.put('/update-job', (req, res, next) => {
  const updatedJob = {
    jobTitleM: req.body.jobTitle,
    jobLocationM: req.body.jobLocation,
    jobDescriptionM: req.body.jobDescription,
    jobResponsibilitiesM: req.body.jobResponsibilities,
    jobQualificationsM: req.body.jobQualifications,
    jobSegmentationM: req.body.jobSegmentation,
    jobCategoryM: req.body.jobCategory
  }
  Job.updateOne({_id: req.body.jobId}, updatedJob)
    .then(result => res.json({success: 'updated!'}))
})

router.get('/category-filter/:id', (req, res, next) => {
  if (req.params.id !== 'All') {
    Job.find({jobCategoryM: req.params.id})
    .then(result => res.send(result))
  } else {
    Job.find()
      .then(result => res.send(result))
  }
})

router.get('/work-setup-filter/:id', (req, res, next) => {
  if (req.params.id === 'Online'){
    Job.find({jobLocationM: 'Online/Remote'})
      .then(result => res.send(result))
  } else if (req.params.id === 'All'){
    Job.find()
      .then(result => res.send(result))
  } else {
     Job.find({jobLocationM: req.params.id})
      .then(result => res.send(result))
  }
})
module.exports = router;