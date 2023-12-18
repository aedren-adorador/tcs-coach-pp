import React from "react";
import { Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";

function CreateAccount() {
    return(
        <>
            <Link to='/register-email'>
                <Button variant='link' float='left' id='create-account-button' size='xs'>Create Account</Button>
            </Link>
        </>
    )
}

export default CreateAccount;