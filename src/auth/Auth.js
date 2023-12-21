import { React } from "react";
import { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import { FormControl, FormErrorIcon, FormErrorMessage, Input, InputGroup, InputRightElement, Button } from "@chakra-ui/react";
import './auth-styles/auth.styles.css'
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Login({onLoginSuccess}) {
    const navigate = useNavigate();
    const [revealed, setRevealed] = useState(false);
    const [show, setShow] = useState(false)
    const handleClick = () => setShow(!show)

    const handleSubmit = (loginInputs) => {
        axios.post('http://localhost:3001/api/auth/login', loginInputs)
            .then(result => {
                if (result.data.success) {
                    onLoginSuccess();
                    localStorage.setItem('token', result.data.token)
                    localStorage.setItem('applicantID', result.data.applicantID)
                    localStorage.setItem('isAuthenticated', true)
                    navigate(`/applicant-home/${result.data.applicantID}`);
                }
            })
    }

    useEffect(() => {
        // if (localStorage.getItem('isLoggedIn'))
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
                        <Button
                        colorScheme='blue'
                        float='right'
                        size='md'
                        type='submit'>Log-in</Button>
                    </div>
                </div>
            </Form>
         )}
        </Formik>
        </>
    )
}

export default Login;
