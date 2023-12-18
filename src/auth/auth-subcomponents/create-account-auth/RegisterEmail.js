import React from "react";
import '../../auth-styles/auth.styles.css';
import { Input, Button } from "@chakra-ui/react";
import { ArrowBackIcon } from '@chakra-ui/icons'
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function RegisterEmail() {
    const [revealed, setRevealed] = useState(false);

    useEffect(() => {
        setRevealed(true);
    }, []);
    
    return(
        <>
        <div className={`auth-big-container page-reveal ${revealed ? 'reveal' : ''}`}>
            <div id="auth-register-email-container">
                <Input variant='filled' placeholder='Enter email' mb='2' size='lg' style={{ height: '70px'}}/>
                <Button float='right' colorScheme='green' size='lg'>Verify Email</Button>
                <Link to='/'><Button float='left' colorScheme='blackAlpha' size='sm' variant='ghost'><ArrowBackIcon/>&nbsp;Go Back</Button></Link>
            </div>
        </div>
        </>
    )
}

export default RegisterEmail;