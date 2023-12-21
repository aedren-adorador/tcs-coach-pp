import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { FormControl, FormErrorMessage, FormLabel, Input, Button, Card, CardBody, Alert, AlertIcon, AlertTitle, AlertDescription, FormHelperText} from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { Link, useNavigate } from "react-router-dom";

function VerifiedEmail() {
    const url = 'http://localhost:3001'
    const [revealed, setRevealed] = useState(false);
    const [doPasswordsMatch, setDoPasswordsMatch] = useState(true);
    const [isCreatingAccount, setIsCreatingAccount] = useState(false);
    const [isAccountCreated, setIsAccountCreated] = useState(false);
    const [passwordError, setPasswordError] = useState('');
    const urlParams = new URLSearchParams(window.location.search);
    const email = urlParams.get('email')
    const navigate = useNavigate();
    const handleSubmit = (initialDetails) => {

        if (initialDetails.setPassword !== initialDetails.confirmPassword) {
            setDoPasswordsMatch(false);
         } else {
            setDoPasswordsMatch(true)
            if(initialDetails.confirmPassword.length >= 8 &&
                /[A-Z]/.test(initialDetails.confirmPassword) &&
                /[a-z]/.test(initialDetails.confirmPassword) &&
                /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(initialDetails.confirmPassword) &&
                /[0-9]/.test(initialDetails.confirmPassword)) {
                    setIsCreatingAccount(true)
                    setDoPasswordsMatch(true);
                    axios.post(`${url}/api/auth/create-account`, initialDetails)
                        .then(
                            setTimeout(() => {
                                setIsAccountCreated(true)
                                setTimeout(() => {
                                    navigate('/')
                                }, 2000)
                            }, 2200)
                        )
            } else {
                setPasswordError('Password must have 1 uppercase, 1 lowercase, 1 number, and 1 special character with a length of at least 8.')
            }
            
        }
    }

    useEffect(() => {
    }, [isCreatingAccount, isAccountCreated])

    useEffect(() => {
    }, [doPasswordsMatch])

    useEffect(() => {
    }, [passwordError])

    useEffect(() => {
        setRevealed(true);
    }, []);

    return (
        <>
             <div className={`auth-big-container page-reveal ${revealed ? 'reveal' : ''}`}>
                <Formik
                initialValues={{email: email, firstName:'', lastName:'', setPassword: '', confirmPassword: ''}}
                onSubmit={handleSubmit}
                >
                {(formikProps) => (
                    <Form>
                        <Card maxW='md'>
                            <CardBody>
                            {isAccountCreated ?
                            <Alert status='success' mb='5'>
                                <AlertIcon />
                                Account successfully created! You can now log in to TCS Coach++. Happy applying!
                            </Alert>
                            :
                            <FormControl isRequired>
                            <Alert status='success' mb='5'>
                                <AlertIcon />
                                Verification Success! Your email address ({email}) is now verified.
                            </Alert>
                            <FormHelperText mb='1'>Finish up your TCS Applicant account details below.</FormHelperText>
                            <Input
                            variant='filled'
                            placeholder='First Name'
                            mb='2'
                            {...formikProps.getFieldProps('firstName')}
                            />
                            <Input
                            variant='filled'
                            placeholder='Last Name'
                            mb='2'
                            {...formikProps.getFieldProps('lastName')}
                            />
                            <Input
                            variant='filled'
                            placeholder='Set password'
                            type='password'
                            mb='2'
                            isInvalid={!doPasswordsMatch}
                            {...formikProps.getFieldProps('setPassword')}
                            />
                            <Input
                            variant='filled'
                            placeholder='Confirm password'
                            type='password'
                            mb='2'
                            isInvalid={!doPasswordsMatch}
                            {...formikProps.getFieldProps('confirmPassword')}
                            />
                            {!doPasswordsMatch &&
                            <Alert status='error' mb='2'>
                            <AlertIcon />
                                <AlertDescription>Passwords do not match. Please try again.</AlertDescription>
                            </Alert>
                            }
                            {passwordError !== '' &&
                            <Alert status='error' mb='2'>
                            <AlertIcon />
                                <AlertDescription>{passwordError}</AlertDescription>
                            </Alert>
                            }
                            {
                                isCreatingAccount ?
                                 <Button
                                isLoading
                                loadingText='Creating Account'
                                colorScheme='blue'
                                variant='solid'
                                float='right'
                                ></Button> :
                                <Button
                                colorScheme='blue'
                                float='right'
                                type='submit'
                                >Create Account
                                </Button>
                            }
                            </FormControl>
                            }
                            </CardBody>
                        </Card>
                    </Form>
                )}
                </Formik>
             </div>
        </>
    )
}

export default VerifiedEmail;