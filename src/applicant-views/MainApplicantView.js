import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Grid, GridItem } from "@chakra-ui/react";
import { jwtDecode } from "jwt-decode";
import Header from "../nav/applicant/Header";
import Nav from "../nav/applicant/Nav";
import MyApplication from './my-application/MyApplication'

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
        gridTemplateRows={'50px 1fr'}
        gridTemplateColumns={'250px 1fr'}
        h='100vh'
        color='blackAlpha.'
        >
        <GridItem area={'header'}>
            <Header userData={applicantData}/>
        </GridItem>
        <GridItem bg='white.300' area={'nav'} position='fixed'>
            <Nav logOut={logOut} getActiveNavButton={getActiveNavButton}/>
        </GridItem>

        <GridItem bg='#f2f7f9' area={'main'} padding='10px'>
            {obtainedActiveNavButton === 'My Application' && <MyApplication applicantData={applicantData}/>}
            {obtainedActiveNavButton === 'TCS Job Openings' && 'TCS Job Openings'}
            {obtainedActiveNavButton === 'Frequently Asked Qs' && 'Frequently Asked Qs'}
            {obtainedActiveNavButton === 'Learn About TCS' && 'Learn About TCS'}
            {obtainedActiveNavButton === 'Contact Us' && 'Contact Us'}
        </GridItem>
        </Grid>
        </>
    )
}

export default MainApplicantView;