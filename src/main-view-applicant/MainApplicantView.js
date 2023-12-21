import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function MainApplicantView() {
    const applicantID = useParams().id
    const [applicantData, setApplicantData] = useState({})
    useEffect(() => {
         axios.post('http://localhost:3001/api/get-applicant-info/', {id: applicantID})
        .then(applicant => {
            setApplicantData(applicant.data)
        })
    }, [])
    
    useEffect(() => {
    }, [applicantData])

    return(
        <>
            <h1>Main Applicant View!</h1>
            <h1>First Name: {applicantData.firstNameM}</h1>
            <h1>Last Name: {applicantData.lastNameM}</h1>
            <h1>Successfully logged in!</h1>
        </>
    )
}

export default MainApplicantView;