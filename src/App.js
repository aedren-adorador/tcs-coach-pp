import './App.css';
import Login from './auth/Auth';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react'
import RegisterEmail from './auth/auth-subcomponents/create-account-auth/RegisterEmail';
import VerifiedEmail from './auth/auth-subcomponents/create-account-auth/VerifiedEmail';

function App() {
  return (
    <ChakraProvider>
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<Login/>}/>
            <Route path="/register-email" element={<RegisterEmail/>}/>
            <Route path="/create-password" element={<VerifiedEmail/>}/>
        </Routes>
      </BrowserRouter>
    </ChakraProvider>

  );
}

export default App;
