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
import JobPortal from './applicant-views/job-portal/JobPortal';

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
      main: "#0C3C55",
      dirtywhite: '#F2F2F2',
      linky: '#0073DC',
      mongo: '#09A334',
    },
  },
})
  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login onLoginSuccess={handleLoginSuccess}/>}/>
          <Route path="/register-email" element={<RegisterApplicantEmail/>}/>
          <Route path="/create-applicant-account" element={<CreateApplicantAccount/>}/>
          <Route path="/create-admin-account" element={<CreateAdminAccount/>}/>
          
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
          path='/application-progress/:id/:position'
          element={
            <AuthPrivateRoute
            isAuthenticated={isAuthenticated}
            component={MyApplicationStepper}
            />
          }
          />

          
        </Routes>
      </BrowserRouter>
    </ChakraProvider>

  );
}

export default App;
