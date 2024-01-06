import { Box, Button, Grid, GridItem, Text } from "@chakra-ui/react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavAdmin from "../nav/admin/NavAdmin";
import Dashboard from "./dashboard/Dashboard";
import Applicants from "./applicants/Applicants";
import JobPortal from "../applicant-views/job-portal/JobPortal";
function MainAdminView() {
    const navigate = useNavigate();
    const [adminData, setAdminData] = useState({});
    const [obtainedActiveNavButton, setObtainedActiveNavButton] = useState('');
    const [toSendActiveNavButton, setToSendActiveNavButton] = useState('');
    
    const logOut = () => {
        localStorage.removeItem('applicantID')
        localStorage.removeItem('isAuthenticated')
        localStorage.removeItem('token')
        navigate('/');
    }
    const getActiveNavButton = (navButton) => {
        setObtainedActiveNavButton(navButton)
    }
    
    useEffect(() => {
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
        axios.post('http://localhost:3001/api/get-user-info/', {id: decodedToken.userID})
        .then(admin => {
            setAdminData(admin.data)
        })
    },[])
    
    useEffect(() => {
    }, [adminData])

    useEffect(() => {
        setToSendActiveNavButton(obtainedActiveNavButton)
    }, [obtainedActiveNavButton])

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
                <Box>
                    <Button
                    size='xs'
                    colorScheme='red'
                    margin='10px'
                    float='right'
                    onClick={logOut}
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
            </GridItem>
            </Grid>
        </>
    )
}

export default MainAdminView;