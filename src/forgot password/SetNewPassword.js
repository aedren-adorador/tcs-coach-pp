import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { FormControl, Input, Button, Card, CardBody, Alert, AlertIcon, AlertDescription, FormHelperText, Text, Flex, Box, useToast} from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { useNavigate } from "react-router-dom";
import AuthHeader from "../auth/AuthHeader";
import AuthFooter from "../auth/AuthFooter";
import { CheckIcon, CloseIcon } from "@chakra-ui/icons";

function SetNewPassword() {
    const toast = useToast();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [revealed, setRevealed] = useState(false);
    const [isSettingNewPassword, setIsSettingNewPassword] = useState(false);
    const [isNewPasswordSet, setIsNewPasswordSet] = useState(false);
    const urlParams = new URLSearchParams(window.location.search);
    const email = urlParams.get('email');
    const navigate = useNavigate();
    
    const handleSubmit = (initialDetails) => {
        setIsSettingNewPassword(true)
        const details = {...initialDetails, email: email}
        axios.post(`${process.env.REACT_APP_SYS_URL}/api/auth/set-new-password`, details)
            .then(
                setTimeout(() => {
                    toast({
                    title: 'Password changed.',
                    description: "You may now login with your new password.",
                    status: 'success',
                    duration: 9000,
                    isClosable: true,
                    position: 'top',
                    containerStyle: {
                        fontWeight: '400px'
                    }
                    })
                    setIsNewPasswordSet(true)
                    setTimeout(() => {
                        navigate('/')
                    }, 2000)
                }, 2200)
                
            )
        }
    
    useEffect(() => {
    }, [isSettingNewPassword, isNewPasswordSet])

    useEffect(() => {
        setRevealed(true);
    }, []);

    useEffect(() => {
        
    }, [password, confirmPassword])

    return (
        <>
            <AuthHeader/>
             <div className={`auth-big-container page-reveal ${revealed ? 'reveal' : ''}`}>
                <Formik
                initialValues={{setPassword: password, confirmPassword: confirmPassword}}
                onSubmit={handleSubmit}
                >
                {(formikProps) => (
                    <Form>
                        <Card
                        minW='400px'
                        maxW='600px'
                        border='solid 0.2px black'
                        padding='20px 50px 50px 50px'
                        >
                            <CardBody>
                            {isNewPasswordSet ?
                            <Alert status='success' margin='5'>
                                <AlertIcon />
                                New password is now set!
                            </Alert>
                            :
                            <FormControl isRequired>
                            <Alert status='success' mb='5' fontSize='12px'>
                                <AlertIcon />
                                Verification Success!
                            </Alert>
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
                                isSettingNewPassword ?
                                 <Button
                                isLoading
                                loadingText='Setting new password'
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
                                >Set New Password</Button>
                            }

                            <Button
                                display={(password.length >= 12 || confirmPassword.length >=12) &&
                                        (/[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(password) || /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(confirmPassword)) &&
                                        (/[A-Z]/.test(password) || /[A-Z]/.test(confirmPassword)) &&
                                        (/[a-z]/.test(password) || /[a-z]/.test(confirmPassword)) &&
                                        (password === confirmPassword && password !== '') &&
                                        !isSettingNewPassword ? 'inline-block' : 'none'}
                                mt='10px'
                                backgroundColor='#E5ECF9'
                                border='solid 0.2px'
                                borderRadius='0px'
                                width='100%'
                                size='sm'
                                type='submit'
                                fontWeight='600'
                                >Set New Pasword</Button>
                            
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

export default SetNewPassword;