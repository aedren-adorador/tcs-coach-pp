import React from "react";
import axios from "axios";
import '../create-account/create-account.styles.css'
import { Input, Button, FormControl, useToast, Box, Text } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { ArrowBackIcon } from '@chakra-ui/icons'
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthHeader from "../auth/AuthHeader";
import AuthFooter from "../auth/AuthFooter";

function ForgotPassword() {
    const toast = useToast()
    const [revealed, setRevealed] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [emailErrorMessage, setEmailErrorMessage] = useState('');
    const [isSendingEmail, setIsSendingEmail] = useState(false);
    const handleSubmit = (e) => {
        setIsSendingEmail(true)
        const details = {applicantEmail: e.email}
        axios.post(`${process.env.REACT_APP_SYS_URL}/api/auth/send-forgot-password-email`, details)
            .then(response => {
                setIsSendingEmail(false)
                toast({
                    title: 'Reset link sent to your email.',
                    description: "Kindly check your email to set a new password.",
                    status: 'success',
                    duration: 9000,
                    isClosable: true,
                    position: 'top',
                    containerStyle: {
                        fontWeight: '400px'
                    }
                    })
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
                 fontWeight='600'
                 >Forgot Password</Text>
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
                    <FormControl isInvalid={formikProps.errors.email}>
                            
                            <Text
                            fontSize='12px'
                            >Enter your email to get a password reset link.</Text>
                            <Text fontSize='10px' color='red'>{formikProps.errors.email}</Text>
                            <Input
                            variant='outline'
                            mb='2'
                            size='md'
                            fontSize='14px'
                            border='solid 0.5px black'

                            {...formikProps.getFieldProps('email')}
                            />
                            
                            {isSendingEmail ?
                            <Button
                            mt='10px'
                            colorScheme='red'
                            border='solid 0.2px'
                            borderRadius='0px'
                            width='100%'
                            size='sm'
                            isLoading
                            loadingText='Sending password reset link'
                            variant='outline'
                            >
                            </Button>
                            :
                             <Button
                            display={isSuccess ? 'none' : 'inline-block'}
                            mt='10px'
                            border='solid 0.2px'
                            borderRadius='0px'
                            width='100%'
                            size='sm'
                            fontWeight='600'
                            colorScheme="red"
                            type='submit'
                            >Send password reset link</Button>
                            }
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

export default ForgotPassword;