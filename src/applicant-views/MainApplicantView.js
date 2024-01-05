import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Box, Button, Grid, GridItem } from "@chakra-ui/react";
import { jwtDecode } from "jwt-decode";
import NavApplicant from "../nav/applicant/NavApplicant";
import JobPortal from "./job-portal/JobPortal";

function MainApplicantView() {

    const navigate = useNavigate();
    const [applicantData, setApplicantData] = useState({});
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
        .then(applicant => {
            setApplicantData(applicant.data)
        })
    },[])
    
    useEffect(() => {
    }, [applicantData])

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
                <NavApplicant
                logOut={logOut}
                getActiveNavButton={getActiveNavButton}
                />
            </GridItem>

            <GridItem
            bg='#F2F2F2'
            area={'main'}
            padding='0px'
            >
                {obtainedActiveNavButton === 'Job Portal' && <JobPortal/>}
                {/* {obtainedActiveNavButton === 'Applicants' && <Applicants/>} */}
            </GridItem>
            </Grid>
        </>
    )
}

export default MainApplicantView;