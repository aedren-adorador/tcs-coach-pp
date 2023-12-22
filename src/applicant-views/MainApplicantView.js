import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button } from "@chakra-ui/react";
import { jwtDecode } from "jwt-decode";

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
        console.log(obtainedExpiry)
        console.log(currentTime)
        if (obtainedExpiry <= currentTime) {
            localStorage.removeItem('applicantID')
            localStorage.removeItem('isAuthenticated')
            navigate('/')
        }
        axios.post('http://localhost:3001/api/get-applicant-info/', {id: decodedToken.applicantID})
        .then(applicant => {
            setApplicantData(applicant.data)
        })
    },[])
    
    useEffect(() => {
    }, [applicantData])

    return(
        <>
            <h1>Main Applicant View!</h1>
            <h1>First Name: {applicantData.firstNameM}</h1>
            <h1>Last Name: {applicantData.lastNameM}</h1>
            <h1>Successfully logged in!</h1>
            <Button onClick={logOut}
            colorScheme='blue'
            variant='solid'
            >Logout</Button>        
        </>
    )
}

export default MainApplicantView;