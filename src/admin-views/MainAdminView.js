import axios from "axios";
import NavAdmin from "./NavAdmin";
import Dashboard from "./Dashboard";
import Applicants from "./applicants/Applicants";
import JobPortal from "../applicant-views/job-portal/JobPortal";
import AdminAccount from "./AdminAccount";

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Avatar, Button, Flex, Grid, GridItem, Menu, MenuButton, MenuItem, MenuList, Text } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { jwtDecode } from "jwt-decode";


function MainAdminView() {
    const navigate = useNavigate();
    const [adminData, setAdminData] = useState({});
    const [obtainedActiveNavButton, setObtainedActiveNavButton] = useState(
        localStorage.getItem("activeNavButton") || "Dashboard"
    );
    const [toSendActiveNavButton, setToSendActiveNavButton] = useState('');
    
    const logOut = () => {
        localStorage.removeItem('activeNavButton')
        localStorage.removeItem('applicantID')
        localStorage.removeItem('isAuthenticated')
        localStorage.removeItem('token')
        navigate('/login');
    }
    const getActiveNavButton = (navButton) => {
        setObtainedActiveNavButton(navButton)
    }
    
    useEffect(() => {
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
        .then(admin => {
            setAdminData(admin.data)
        })
    },[])
    
    useEffect(() => {
    }, [adminData])

    useEffect(() => {
        setToSendActiveNavButton(obtainedActiveNavButton)
    }, [obtainedActiveNavButton])

    useEffect(() => {
    localStorage.setItem("activeNavButton", obtainedActiveNavButton);
    }, [obtainedActiveNavButton]);

    return(
        <>
            <Grid
            templateAreas={`"nav header"
                            "nav main"
                            "nav main"`}
            gridTemplateRows={'45px 1fr'}
            gridTemplateColumns={'100px 1fr'}
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
                            <Text ml='5px' fontSize='14px'>{adminData.firstNameM} {adminData.lastNameM} {adminData.admin?.toString() === 'true' && '(admin)'}</Text>
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
                <NavAdmin
                logOut={logOut}
                getActiveNavButton={getActiveNavButton}
                persistentButton={obtainedActiveNavButton}
                />
            </GridItem>

            <GridItem
            mt='20px'
            bg='#white'
            area={'main'}
            padding='10px'
            >
                {obtainedActiveNavButton === 'Dashboard' && <Dashboard/>}
                {obtainedActiveNavButton === 'Applicants' && <Applicants/>}
                {obtainedActiveNavButton === 'Job Portal' && <JobPortal isAdmin={true}/>}
                {obtainedActiveNavButton === 'Account' && <AdminAccount adminData={adminData}/>}
            </GridItem>
            </Grid>
        </>
    )
}

export default MainAdminView;