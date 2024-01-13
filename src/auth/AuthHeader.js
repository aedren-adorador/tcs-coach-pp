import React from "react";
import { Flex, Image } from "@chakra-ui/react";
import tcsLogo from '../tcs-logo.png'

function AuthHeader() {
    return(
        <>
         <Flex
         top='0'
        position='fixed'
        width='100%'
        height='80px'
        backgroundColor='tcs.main'
        >
            <Image
            src={tcsLogo}
            ml='2%'
            height='100%'
            ></Image>
        </Flex>
        </>
    )
}

export default AuthHeader;