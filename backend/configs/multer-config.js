const express = require('express');
const app = express();
const multer = require('multer');
const fs = require('fs');
const path = require('path');

// Multer configuration for saving resumes
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './backend/files/resumes')
  },
  filename: function (req, file, cb) {
    cb(null, 'TCS-Resume-'+Math.round(Math.random() * 1E9)+'-'+file.originalname)
  }
})

const upload = multer({ storage: storage })

// Multer configuration for saving video interview recordings
const interviewStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    const directoryName = `${req.body.applicantFirstName}-${req.body.applicantLastName}-${req.body.applicantID}`
    if (fs.existsSync(`./backend/files/interview-recordings/${directoryName}`)) {
      cb(null, `./backend/files/interview-recordings/${directoryName}`)
    } else {
      fs.mkdir(`./backend/files/interview-recordings/${directoryName}`,
        (err) => {
            if (err) {
                return console.error(err);
            }
            cb(null, `./backend/files/interview-recordings/${directoryName}`)
        });
      }
  },
  
  filename: function (req, file, cb) {
    const nameConvention = `Question${req.body.questionNumber}-${req.body.applicantFirstName}-${req.body.applicantLastName}-${Math.round(Math.random() * 1E9)}.webm`

    console.log(nameConvention)
    cb(null, nameConvention);
  }
});

const uploadInterview = multer({ storage: interviewStorage });


module.exports = {upload, uploadInterview}
