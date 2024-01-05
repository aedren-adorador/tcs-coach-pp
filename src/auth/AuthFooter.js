import React from "react";
import { Flex, Text } from "@chakra-ui/react";
import { FacebookFilled, LinkedinFilled } from "@ant-design/icons";

function AuthFooter() {
    return(
        <>
        <Flex
        bottom='0'
        position='fixed'
        width='100%'
        height='80px'
        backgroundColor='#0C3C55'
        color='white'
        fontSize='10px'
        align='center'
        justify='center'
        gap={3}
        >
           <Text xs='xs'>© 2024 The Coding School</Text>
           <Text xs='xs'>|</Text>
           <Text xs='xs'>Site Map</Text>
            <Text xs='xs'>|</Text>
           <Text xs='xs'>Careers</Text>
           <FacebookFilled
           style={{fontSize:'35px', marginLeft: '20px'}}
           />
            <LinkedinFilled
            style={{fontSize:'35px', marginLeft: '20px'}}
            />
        </Flex>
        
        </>
    )
}

export default AuthFooter;