const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors')
require('dotenv').config();
const authsRoutes = require('./routes/auth/auths')
const adminApplicantScreeningsRoutes = require('./routes/admin/admin-applicant-screenings')
const adminJobPortalActionsRoutes = require('./routes/admin/admin-job-portal-actions')
const applicantApplicationStepperRequestsRoutes = require('./routes/applicant/step-1-initial-application/applicant-application-stepper-requests')
const applicantWorkExperienceRequestsRoutes = require('./routes/applicant/step-1-initial-application/applicant-work-experience-requests')
const applicantVideoInterviewRequestsRoutes = require('./routes/applicant/step-2-video-interview/applicant-video-interview-requests')
const applicantGeneralRequestsRoutes = require('./routes/applicant/applicant-general-requests')
const generalRequestsRoutes = require('./routes/general-requests');
const applicantTeachingDemoRequestsRoutes = require('./routes/applicant/step-3-teaching-demo/applicant-teaching-demo-requests')
const applicantOnboardingRequestsRoutes = require('./routes/applicant/step-4-onboarding-requirements/applicant-onboarding-requests')
// Mandatory Settings
// app.use(bodyParser.json({limit: '100mb'}));
// app.use(bodyParser.urlencoded({extended: false}));
// app.use(cors());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS,CONNECT,TRACE"
  );

 res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, X-Content-Type-Options, Accept, X-Requested-With, Origin, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Private-Network", true);
  //  Firefox caps this at 24 hours (86400 seconds). Chromium (starting in v76) caps at 2 hours (7200 seconds). The default value is 5 seconds.
  res.setHeader("Access-Control-Max-Age", 7200);

  next();
});
app.use(bodyParser.json({limit: '900mb'}));
app.use(bodyParser.urlencoded({limit: '900mb', extended: true}));
app.use(express.json());

// app.use(express.json({limit: '100mb'}));
// app.use(express.urlencoded({limit: '100mb'}));
app.use(`/${process.env.RESUME_STATIC}`, express.static(`${process.env.RESUME_STATIC}`));
app.use(`/${process.env.INTERVIEW_STATIC}`, express.static(`${process.env.INTERVIEW_STATIC}`));

mongoose.connect(process.env.MONGODB_CONNECT, {})
  .then(() => {console.log('Connected to TCS Coach++ Database!')})
  .catch(() => {console.log('Failed to Connect to Database')})

app.use("/yow", (req, res) => {
  res.json({successMessage: "yow CONNECTED new last pls endd5!"})
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
app.use('/api/applicant/demo-request', applicantTeachingDemoRequestsRoutes)
app.use('/api/applicant/onboarding-request', applicantOnboardingRequestsRoutes)

// CLEANED ROUTES FOR GENERAL REQUESTS (Both Admin and Applicant)
app.use('/api/general-request', generalRequestsRoutes)

module.exports = app;
