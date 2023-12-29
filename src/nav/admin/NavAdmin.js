import { Box, Button, Divider, Flex, Image} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { FolderFilled, FolderOutlined, HomeFilled, HomeOutlined, IdcardFilled, IdcardOutlined, LogoutOutlined, UserAddOutlined, UserOutlined } from "@ant-design/icons";
import tcsLogo from '../tcs-logo.png'
import homeIcon from '../home-icon.png'

function NavAdmin({logOut, getActiveNavButton}) {
    const navButtons = ['Dashboard', 'Jobs', 'Applicants', 'Job Portal']
    const iconSize = {fontSize: '25px', marginBottom:'8px'}
    const navButtonSVGs = [
        <HomeOutlined style={iconSize}/>, <IdcardOutlined style={iconSize}/>, <UserAddOutlined style={iconSize}/>, <FolderOutlined style={iconSize}/>

    ]
    const navClickedButtonSVGs = [
        <HomeFilled style={iconSize}/> ,<IdcardFilled style={iconSize}/>, <UserOutlined style={iconSize}/>, <FolderFilled style={iconSize}/>
    ]
    const [clickedNavButton, setClickedNavButton] = useState('Dashboard')
    
    const handleNavButtonClick = (index) => {
        setClickedNavButton(navButtons[index])
    }

    useEffect(()=> {
        getActiveNavButton(clickedNavButton)
    },[clickedNavButton])
    
    return(
        <>
        <Box
        direction='column'
        maxW='120px'
        height='100%'
        textAlign='center'
        >
            <Flex justify='center'><Image src={tcsLogo} alt="tcs-logo" maxW='100px'/></Flex>
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
                    fontSize='12px'
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
                    fontSize='12px'
                    onClick={() => handleNavButtonClick(index)}
                    ><Flex direction='column'>{navClickedButtonSVGs[index]} {button}</Flex>
                    </Button>
                }
            })}
            {/* <Button
            justifyContent='center'
            variant='ghost'
            color='white'
            colorScheme="white"
            onClick={logOut}
            >
            {<LogoutOutlined />}&nbsp;&nbsp;Logout
            </Button> */}
        </Box>
        </>
    )
}

export default NavAdmin;