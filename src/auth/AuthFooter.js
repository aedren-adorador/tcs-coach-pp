import React from "react";
import { Flex, Link, Text } from "@chakra-ui/react";
import { FacebookFilled, LinkedinFilled } from "@ant-design/icons";

function AuthFooter() {
    return(
        <>
        <Flex
        bottom='0'
        position='fixed'
        width='100%'
        height='80px'
        bgGradient="linear(to-r, tcs.main, tcs.main, #fea115, pink.500)"
        color='white'
        fontSize='10px'
        align='center'
        justify='center'
        gap={3}
        >
           <Text xs='xs'>© 2024 The Coding School</Text>
           <Text xs='xs'>|</Text>
           <Link href='https://www.facebook.com/codingschoolph' target='_blank'>
           <FacebookFilled
           style={{fontSize:'35px', marginLeft: '20px'}}
           />
           </Link>

           <Link href='https://www.linkedin.com/company/thecodingschool/' target='_blank'>
            <LinkedinFilled
            style={{fontSize:'35px', marginLeft: '20px'}}
            />
            </Link>
        </Flex>
        
        </>
    )
}

export default AuthFooter;