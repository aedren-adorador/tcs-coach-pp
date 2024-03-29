import { Box, Button, Flex, Image} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import tcsLogo from '../../tcs-logo.png'
import { IdcardOutlined, IdcardFilled, FolderOutlined, FolderFilled, SettingOutlined, SettingFilled } from "@ant-design/icons";


function NavApplicant({persistentButton, getActiveNavButton}) {
    const navButtons = ['My Application', 'Job Portal', 'Account']
    const iconSize = {fontSize: '20px', marginBottom:'8px'}
    const navButtonSVGs = [
        <IdcardOutlined style={iconSize}/>, <FolderOutlined style={iconSize}/>, <SettingOutlined style={iconSize}/>

    ]
    const navClickedButtonSVGs = [
        <IdcardFilled style={iconSize}/>, <FolderFilled style={iconSize}/>, <SettingFilled style={iconSize}/>
    ]
    
    const [clickedNavButton, setClickedNavButton] = useState(persistentButton || 'Job Portal')
    
    const handleNavButtonClick = (index) => {
        setClickedNavButton(navButtons[index])
    }

    useEffect(()=> {
        getActiveNavButton(clickedNavButton)
    },[clickedNavButton, getActiveNavButton])
    
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
                       <Flex direction='column' align='center' justify='center'>{navButtonSVGs[index]}{button}</Flex>
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
                    ><Flex direction='column' align='center' justify='center'>{navClickedButtonSVGs[index]} {button}</Flex>
                    </Button>
                }
            })}
        </Box>
        </>
    )
}

export default NavApplicant;