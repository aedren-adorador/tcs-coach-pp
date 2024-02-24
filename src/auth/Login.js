import { React } from "react";
import { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import { Input, InputGroup, InputRightElement, Button, FormErrorMessage, FormControl, Text, Flex, Image, Box, Card } from "@chakra-ui/react";
import './auth-styles/auth.styles.css'
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import AuthHeader from "./AuthHeader";
import AuthFooter from "./AuthFooter";
import { ExternalLinkIcon } from "@chakra-ui/icons";


function Login({onLoginSuccess}) {
    const navigate = useNavigate();
    const [revealed, setRevealed] = useState(false);
    const [show, setShow] = useState(false);
    const [isInvalidCredentials, setIsInvalidCredentials] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const handleClick = () => setShow(!show);

    const handleSubmit = (loginInputs) => {
        setIsLoading(true);
        axios.post(`${process.env.REACT_APP_SYS_URL}/api/auth/login`, loginInputs)
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
        const isStillAuthenticated = localStorage.getItem('isAuthenticated')
        if (isStillAuthenticated) {
            console.log(localStorage.getItem('token'))
            onLoginSuccess();
            const decodedUserToken = jwtDecode(localStorage.getItem('token'))
            const loggedInUserID = decodedUserToken.userID
            const isAdmin =  decodedUserToken.admin                   
            if (isAdmin === true) {
                navigate(`/admin-home/${loggedInUserID}`)
            } else if (isAdmin === 'false'){
                navigate(`/applicant-home/${loggedInUserID}`)
            }
        }
        setRevealed(true);
    }, [navigate, onLoginSuccess]);
    return (
        <>
        <AuthHeader/>
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
                        <Flex justify='flex-end'>
                             
                        <Link to='/'>
                        <Button  bg='white' size='xs' variant='ghost' colorScheme='green'>See Job Portal &nbsp;<ExternalLinkIcon/></Button>
                        </Link>
                        </Flex>
                       
                        <FormControl isInvalid={isInvalidCredentials}>
                        {isInvalidCredentials && 
                        <FormErrorMessage
                        mb='1'
                        fontSize='12px'
                        >Invalid email and/or password. Please try again.</FormErrorMessage>}
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
                        fontWeight='600'
                        
                        >Sign In </Button> :

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
                        <Link to='/forgot-password'>
                        <Button
                        variant='link'
                        color='#608EE4'
                        fontWeight='300'
                        size='xs'
                        textAlign='center'
                        >Forgot your password?</Button>
                        </Link>
                        </Flex>
                        
                        </FormControl>
                    </Box>
                </Box>
            </Form>
         )}
        </Formik>
        <AuthFooter/>
        </>
    )
}

export default Login;
