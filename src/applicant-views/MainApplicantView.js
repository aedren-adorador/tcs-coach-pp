import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button, Flex, Grid, GridItem, Menu, MenuButton, MenuItem, MenuList, Text, Avatar } from "@chakra-ui/react";
import { jwtDecode } from "jwt-decode";
import NavApplicant from "../nav/applicant/NavApplicant";
import JobPortal from "./job-portal/JobPortal";
import MyApplication from "./my-application/MyApplication";
import Account from "./account/Account";
import { ChevronDownIcon } from "@chakra-ui/icons";

function MainApplicantView() {
    const navigate = useNavigate();
    const [applicantData, setApplicantData] = useState({});
    const [obtainedActiveNavButton, setObtainedActiveNavButton] = useState(
        localStorage.getItem("activeNavButton") || "Job Portal"
    );
    const [toSendActiveNavButton, setToSendActiveNavButton] = useState('');
    
    const logOut = () => {
        localStorage.removeItem('activeNavButton')
        localStorage.removeItem('applicantID')
        localStorage.removeItem('isAuthenticated')
        localStorage.removeItem('token')
        localStorage.removeItem('currentStep')
        navigate('/login');
    }
    const getActiveNavButton = (navButton) => {
        setObtainedActiveNavButton(navButton)
    }
    
    useEffect(() => {
        setToSendActiveNavButton(obtainedActiveNavButton)
        localStorage.setItem("activeNavButton", obtainedActiveNavButton);

        setObtainedActiveNavButton(localStorage.getItem("activeNavButton"))
        setToSendActiveNavButton(obtainedActiveNavButton)
        const obtainedToken = localStorage.getItem('token');
        const decodedToken = jwtDecode(obtainedToken);
        const obtainedExpiry = decodedToken.exp
        const currentDate = new Date()
        const currentTime = Math.floor(currentDate.getTime()/1000)
        if (obtainedExpiry <= currentTime) {
            localStorage.removeItem('applicantID')
            localStorage.removeItem('isAuthenticated')
            navigate('/')
        }
        axios.post(`${process.env.REACT_APP_SYS_URL}/api/applicant/general-request/get-user-info/`, {id: decodedToken.userID})
        .then(applicant => {
            setApplicantData(applicant.data)
        })
    },[obtainedActiveNavButton, navigate])
    
    useEffect(() => {
    }, [applicantData])

    return(
        <>
       <Grid
            templateAreas={`"nav header"
                            "nav main"
                            "nav footer"`}
            gridTemplateRows={'45px 1fr'}
            gridTemplateColumns={'80px 1fr'}
            h='100vh'
            >
            <GridItem
            area={'header'}
            backgroundColor='white'
            borderBottom='solid 0.5px lightgray'
            width="100%"
            position='fixed'
            zIndex='1'
            >
                <Flex justify='flex-end' align='center' margin='10px'>
                    <Menu>
                    <MenuButton as={Button} rightIcon={<ChevronDownIcon />} maxW='100%' variant='ghost'>
                        <Flex align='center'>
                            <Avatar size='xs'/>
                            <Text ml='5px' fontSize='14px'>{applicantData.firstNameM} {applicantData.lastNameM} {applicantData.admin?.toString() === 'true' && '(admin)'}</Text>
                        </Flex>
                    </MenuButton>
                    <MenuList>
                        <MenuItem onClick={logOut} size='sm'>Logout</MenuItem>
                    </MenuList>
                    </Menu>
                </Flex>
            </GridItem>

            <GridItem
            bg='tcs.main'
            area={'nav'}
            height='100%'
            position='fixed'
            zIndex='2'
            >
                <NavApplicant
                logOut={logOut}
                getActiveNavButton={getActiveNavButton}
                persistentButton={obtainedActiveNavButton}
                />
            </GridItem>

            <GridItem
            mt='15px'
            bg={obtainedActiveNavButton === 'My Application' ? 'white' : '#F2F2F2'}
            area={'main'}
            padding='0px'
            >
                {obtainedActiveNavButton === 'Job Portal' && <JobPortal applicantData={applicantData}/>}
                {obtainedActiveNavButton === 'My Application' && <MyApplication applicantData={applicantData}/>}
                {obtainedActiveNavButton === 'Account' && <Account applicantData={applicantData}/>}
            </GridItem>
            </Grid>
        </>
    )
}

export default MainApplicantView;