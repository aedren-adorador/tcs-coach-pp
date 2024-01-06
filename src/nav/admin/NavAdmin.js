import { Box, Button, Divider, Flex, Image} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { FolderFilled, FolderOutlined, HomeFilled, HomeOutlined, IdcardFilled, IdcardOutlined, LogoutOutlined, UserAddOutlined, UserOutlined } from "@ant-design/icons";
import tcsLogo from '../../tcs-logo.png'

function NavAdmin({persistentButton, getActiveNavButton}) {
    const navButtons = ['Dashboard', 'Applicants', 'Job Portal']
    const iconSize = {fontSize: '20px', marginBottom:'8px'}
    const navButtonSVGs = [
        <HomeOutlined style={iconSize}/>,  <UserAddOutlined style={iconSize}/>, <FolderOutlined style={iconSize}/>

    ]
    const navClickedButtonSVGs = [
        <HomeFilled style={iconSize}/> , <UserOutlined style={iconSize}/>, <FolderFilled style={iconSize}/>
    ]
    const [clickedNavButton, setClickedNavButton] = useState(persistentButton || 'Dashboard')
    
    const handleNavButtonClick = (index) => {
        setClickedNavButton(navButtons[index])
    }

    useEffect(()=> {
        console.log('changed!', clickedNavButton)
        getActiveNavButton(clickedNavButton)
    },[clickedNavButton])
    
    return(
        <>
        <Box
        direction='column'
        maxW='80px'
        height='100%'
        textAlign='center'
        >
            <Flex justify='center'><Image src={tcsLogo} alt="tcs-logo" maxW='70px'/></Flex>
            {navButtons.map((button, index) => {
                if (button !== clickedNavButton) {
                    return<Button
                    borderRadius='0px'
                    fontWeight='500'
                    variant='ghost'
                    colorScheme="blackAlpha"
                    mb='1'
                    key={index}
                    width='100%'
                    height='80px'
                    fontSize='10px'
                    onClick={() => handleNavButtonClick(index)}
                    color='white'
                    >
                       <Flex direction='column'>{navButtonSVGs[index]}{button}</Flex>
                    </Button>
                } else {
                    return <Button
                    borderRadius='0px'
                    fontWeight='600'
                    mb='1'
                    width='100%'
                    key={index}
                    height='80px'
                    fontSize='10px'
                    onClick={() => handleNavButtonClick(index)}
                    ><Flex direction='column'>{navClickedButtonSVGs[index]} {button}</Flex>
                    </Button>
                }
            })}
        </Box>
        </>
    )
}

export default NavAdmin;