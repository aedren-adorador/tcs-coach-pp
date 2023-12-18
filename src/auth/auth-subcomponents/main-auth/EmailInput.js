import React from "react";
import { Input } from "@chakra-ui/react";
import '../../auth-styles/auth.styles.css'

function EmailInput() {
    return(
        <>
            <Input variant='filled' placeholder='Enter email' mb='2' size='lg'/>
        </>
    )
}

export default EmailInput;