import { Button, Grid, GridItem, Header } from "@chakra-ui/react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "../nav/applicant/Nav";
import NavAdmin from "../nav/admin/NavAdmin";
import ReceivedApplications from "./received-applications/ReceivedApplications";
import CreateJobOpening from "./create-job-opening/CreateJobOpening";

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
            templateAreas={`"nav main"
                            "nav main"
                            "nav footer"`}
            gridTemplateRows={'50px 1fr'}
            gridTemplateColumns={'250px 1fr'}
            h='100vh'
            color='blackAlpha.'
            >
            <GridItem area={'header'}>
                {/* <Header/> */}
            </GridItem>
            <GridItem bg='white.300' area={'nav'} position='fixed'>
                <NavAdmin logOut={logOut} getActiveNavButton={getActiveNavButton}/>
            </GridItem>

            <GridItem bg='#f2f7f9' area={'main'} padding='10px'>
                {obtainedActiveNavButton === 'Received Applications' && <ReceivedApplications/>}
                {obtainedActiveNavButton === 'Create Job Opening' && <CreateJobOpening/>}

            </GridItem>
            </Grid>
        </>
    )
}

export default MainAdminView;