import './App.css';
import Login from './auth/Auth';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react'
import RegisterEmail from './auth/auth-subcomponents/create-account-auth/RegisterEmail';
import VerifiedEmail from './auth/auth-subcomponents/create-account-auth/VerifiedEmail';
import MainApplicantView from './main-view-applicant/MainApplicantView';
import AuthPrivateRoute from './auth/auth-subcomponents/auth-private-route/AuthPrivateRoute';
import Testing from './Testing';
import { useEffect, useState } from 'react';
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
          <Route path="/" element={<Login onLoginSuccess={handleLoginSuccess}/>}/>
          <Route path="/register-email" element={<RegisterEmail/>}/>
          <Route path="/create-password" element={<VerifiedEmail/>}/>
          <Route path="/testing" element={<Testing/>}/>
          
          <Route
          path='/applicant-home/:id'
          element={
            <AuthPrivateRoute
            isAuthenticated={isAuthenticated}
            component={MainApplicantView}
            />
          }
          />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>

  );
}

export default App;
