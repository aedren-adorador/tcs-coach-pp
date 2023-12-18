import React from "react";
import { Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";

function LoginButton() {
    return (
        <>
            <Button colorScheme='blue' float='right' size='md'>Log-in</Button>
        </>
    )
}


export default LoginButton;