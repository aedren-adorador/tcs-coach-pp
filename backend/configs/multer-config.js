const express = require('express');
const app = express();
const multer = require('multer');
const fs = require('fs');
const path = require('path');

// Multer configuration for saving resumes
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, process.env.MULTER__URL_RESUME)
//   },
//   filename: function (req, file, cb) {
//     cb(null, 'TCS-Resume-'+Math.round(Math.random() * 1E9)+'-'+file.originalname)
//   }
// })

// const upload = multer({ storage: storage })

const storage = multer.memoryStorage()
const upload = multer({storage: storage})

// Multer configuration for saving video interview recordings
const interviewStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    const directoryName = `${req.body.applicantFirstName}-${req.body.applicantLastName}-${req.body.applicantID}`
    if (fs.existsSync(`${process.env.MULTER__URL_INTERVIEW}/${directoryName}`)) {
      cb(null, `${process.env.MULTER__URL_INTERVIEW}/${directoryName}`)
    } else {
      fs.mkdir(`${process.env.MULTER__URL_INTERVIEW}/${directoryName}`,
        (err) => {
            if (err) {
                return console.error(err);
            }
            cb(null, `${process.env.MULTER__URL_INTERVIEW}/${directoryName}`)
        });
      }
  }, 
  filename: function (req, file, cb) {
    const nameConvention = `Question${req.body.questionNumber}-${req.body.applicantFirstName}-${req.body.applicantLastName}-${Math.round(Math.random() * 1E9)}.webm`
    cb(null, nameConvention);
  }
});

const uploadInterview = multer({ storage: interviewStorage });


module.exports = {upload, uploadInterview}
