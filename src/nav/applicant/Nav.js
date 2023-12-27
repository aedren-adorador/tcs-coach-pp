import { Box, Button} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { AppstoreFilled, AppstoreOutlined, BulbFilled, BulbOutlined, LogoutOutlined, MessageFilled, MessageOutlined, ProfileFilled, ProfileOutlined, QuestionCircleFilled, QuestionCircleOutlined } from "@ant-design/icons";

function Nav({logOut, getActiveNavButton}) {
    const navButtons = ['My Application', 'TCS Job Openings', 'Frequently Asked Qs', 'Learn About TCS', 'Contact Us']
    const navButtonSVGs = [
        <ProfileOutlined />, <AppstoreOutlined />, <QuestionCircleOutlined />, <BulbOutlined />, <MessageOutlined />
    ]
    const navClickedButtonSVGs = [
        <ProfileFilled />,<AppstoreFilled />, <QuestionCircleFilled />, <BulbFilled />, <MessageFilled />
    ]
    const [clickedNavButton, setClickedNavButton] = useState('My Application')
    
    const handleNavButtonClick = (index) => {
        setClickedNavButton(navButtons[index])
    }

    useEffect(()=> {
        getActiveNavButton(clickedNavButton)
    },[clickedNavButton])

    
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
            {navButtons.map((button, index) => {
                if (button !== clickedNavButton) {
                    return<Button
                    justifyContent='flex-start'
                    fontWeight='500'
                    variant='ghost'
                    colorScheme="black"
                    width='240px'
                    mb='1'
                    key={index}
                    onClick={() => handleNavButtonClick(index)}
                    >
                       { navButtonSVGs[index]}&nbsp;&nbsp;{button}
                    </Button>
                } else {
                    return <Button
                    justifyContent='flex-start'
                    color='teal'
                    fontWeight='600'
                    width='240px'
                    mb='1'
                    key={index}
                    onClick={() => handleNavButtonClick(index)}
                    >{ navClickedButtonSVGs[index]}&nbsp;{button}
                    </Button>
                }
            })}
            <Button
            justifyContent='flex-start'
            variant='ghost'
            colorScheme="red"
            width='240px'
            onClick={logOut}
            >
            {<LogoutOutlined />}&nbsp;&nbsp;Logout
            </Button>
        </Box>
        </>
    )
}

export default Nav;