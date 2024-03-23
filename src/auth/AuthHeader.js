import React from "react";
import { Button, Flex, Image } from "@chakra-ui/react";
import tcsLogo from '../tcs-logo.png'
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";

function AuthHeader() {
    return(
        <>
         <Flex
        align='center'
        top='0'
        position='fixed'
        width='100%'
        height='80px'
        backgroundColor='tcs.main'
        bgGradient="linear(to-r, tcs.main, tcs.main, #fea115)"
        justify='space-between'
        padding='20px'  
        >
            <Image
            src={tcsLogo}
            ml='6px'
            height='70px'
            ></Image>
            <Link to='/'>
                {!localStorage.getItem('isAuthenticated') && 
                <Button colorScheme='green' ml='5px' minW='150px' size='sm'>Explore Job Portal</Button>}
            </Link>
        </Flex>
        </>
    )
}

export default AuthHeader;