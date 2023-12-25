import React from "react";


function PersonalInformation({applicantData}) {
    return(
        <>
        <p>Personal Info Page</p>
        <h1>Main Applicant View!</h1>
        <h1>First Name: {applicantData.firstNameM}</h1>
        <h1>Last Name: {applicantData.lastNameM}</h1>
        <h1>Successfully logged in!</h1>
        </>
    )
}


export default PersonalInformation;