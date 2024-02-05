const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
require('dotenv').config();
const authsRoutes = require('./routes/auth/auths')
const adminApplicantScreeningsRoutes = require('./routes/admin/admin-applicant-screenings')
const adminJobPortalActionsRoutes = require('./routes/admin/admin-job-portal-actions')
const applicantApplicationStepperRequestsRoutes = require('./routes/applicant/step-1-initial-application/applicant-application-stepper-requests')
const applicantWorkExperienceRequestsRoutes = require('./routes/applicant/step-1-initial-application/applicant-work-experience-requests')
const applicantVideoInterviewRequestsRoutes = require('./routes/applicant/step-2-video-interview/applicant-video-interview-requests')
const applicantGeneralRequestsRoutes = require('./routes/applicant/applicant-general-requests')
const generalRequestsRoutes = require('./routes/general-requests');
const Admin = require('./models/admins');


// Mandatory Settings
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/backend/files/resumes', express.static('backend/files/resumes'));
app.use('/backend/files/interview-recordings', express.static('backend/files/interview-recordings'));


app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS, PUT"
  );
  next();
});

mongoose.connect(process.env.MONGODB_CONNECT, {})
  .then(() => {console.log('Connected to TCS Coach++ Database!')})
  .catch(() => {console.log('Failed to Connect to Database')})

app.use("", (req, res) => {
  console.log("CONNECTED GAGO")
})
// CLEANED ROUTES FOR AUTH
app.use('/api/auth', authsRoutes);

// CLEANED ROUTES FOR ADMIN
app.use('/api/admin/applicant-screening', adminApplicantScreeningsRoutes);
app.use('/api/admin/job-portal-action', adminJobPortalActionsRoutes);

// CLEANED FOR APPLICANT
app.use('/api/applicant/application-stepper-request', applicantApplicationStepperRequestsRoutes)
app.use('/api/applicant/work-experience-request', applicantWorkExperienceRequestsRoutes)
app.use('/api/applicant/video-interview-request', applicantVideoInterviewRequestsRoutes)
app.use('/api/applicant/general-request', applicantGeneralRequestsRoutes)

// CLEANED ROUTES FOR GENERAL REQUESTS (Both Admin and Applicant)
app.use('/api/general-request', generalRequestsRoutes)


module.exports = app;