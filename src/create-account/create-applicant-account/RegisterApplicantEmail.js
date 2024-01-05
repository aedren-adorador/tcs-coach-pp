import React from "react";
import axios from "axios";
import '../create-account.styles.css'
import { Input, Button, FormControl, FormErrorMessage, Alert, AlertIcon, useToast, Box, Text } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { ArrowBackIcon } from '@chakra-ui/icons'
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthHeader from "../../auth/AuthHeader";
import AuthFooter from "../../auth/AuthFooter";

function RegisterApplicantEmail() {
    const navigate = useNavigate();
    const url = 'http://localhost:3001'
    const [revealed, setRevealed] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [emailErrorMessage, setEmailErrorMessage] = useState('');

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
            .catch(error => {
                setEmailErrorMessage(error.response.data.errorMessage);
            })
    }
    
    useEffect(() => {
    }, [emailErrorMessage])
    
    useEffect(() => {
    },[isSuccess, successMessage])

    useEffect(() => {
        setRevealed(true);
    }, []);

    return(
        <>
        <AuthHeader/>
        <Box className={`auth-big-container page-reveal ${revealed ? 'reveal' : ''}`}>
           
            <Box
            border='solid 0.2px'
            borderRadius='5px'
            padding='20px 50px 50px 50px'
            >
            <Box id="auth-register-email-container">
                 <Text
                 mb='20px'
                 textAlign='center'
                 fontWeight='1000'
                 >Verify Email</Text>
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
                    {isSuccess && 
                    <Alert
                    status='success'
                    mb='2'>
                        <AlertIcon />
                        {successMessage}
                    </Alert>
                    }
                    {emailErrorMessage!=='' &&
                    <Alert
                    status='error'
                    mb='2'>
                        <AlertIcon />
                        {emailErrorMessage}
                    </Alert>
                    }
                    <FormControl isInvalid={formikProps.errors.email}>
                            <Text
                            fontSize='12px'
                            >Enter Email</Text>
                            <FormErrorMessage
                            mb='2'
                            fontSize='12px'
                            >{formikProps.errors.email}</FormErrorMessage>
                            <Input
                            variant='outline'
                            mb='2'
                            size='md'
                            fontSize='14px'
                            border='solid 0.5px black'

                            {...formikProps.getFieldProps('email')}
                            />
                            <Button
                            mt='10px'
                            backgroundColor='#E5ECF9'
                            border='solid 0.2px'
                            borderRadius='0px'
                            width='100%'
                            size='sm'
                            type='submit'
                            fontWeight='1000'
                            
                            >Verify Email</Button>
                            <Link to='/'>
                                <Button
                                mt='20px'
                                colorScheme='blackAlpha'
                                size='xs'
                                variant='link'
                                fontSize='10px'
                                fontWeight='300'
                                >
                                    <ArrowBackIcon/>&nbsp;Go Back
                                </Button>
                            </Link>
                    </FormControl>
                </Form> 
                )}
                </Formik>
            </Box>
            </Box>
        </Box>
        <AuthFooter/>
        </>
    )
}

export default RegisterApplicantEmail;