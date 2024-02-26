import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { FormControl, Input, Button, Card, CardBody, Alert, AlertIcon, AlertDescription, FormHelperText, Text, Flex, Box} from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { useNavigate } from "react-router-dom";
import AuthHeader from "../../auth/AuthHeader";
import AuthFooter from "../../auth/AuthFooter";
import { CheckIcon, CloseIcon } from "@chakra-ui/icons";

function CreateApplicantAccount() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [revealed, setRevealed] = useState(false);
    const [isCreatingAccount, setIsCreatingAccount] = useState(false);
    const [isAccountCreated, setIsAccountCreated] = useState(false);
    const urlParams = new URLSearchParams(window.location.search);
    const email = urlParams.get('email');
    const navigate = useNavigate();
    
    const handleSubmit = (initialDetails) => {
        setIsCreatingAccount(true)
        axios.post(`${process.env.REACT_APP_SYS_URL}/api/auth/create-account`, initialDetails)
            .then(
                setTimeout(() => {
                    setIsAccountCreated(true)
                    setTimeout(() => {
                        navigate('/login')
                    }, 2000)
                }, 2200)
            )
        }
    
    useEffect(() => {
    }, [isCreatingAccount, isAccountCreated])

    useEffect(() => {
        setRevealed(true);
    }, []);

    useEffect(() => {
        
    }, [password, confirmPassword, firstName, lastName])

    return (
        <>
            <AuthHeader/>
             <div className={`auth-big-container page-reveal ${revealed ? 'reveal' : ''}`}>
                <Formik
                initialValues={{email: email, firstName:firstName, lastName:lastName, setPassword: password, confirmPassword: confirmPassword}}
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
                                    onKeyUp={(e) => setFirstName(e.target.value)}
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
                                    onKeyUp={(e) => setLastName(e.target.value)}
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
                            onKeyUp={(e) => setPassword(e.target.value)}
                            border='solid 0.2px black'
                            variant='outline'
                            size='sm'
                            type='password'
                            mb='2'
                            {...formikProps.getFieldProps('setPassword')}
                            />
                            <Text
                            fontSize='12px'
                            >Confirm password</Text>
                            <Input
                            onKeyUp={(e) => setConfirmPassword(e.target.value)}
                            border='solid 0.2px black'
                            variant='outline'
                            size='sm'
                            type='password'
                            mb='2'
                            {...formikProps.getFieldProps('confirmPassword')}
                            />

                            {firstName && lastName ? 
                            <Text fontSize='10px' color='green' id='5'> <CheckIcon h='2'/>&nbsp;valid name</Text>
                            :
                            <Text fontSize='10px' color='red' id='5'> <CloseIcon h='2'/>&nbsp;Invalid name</Text>
                            }

                            {password.length >= 12 || confirmPassword.length >=12 ? 
                            <Text fontSize='10px' color='green' id='5'> <CheckIcon h='2'/>&nbsp;12 characters minimum</Text>
                            :
                            <Text fontSize='10px' color='red' id='5'> <CloseIcon h='2'/>&nbsp;12 characters minimum</Text>
                            }

                            {/[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(password) || /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(confirmPassword) ? 
                            <Text fontSize='10px' color='green' id='5'> <CheckIcon h='2'/>&nbsp;1 special character</Text>
                            :
                            <Text fontSize='10px' color='red' id='5'> <CloseIcon h='2'/>&nbsp;1 special character</Text>
                            }

                            {/[A-Z]/.test(password) || /[A-Z]/.test(confirmPassword) ? 
                            <Text fontSize='10px' color='green' id='5'> <CheckIcon h='2'/>&nbsp;1 uppercase character</Text>
                            :
                            <Text fontSize='10px' color='red' id='5'> <CloseIcon h='2'/>&nbsp;1 uppercase character</Text>
                            }

                            {/[a-z]/.test(password) || /[a-z]/.test(confirmPassword) ? 
                            <Text fontSize='10px' color='green' id='5'> <CheckIcon h='2'/>&nbsp;1 lowercase character</Text>
                            :
                            <Text fontSize='10px' color='red' id='5'> <CloseIcon h='2'/>&nbsp;1 lowercase character</Text>
                            }

                            {password === confirmPassword && password !== '' ? 
                            <Text fontSize='10px' color='green' id='5'> <CheckIcon h='2'/>&nbsp;passwords match</Text>
                            :
                            <Text fontSize='10px' color='red' id='5'> <CloseIcon h='2'/>&nbsp;passwords do not match</Text>
                            }

                            {
                                isCreatingAccount ?
                                 <Button
                                 mt='10px'
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
                                isDisabled
                                display={(password.length >= 12 || confirmPassword.length >=12) &&
                                        (/[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(password) || /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(confirmPassword)) &&
                                        (/[A-Z]/.test(password) || /[A-Z]/.test(confirmPassword)) &&
                                        (/[a-z]/.test(password) || /[a-z]/.test(confirmPassword)) &&
                                        (password === confirmPassword && password !== '') ? 'none' : 'inline-block'}
                                mt='10px'
                                backgroundColor='#E5ECF9'
                                border='solid 0.2px'
                                borderRadius='0px'
                                width='100%'
                                size='sm'
                                fontWeight='600'
                                >Create Account</Button>
                            }

                            <Button
                                display={(password.length >= 12 || confirmPassword.length >=12) &&
                                        (/[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(password) || /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(confirmPassword)) &&
                                        (/[A-Z]/.test(password) || /[A-Z]/.test(confirmPassword)) &&
                                        (/[a-z]/.test(password) || /[a-z]/.test(confirmPassword)) &&
                                        (password === confirmPassword && password !== '') &&
                                        !isCreatingAccount ? 'inline-block' : 'none'}
                                mt='10px'
                                backgroundColor='#E5ECF9'
                                border='solid 0.2px'
                                borderRadius='0px'
                                width='100%'
                                size='sm'
                                type='submit'
                                fontWeight='600'
                                >Create Account</Button>
                            
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