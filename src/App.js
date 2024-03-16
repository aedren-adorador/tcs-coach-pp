import './App.css';
import Login from './auth/Login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import RegisterApplicantEmail from './create-account/create-applicant-account/RegisterApplicantEmail';
import CreateApplicantAccount from './create-account/create-applicant-account/CreateApplicantAccount';
import MainApplicantView from './applicant-views/MainApplicantView';
import AuthPrivateRoute from './auth/auth-private-route/AuthPrivateRoute';
import { useEffect, useState } from 'react';
import CreateAdminAccount from './create-account/create-admin-account/CreateAdminAccount';
import MainAdminView from './admin-views/MainAdminView';
import MyApplicationStepper from './applicant-views/my-application/applicant-steps/MyApplicationStepper';
import Video from './Video';
import InterviewIntroduction from './applicant-views/video-interview/InterviewIntroduction'
import WhatToExpect from './applicant-views/video-interview/WhatToExpect';
import CameraAndMicrophoneSettings from './applicant-views/video-interview/CameraAndMicrophoneSettings';
import Instructions from './applicant-views/video-interview/Instructions';
import Interview from './applicant-views/video-interview/Interview';
import ProceedToNextQuestion from './applicant-views/video-interview/ProceedToNextQuestion';
import SubmissionComplete from './applicant-views/video-interview/SubmissionComplete';
import Finish from './applicant-views/video-interview/Finish';
import ForgotPassword from './forgot password/ForgotPassword';
import SetNewPassword from './forgot password/SetNewPassword';
import JobPortal from './applicant-views/job-portal/JobPortal';
import PublicJobPortal from './applicant-views/job-portal/PublicJobPortal';
import PersonalInformationV2 from './applicant-views/my-application/applicant-steps/PersonallInformationV2';
import EducationV2 from './applicant-views/my-application/applicant-steps/EducationV2';
import WorkExperienceV2 from './applicant-views/my-application/applicant-steps/WorkExperienceV2';
import QuestionsV2 from './applicant-views/my-application/applicant-steps/QuestionsV2';
import SummaryV2 from './applicant-views/my-application/applicant-steps/SummaryV2';


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('isAuthenticated') === 'true';
  })
  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  }

  useEffect(() => {
  }, [isAuthenticated])

  const theme = extendTheme({
  colors: {
    tcs: {
      // main: "#0C3C55",
      main: "#02367e",
      // main: "#0461e3",
      dirtywhite: '#F2F2F2',
      linky: '#0073DC',
      mongo: '#09A334',
      bluey: '#E5ECF9',
      creamy: '#FFFDD0',
      limey: '#cdffcd',
      500: '#0C3C55'
    },
  },
})
  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess}/>}/>
          <Route path="/" element={<PublicJobPortal onLoginSuccess={handleLoginSuccess}/>}/>
          <Route path="/register-email" element={<RegisterApplicantEmail/>}/>
          <Route path="/create-applicant-account" element={<CreateApplicantAccount/>}/>
          <Route path="/create-admin-account" element={<CreateAdminAccount/>}/>
          <Route path="/forgot-password" element={<ForgotPassword/>}/>
          <Route path="/set-new-password" element={<SetNewPassword/>}/>
          <Route
          path='/applicant-home/:id'
          element={
            <AuthPrivateRoute
            isAuthenticated={isAuthenticated}
            component={MainApplicantView}
            />
          }
          />
          <Route
          path='/admin-home/:id'
          element={
            <AuthPrivateRoute
            isAuthenticated={isAuthenticated}
            component={MainAdminView}
            />
          }
          />

          <Route
          path='/application-progress/:id/:position/personal-info'
          element={
            <AuthPrivateRoute
            isAuthenticated={isAuthenticated}
            component={PersonalInformationV2}
            />
          }
          />
          <Route
          path='/application-progress/:id/:position/education-info'
          element={
            <AuthPrivateRoute
            isAuthenticated={isAuthenticated}
            component={EducationV2}
            />
          }
          />

          <Route
          path='/application-progress/:id/:position/work-info'
          element={
            <AuthPrivateRoute
            isAuthenticated={isAuthenticated}
            component={WorkExperienceV2}
            />
          }
          />

          <Route
          path='/application-progress/:id/:position/questions-info'
          element={
            <AuthPrivateRoute
            isAuthenticated={isAuthenticated}
            component={QuestionsV2}
            />
          }
          />

          <Route
          path='/application-progress/:id/:position/summary'
          element={
            <AuthPrivateRoute
            isAuthenticated={isAuthenticated}
            component={SummaryV2}
            />
          }
          />


          <Route
          path='/video-interview/introduction'
          element={
            <AuthPrivateRoute
            isAuthenticated={isAuthenticated}
            component={InterviewIntroduction}
            />
          }
          />

          <Route
          path='/video-interview/what-to-expect'
          element={
            <AuthPrivateRoute
            isAuthenticated={isAuthenticated}
            component={WhatToExpect}
            />
          }
          />

          <Route
          path='/video-interview/camera-and-microphone-settings'
          element={
            <AuthPrivateRoute
            isAuthenticated={isAuthenticated}
            component={CameraAndMicrophoneSettings}
            />
          }
          />

          <Route
          path='/video-interview/instructions'
          element={
            <AuthPrivateRoute
            isAuthenticated={isAuthenticated}
            component={Instructions}
            />
          }
          />

          <Route
          path='/video-interview/interview'
          element={
            <AuthPrivateRoute
            isAuthenticated={isAuthenticated}
            component={Interview}
            />
          }
          />

          <Route
          path='/video-interview/proceed-to-next-question'
          element={
            <AuthPrivateRoute
            isAuthenticated={isAuthenticated}
            component={ProceedToNextQuestion}
            />
          }
          />

          <Route
          path='/video-interview/submission-complete'
          element={
            <AuthPrivateRoute
            isAuthenticated={isAuthenticated}
            component={SubmissionComplete}
            />
          }
          />
          <Route
          path='/video-interview/finish'
          element={
            <AuthPrivateRoute
            isAuthenticated={isAuthenticated}
            component={Finish}
            />
          }
          />


          
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
