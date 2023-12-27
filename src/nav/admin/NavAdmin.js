import { Box, Button} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { CameraFilled, CameraOutlined, FileAddFilled, FileAddOutlined, FileDoneOutlined, FileTextFilled, FrownFilled, FrownOutlined, LogoutOutlined, NotificationFilled, NotificationOutlined, UserAddOutlined, UserOutlined } from "@ant-design/icons";

function NavAdmin({logOut, getActiveNavButton}) {
    const navButtons = ['Received Applications', 'Received Interviews', 'Received Teaching Demos', 'Onboarded New Hires', 'Rejected Applicants', 'Create Job Opening']
    const navButtonSVGs = [
        <FileDoneOutlined/>, <UserOutlined />, <CameraOutlined />, <NotificationOutlined />, <FrownOutlined />, <FileAddOutlined />
    ]
    const navClickedButtonSVGs = [
       <FileTextFilled/> ,<UserAddOutlined />, <CameraFilled />, <NotificationFilled />, <FrownFilled />, <FileAddFilled/>
    ]
    const [clickedNavButton, setClickedNavButton] = useState('Submitted Applications')
    
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

export default NavAdmin;