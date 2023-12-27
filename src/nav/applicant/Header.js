import React from "react";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
function Header({userData}) {
    return(
        <>
        <Flex
        display='flex'
        justify='center'
        height='50px'
        align='center'
        bgImage='linear-gradient(to right, #0e4663, #114d6c, #145574, #175c7d, #1a6486, #1c698c, #1d6d91, #1f7297, #21759a, #22789e, #247ba1, #257ea5);'
        position='fixed'
        width='85%'
        >
            <Text color='white'>Hi, {userData.firstNameM}. Welcome to your TCS Coach++ Account. Get all the info regarding your application here. Goodluck!</Text>
        </Flex>        
        </>
    )
}
export default Header;
