const express = require('express');
const app = express();
const multer = require('multer');

// Multer configuration for saving resume files

const storage = multer.memoryStorage()
const upload = multer({storage: storage})

const interviewStorage = multer.memoryStorage()
const uploadInterview = multer({storage:interviewStorage})


const demoZipStorage = multer.memoryStorage()
const uploadDemoZip = multer({storage: demoZipStorage})

const onboardingZipStorage = multer.memoryStorage()
const uploadOnboardingZip = multer({storage: onboardingZipStorage})

module.exports = {upload, uploadInterview, uploadDemoZip, uploadOnboardingZip}
