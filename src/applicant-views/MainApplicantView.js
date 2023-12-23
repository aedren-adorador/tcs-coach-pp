import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Box, Button, Flex, Grid, GridItem } from "@chakra-ui/react";
import { jwtDecode } from "jwt-decode";
import Header from "../nav/Header";
import Nav from "../nav/Nav";

function MainApplicantView() {
    const navigate = useNavigate();
    const [applicantData, setApplicantData] = useState({})
    const logOut = () => {
        localStorage.removeItem('applicantID')
        localStorage.removeItem('isAuthenticated')
        localStorage.removeItem('token')
        navigate('/');
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
            <Nav logOut={logOut}/>
        </GridItem>
        <GridItem bg='#f2f7f9' area={'main'} padding='10px'>
            <h1>Main Applicant View!</h1>
            <h1>First Name: {applicantData.firstNameM}</h1>
            <h1>Last Name: {applicantData.lastNameM}</h1>
            <h1>Successfully logged in!</h1>
        </GridItem>
        
        </Grid>
        </>
    )
}

export default MainApplicantView;