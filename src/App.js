import './App.css';
import Login from './auth/Auth';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react'
import RegisterEmail from './auth/auth-subcomponents/create-account-auth/RegisterEmail';
import VerifiedEmail from './auth/auth-subcomponents/create-account-auth/VerifiedEmail';
import MainApplicantView from './main-view-applicant/MainApplicantView';
import AuthPrivateRoute from './auth/auth-subcomponents/auth-private-route/AuthPrivateRoute';

function App() {
  const isAuthenticated = false;
  return (
    <ChakraProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/register-email" element={<RegisterEmail/>}/>
          <Route path="/create-password" element={<VerifiedEmail/>}/>
        </Routes>
        <AuthPrivateRoute
        path='/applicant-home'
        isAuthenticated={isAuthenticated}
        component={MainApplicantView}
        />
      </BrowserRouter>
    </ChakraProvider>

  );
}

export default App;
