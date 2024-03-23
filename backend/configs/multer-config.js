const express = require('express');
const app = express();
const multer = require('multer');

// Multer configuration for saving resume files

const storage = multer.memoryStorage()
const upload = multer({storage: storage})

const interviewStorage = multer.memoryStorage()
const uploadInterview = multer({storage:interviewStorage})

module.exports = {upload, uploadInterview}
