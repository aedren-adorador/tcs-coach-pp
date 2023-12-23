import { Box, Button, Flex, Text} from "@chakra-ui/react";
import React from "react";

function Nav({logOut}) {
    return(
        <>
        <Box
        padding='5px'
        flex='1'
        direction='column'
        maxW='200px'
        minW='200px'
        width='250px'
        height='100%'
        >
            <Button
            variant='outline'
            colorScheme="blue"
            width='240px'
            mb='1'
            >My Applications
            </Button>

            <Button
            variant='outline'
            colorScheme="blue"
            width='240px'
            mb='1'
            >
            TCS Job Openings
            </Button>
           
           <Button
            variant='outline'
            colorScheme="blue"
            width='240px'
            mb='1'
            >
            Frequently Asked Qs
            </Button>
            <Button
            variant='ghost'
            colorScheme="red"
            width='240px'
            onClick={logOut}
            >
            Logout
            </Button>
        </Box>
        </>
    )
}

export default Nav;