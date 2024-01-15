import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { FormControl, Input, Button, Card, CardBody, Alert, AlertIcon, AlertDescription, FormHelperText, Text, Flex, Box} from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { useNavigate } from "react-router-dom";
import AuthHeader from "../../auth/AuthHeader";
import AuthFooter from "../../auth/AuthFooter";

function CreateApplicantAccount() {
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
                    axios.post(`${process.env.REACT_APP_SYS_URL}/api/auth/create-account`, initialDetails)
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
            <AuthHeader/>
             <div className={`auth-big-container page-reveal ${revealed ? 'reveal' : ''}`}>
                <Formik
                initialValues={{email: email, firstName:'', lastName:'', setPassword: '', confirmPassword: ''}}
                onSubmit={handleSubmit}
                >
                {(formikProps) => (
                    <Form>
                        <Card
                        maxW='500px'
                        border='solid 0.2px black'
                        padding='20px 50px 50px 50px'
                        >
                            <CardBody>
                            {isAccountCreated ?
                            <Alert status='success' mb='5'>
                                <AlertIcon />
                                Account successfully created! You can now log in to TCS Coach++. Happy applying!
                            </Alert>
                            :
                            <FormControl isRequired>
                            <Alert status='success' mb='5' fontSize='12px'>
                                <AlertIcon />
                                Verification Success! Your email address ({email}) is now verified.
                            </Alert>
                            <Text
                            textAlign='center'
                            fontSize='14px'
                            fontWeight='600'
                            mb='20px'
                            >Create Account</Text>
                            <Flex
                            justify='space-evenly'
                            gap={3}
                            >
                                <Box
                                width='100%'
                                >
                                    <Text
                                    fontSize='12px'
                                    >First Name</Text>
                                    <Input
                                    size='sm'
                                    variant='outline'
                                    border='solid 0.2px black'
                                    mb='2'
                                    {...formikProps.getFieldProps('firstName')}
                                    />
                                </Box>
                                <Box
                                width='100%'
                                >
                                    <Text
                                    fontSize='12px'
                                    >Last Name</Text>
                                    <Input
                                    size='sm'
                                    variant='outline'
                                    border='solid 0.2px black'
                                    mb='2'
                                    {...formikProps.getFieldProps('lastName')}
                                    />

                                </Box>
                                
                            </Flex>
                            
                            <Text
                            fontSize='12px'
                            >Password</Text>
                            <Input
                            border='solid 0.2px black'
                            variant='outline'
                            size='sm'
                            type='password'
                            mb='2'
                            isInvalid={!doPasswordsMatch}
                            {...formikProps.getFieldProps('setPassword')}
                            />
                            <Text
                            fontSize='12px'
                            >Confirm password</Text>
                            <Input
                            border='solid 0.2px black'
                            variant='outline'
                            size='sm'
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
                                border='solid 0.2px'
                                variant='solid'
                                borderRadius='0px'
                                width='100%'
                                size='sm'
                                type='submit'
                                fontWeight='600'
                                ></Button> :
                                <Button
                                mt='10px'
                                backgroundColor='#E5ECF9'
                                border='solid 0.2px'
                                borderRadius='0px'
                                width='100%'
                                size='sm'
                                type='submit'
                                fontWeight='600'
                                >Create Account</Button>
                            }
                            </FormControl>
                            }
                            </CardBody>
                        </Card>
                    </Form>
                )}
                </Formik>
             </div>
            <AuthFooter/>
        </>
    )
}

export default CreateApplicantAccount;