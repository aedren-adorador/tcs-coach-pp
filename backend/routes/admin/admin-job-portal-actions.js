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

router.get('/set-filters/:id', (req, res, next) => {
  const details = JSON.parse(req.params.id);
  const query = {};

  if (details.category && details.category !== 'All') {
    query.jobCategoryM = details.category;
  }

  if (details.workSetup && details.workSetup !== 'All') {
    if (details.workSetup === 'Online') {
      query.jobLocationM = 'Online/Remote'; // Modify value if it's 'Online'
    } else {
      query.jobLocationM = details.workSetup;
    }
  }

  if (details.postingDate && details.postingDate !== 'All') {
    const currentDate = new Date();
    let startDate;

    // Calculate start date based on postingDate filter
    if (details.postingDate === '3') {
      startDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 3, currentDate.getDate());
    } else if (details.postingDate === '6') {
      startDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 6, currentDate.getDate());
    } else if (details.postingDate === '12') {
      startDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 12, currentDate.getDate());
    } else if (details.postingDate === '1week') {
      startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - 7);
    }

    // Add condition to query jobCreatedAt within the calculated date range
    query.jobCreatedAt = { $gte: startDate };
  }

  Job.find(query)
    .then(result => {
      res.json(result);
    })
});


module.exports = router;