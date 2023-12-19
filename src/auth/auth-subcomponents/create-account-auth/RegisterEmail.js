import React from "react";
import '../../auth-styles/auth.styles.css';
import { Input, Button,  FormControl, FormLabel } from "@chakra-ui/react";
import { Formik, Form} from "formik";
import { ArrowBackIcon } from '@chakra-ui/icons'
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function RegisterEmail() {
    const [revealed, setRevealed] = useState(false);

    useEffect(() => {
        setRevealed(true);
    }, []);

    const handleSubmit = (e) => {
        console.log('HELLO! NICE')
    }

    return(
        <>
        <div className={`auth-big-container page-reveal ${revealed ? 'reveal' : ''}`}>
            <div id="auth-register-email-container">
                <Formik
                initialValues={{email: ''}}
                onSubmit={handleSubmit}
                >
                {(formikProps) => (
                <Form>   
                    <FormControl>
                        <FormLabel>Email Address</FormLabel>
                            <Input
                            variant='filled'
                            placeholder='Enter email'
                            mb='2'
                            size='lg'
                            style={{ height: '70px'}}
                            />
                            <Button
                            float='right'
                            colorScheme='green'
                            size='lg'
                            type='submit'
                            >Verify Email</Button>
                            <Link to='/'>
                                <Button float='left' colorScheme='blackAlpha' size='sm' variant='ghost'><ArrowBackIcon/>&nbsp;Go Back</Button>
                            </Link>
                    </FormControl>
                </Form> 
                )}
                </Formik>
            </div>
        </div>
        </>
    )
}

export default RegisterEmail;