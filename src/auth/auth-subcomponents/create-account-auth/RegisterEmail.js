import React from "react";
import '../../auth-styles/auth.styles.css';
import axios from "axios";
import { Input, Button, FormControl, FormErrorMessage, Alert, AlertIcon } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { ArrowBackIcon } from '@chakra-ui/icons'
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function RegisterEmail() {
    const navigate = useNavigate();
    const url = 'http://localhost:3001'
    const [revealed, setRevealed] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [isVerified, setIsVerified] = useState('');

    const handleSubmit = (e) => {
        const emailInput = e.email

        axios.post(`${url}/api/auth/send-verification-email`, {email: emailInput})
            .then(response => {
                setIsSuccess(true);
                setSuccessMessage(response.data.successMessage);
                setTimeout(() => {
                    navigate('/')
                }, 2000);
            })
    }

    useEffect(() => {
        
    },[isSuccess, successMessage])

    useEffect(() => {
        setRevealed(true);
    }, []);

    return(
        <>
        <div className={`auth-big-container page-reveal ${revealed ? 'reveal' : ''}`}>
            <div id="auth-register-email-container">
                <Formik
                initialValues={{email: ''}}
                onSubmit={handleSubmit}
                validate={values=> {
                    const errors = {};
                    if (!values.email) {
                        errors.email = 'Field cannot be empty';
                    } else if (!values.email.endsWith('@gmail.com')) {
                        errors.email = 'Email should end with @gmail.com';
                    }
                    return errors;
                }}
                >
                {(formikProps) => (
                <Form>   
                    {isSuccess && <Alert status='success' mb='2'>
                        <AlertIcon />
                        {successMessage}
                    </Alert>}
                    <FormControl isInvalid={formikProps.errors.email}>
                            <FormErrorMessage mb='2'>{formikProps.errors.email}</FormErrorMessage>
                            <Input
                            variant='filled'
                            placeholder='Enter email'
                            mb='2'
                            size='lg'
                            style={{ height: '70px'}}
                            {...formikProps.getFieldProps('email')}
                            />
                            <Button
                            float='right'
                            colorScheme='green'
                            size='lg'
                            type='submit'
                            >Verify Email</Button>
                            <Link to='/'>
                                <Button
                                float='left'
                                colorScheme='blackAlpha'
                                size='sm'
                                variant='ghost'>
                                    <ArrowBackIcon/>&nbsp;Go Back
                                </Button>
                            </Link>
                    </FormControl>
                </Form> 
                )}
                </Formik>
            </div>
        </div>
        </>
    )
}

export default RegisterEmail;