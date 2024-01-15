import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { FormControl, Input, Button, Card, CardBody, FormHelperText, useToast} from "@chakra-ui/react";
import { Formik, Form } from "formik";

function CreateApplicantAccount() {
    const [revealed, setRevealed] = useState(false);
    const [isCreatingAccount, setIsCreatingAccount] = useState(false);
    
    const handleSubmit = (adminDetails) => {
        setIsCreatingAccount(true);
        axios.post(`${process.env.REACT_APP_SYS_URL}/api/create-account/admin`, adminDetails)
            .then(result => {
                console.log(result)
                setTimeout(() => {
                    setIsCreatingAccount(false)
                }, 1200)
            })
    }

    useEffect(() => {
        setRevealed(true);
    }, []);

    useEffect(() => {
    },[isCreatingAccount])

    return (
        <>
             <div className={`auth-big-container page-reveal ${revealed ? 'reveal' : ''}`}>
                <Formik
                initialValues={{emailAdmin: '', firstNameAdmin: '', lastNameAdmin: '', setPasswordAdmin: '', confirmPasswordAdmin:''}}
                onSubmit={handleSubmit}
                >
                {(formikProps) => (
                    <Form>
                        <Card maxW='md'>
                            <CardBody>
                            <FormControl isRequired>
                            <FormHelperText mb='1'>Create an admin account for TCS Coach++.</FormHelperText>
                            <Input
                            variant='filled'
                            placeholder="Email Admin"
                            id='emailAdmin'
                            mb='2'
                            {...formikProps.getFieldProps('emailAdmin')}
                            />
                            <Input
                            variant='filled'
                            placeholder='First Name Admin'
                            mb='2'
                            id='firstNameAdmin'
                            {...formikProps.getFieldProps('firstNameAdmin')}
                            />
                            <Input
                            variant='filled'
                            placeholder='Last Name Admin'
                            mb='2'
                            id='lastNameAdmin'
                            {...formikProps.getFieldProps('lastNameAdmin')}
                            />
                            <Input
                            variant='filled'
                            placeholder="Set Password Admin"
                            mb='2'
                            id='setPasswordAdmin'
                            type='password'
                            {...formikProps.getFieldProps('setPasswordAdmin')}
                            />
                            <Input
                            variant='filled'
                            placeholder='Confirm Password Admin'
                            mb='2'
                            id='confirmPasswordAdmin'
                            type='password'
                            {...formikProps.getFieldProps('confirmPasswordAdmin')}
                            />
                            </FormControl>
                            {isCreatingAccount ?
                             <Button
                             isLoading
                             loadingText='Creating Account'
                             colorScheme='blue'
                             float='right'
                            >
                            </Button> :
                            <Button
                            colorScheme='blue'
                            float='right'
                            type='submit'
                            >Create Admin
                            </Button>
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

export default CreateApplicantAccount;