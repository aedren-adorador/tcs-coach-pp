import { React } from "react";
import { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import { Input, InputGroup, InputRightElement, Button, FormErrorMessage, FormControl } from "@chakra-ui/react";
import './auth-styles/auth.styles.css'
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function Login({onLoginSuccess}) {
    const navigate = useNavigate();
    const [revealed, setRevealed] = useState(false);
    const [show, setShow] = useState(false);
    const [isInvalidCredentials, setIsInvalidCredentials] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const handleClick = () => setShow(!show);

    const handleSubmit = (loginInputs) => {
        setIsLoading(true);
        axios.post('http://localhost:3001/api/auth/login', loginInputs)
            .then(response => {
                if (response.data.success) {
                    setIsLoading(false)
                    onLoginSuccess();
                    const decodedUserToken = jwtDecode(response.data.token)
                    const loggedInUserID = decodedUserToken.userID
                    localStorage.setItem('token', response.data.token)
                    localStorage.setItem('isAuthenticated', true)
                    const isAdmin =  decodedUserToken.admin                   
                    if (isAdmin === true) {
                        navigate(`/admin-home/${loggedInUserID}`)
                    } else if (isAdmin === 'false'){
                        navigate(`/applicant-home/${loggedInUserID}`)
                    }
                } else {
                    setIsLoading(false)
                    setIsInvalidCredentials(true);
                }
            })
    }
    useEffect(() => {
    }, [isLoading])
    useEffect(() => {
    }, [isInvalidCredentials])
    useEffect(() => {
        localStorage.removeItem('token')
        setRevealed(true);
    }, []);
    return (   
        <>
        <Formik
        initialValues={{emailLogin:'', passwordLogin: ''}}
        onSubmit={handleSubmit}
        >
        {(formikProps) => (
            <Form>
                <div className={`auth-big-container page-reveal ${revealed ? 'reveal' : ''}`}>
                    <div id='auth-email-and-password-container'>
                        
                        <FormControl isInvalid={isInvalidCredentials}>
                        {isInvalidCredentials && 
                        <FormErrorMessage mb='1'>Invalid email and/or password. Please try again.</FormErrorMessage>}
                        <Input
                        variant='filled'
                        placeholder='Enter email'
                        mb='2'
                        size='lg'
                        {...formikProps.getFieldProps('emailLogin')}
                        />
                        <InputGroup size='lg' mb='2'>
                            <Input
                                pr='4.5rem'
                                type={show ? 'text' : 'password'}
                                placeholder='Enter password'
                                variant='filled'
                                {...formikProps.getFieldProps('passwordLogin')}
                            />
                            <InputRightElement width='4.5rem'>
                                <Button
                                h='1.75rem'
                                size='sm'
                                onClick={handleClick}>
                                {show ? 'Hide' : 'Show'}
                                </Button>
                            </InputRightElement>
                        </InputGroup>
                        <Link to='/register-email'>
                            <Button variant='link' float='left' id='create-account-button' size='xs'>Create Account</Button>
                        </Link>
                        {!isLoading ?
                         <Button
                        colorScheme='blue'
                        float='right'
                        size='md'
                        type='submit'>Log-in</Button>:
                        <Button
                            isLoading
                            loadingText='Logging in'
                            colorScheme='blue'
                            variant='solid'
                            spinnerPlacement='start'
                            float='right'
                        ></Button>}
                        </FormControl>
                    </div>
                </div>
            </Form>
         )}
        </Formik>
        </>
    )
}

export default Login;