import { React } from "react";
import { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import { Input, InputGroup, InputRightElement, Button, FormErrorMessage, FormControl, Text, Flex, Image, Box, Card } from "@chakra-ui/react";
import './auth-styles/auth.styles.css'
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import tcsLogo from '../nav/tcs-logo.png'
import { LinkedinFilled, FacebookFilled } from "@ant-design/icons";

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
        <Flex
        position='fixed'
        width='100%'
        height='80px'
        backgroundColor='#0C3C55'
        >
            <Image
            src={tcsLogo}
            ml='2%'
            height='100%'
            ></Image>
        </Flex>
        <Formik
        margin='100px'
        initialValues={{emailLogin:'', passwordLogin: ''}}
        onSubmit={handleSubmit}
        >
        {(formikProps) => (
            <Form>
                <Box className={`auth-big-container page-reveal ${revealed ? 'reveal' : ''}`}>
                    <Box
                    id='auth-email-and-password-container'
                    border='solid 0.5px'
                    borderRadius='5px'
                    padding='20px 50px 50px 50px'
                    >
                        <Text
                        textAlign='center'
                        fontWeight='1000'
                        mb='30px'
                        >Sign In</Text>
                        <FormControl isInvalid={isInvalidCredentials}>
                        {isInvalidCredentials && 
                        <FormErrorMessage mb='1'>Invalid email and/or password. Please try again.</FormErrorMessage>}
                        <Text
                        fontSize='12px'
                        >Email Address</Text>
                        <Input
                        variant='outline'
                        mb='2'
                        size='md'
                        fontSize='14px'
                        border='solid 0.5px black'
                        {...formikProps.getFieldProps('emailLogin')}
                        />
                        
                        <Text
                        fontSize='12px'
                        mt='10px'
                        >Password</Text>
                        <InputGroup size='md' mb='2'>
                            <Input
                                fontSize='14px'
                                border='solid 0.5px black'
                                pr='4.5rem'
                                type={show ? 'text' : 'password'}
                                variant='outline'
                                {...formikProps.getFieldProps('passwordLogin')}
                            />
                            <InputRightElement width='4.5rem'>
                                <Button
                                h='1.75rem'
                                size='xs'
                                fontSize='10px'
                                onClick={handleClick}>
                                {show ? 'Hide' : 'Show'}
                                </Button>
                            </InputRightElement>
                        </InputGroup>
                        {!isLoading ?
                        <Button
                        mt='10px'
                        backgroundColor='#E5ECF9'
                        border='solid 0.2px'
                        borderRadius='0px'
                        width='100%'
                        size='sm'
                        type='submit'
                        fontWeight='1000'
                        
                        >Sign In</Button> :

                        <Button
                            isLoading
                            width='100%'
                            loadingText='Logging in'
                            colorScheme='blue'
                            spinnerPlacement='start'
                            size='sm'
                        ></Button>}
                        <Text
                        textAlign='center'
                        mt='10px'
                        fontSize='12px'
                        >Don't have an account yet?
                            <Link to='/register-email'>
                            <Button
                            variant='link'
                            color='#608EE4'
                            fontWeight='300'
                            size='xs'
                            >&nbsp;Create Account</Button>
                        </Link>
                        </Text>
                        <Flex
                        justify='center'
                        >
                        <Button
                        variant='link'
                        color='#608EE4'
                        fontWeight='300'
                        size='xs'
                        textAlign='center'
                        >Forgot your password?</Button>
                        </Flex>
                        
                        </FormControl>
                    </Box>
                </Box>
            </Form>
         )}
        </Formik>

        <Flex
        bottom='0'
        position='fixed'
        width='100%'
        height='80px'
        backgroundColor='#0C3C55'
        color='white'
        fontSize='10px'
        align='center'
        justify='center'
        gap={3}
        >
           <Text xs='xs'>© 2024 The Coding School</Text>
           <Text xs='xs'>|</Text>
           <Text xs='xs'>Site Map</Text>
            <Text xs='xs'>|</Text>
           <Text xs='xs'>Careers</Text>
           <FacebookFilled
           style={{fontSize:'35px', marginLeft: '20px'}}
           />
            <LinkedinFilled
            style={{fontSize:'35px', marginLeft: '20px'}}
            />
        </Flex>
        </>
    )
}

export default Login;
