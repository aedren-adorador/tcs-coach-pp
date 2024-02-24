import { Box, Button, Grid, GridItem, Text } from "@chakra-ui/react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavAdmin from "../nav/admin/NavAdmin";
import Dashboard from "./dashboard/Dashboard";
import Applicants from "./applicants/Applicants";
import JobPortal from "../applicant-views/job-portal/JobPortal";
import Account from "../applicant-views/account/Account";
import AdminAccount from "./account/AdminAccount";
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
                <Box>
                    <Button
                    size='xs'
                    colorScheme='red'
                    margin='10px'
                    float='right'
                    onClick={logOut}
                    borderRadius='0'
                    >Logout</Button>
                </Box>
            </GridItem>

            <GridItem
            bg='#0c3c55'
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