import './App.css';
import Login from './auth/Login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react'
import RegisterApplicantEmail from './create-account/create-applicant-account/RegisterApplicantEmail';
import CreateApplicantAccount from './create-account/create-applicant-account/CreateApplicantAccount';
import MainApplicantView from './applicant-views/MainApplicantView';
import AuthPrivateRoute from './auth/auth-private-route/AuthPrivateRoute';
import Testing from './Testing';
import { useEffect, useState } from 'react';
import CreateAdminAccount from './create-account/create-admin-account/CreateAdminAccount';
import MainAdminView from './admin-views/MainAdminView';
import MyApplicationsSteps from './applicant-views/my-applications/MyApplicationsSteps'
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('isAuthenticated') === 'true';
  })
  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  }

  useEffect(() => {
    console.log('localstorage:', localStorage.getItem('isAuthenticated'))
    console.log(isAuthenticated)
  }, [isAuthenticated])
  
  return (
    <ChakraProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/testing" element={<Testing/>}/>
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
          path='/application-progress'
          element={<MyApplicationsSteps/>}
          />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>

  );
}

export default App;
