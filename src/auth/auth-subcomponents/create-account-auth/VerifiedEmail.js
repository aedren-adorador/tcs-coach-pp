import React from "react";
import { useState, useEffect } from "react";
import { FormControl, FormErrorMessage, FormLabel, Input, Button, Card, CardBody } from "@chakra-ui/react";
import { Formik, Form } from "formik";
function VerifiedEmail() {
    const [revealed, setRevealed] = useState(false);
    useEffect(() => {
        setRevealed(true);
    }, []);
    return (
        <>
             <div className={`auth-big-container page-reveal ${revealed ? 'reveal' : ''}`}>
                <Formik
                >
                {(formikProps) => (
                    <Form>
                        <Card maxW='md'>
                            <CardBody>
                            <h1 style={{textAlign:'center'}}>VERIFICATION SUCCESS! Now, we need a few more details about you:</h1>
                            <Input
                            variant='filled'
                            placeholder='First Name'
                            mb='2'/>
                            <Input
                            variant='filled'
                            placeholder='Last Name'
                            mb='2'/>
                            <Input
                            variant='filled'
                            placeholder='Set password'
                            mb='2'/>
                            <Input
                            variant='filled'
                            placeholder='Confirm password'
                            type='password'
                            mb='2'
                            />
                            <Button
                            colorScheme='green'
                            float='right'
                            >Create Account</Button>
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