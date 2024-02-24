import React from "react";
import { Button, Flex, Image } from "@chakra-ui/react";
import tcsLogo from '../tcs-logo.png'
import { ExternalLinkIcon } from "@chakra-ui/icons";

function AuthHeader() {
    return(
        <>
         <Flex
         top='0'
        position='fixed'
        width='100%'
        height='80px'
        backgroundColor='tcs.main'
        justify='space-between'
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