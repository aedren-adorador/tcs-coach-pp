import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { FormControl, FormErrorMessage, FormLabel, Input, Button, Card, CardBody, Alert, AlertIcon, AlertTitle, AlertDescription} from "@chakra-ui/react";
import { Formik, Form } from "formik";

function VerifiedEmail() {
    const url = 'http://localhost:3001'
    const [revealed, setRevealed] = useState(false);
    const [doPasswordsMatch, setDoPasswordsMatch] = useState(true);

    const handleSubmit = (initialDetails) => {

        if (initialDetails.setPassword !== initialDetails.confirmPassword) {
            setDoPasswordsMatch(false);
        } else {
            setDoPasswordsMatch(true);
        }
        axios.post(`${url}/api/auth/create-account`, initialDetails)
    }

    useEffect(() => {
    }, [doPasswordsMatch])

    useEffect(() => {
        setRevealed(true);
    }, []);

    return (
        <>
             <div className={`auth-big-container page-reveal ${revealed ? 'reveal' : ''}`}>
                <Formik
                initialValues={{firstName:'', lastName:'', setPassword: '', confirmPassword: ''}}
                onSubmit={handleSubmit}
                >
                {(formikProps) => (
                    <Form>
                        <Card maxW='md'>
                            <CardBody>
                            <FormControl isRequired>
                            <h1 style={{textAlign:'center'}}>VERIFICATION SUCCESS! Now, we need a few more details about you:</h1>
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
                            <Button
                            colorScheme='green'
                            float='right'
                            type='submit'
                            >Create Account </Button>
                            </FormControl>
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