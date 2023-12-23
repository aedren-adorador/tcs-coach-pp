import { Button, Flex } from "@chakra-ui/react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "../nav/Nav";

function MainAdminView() {
     const navigate = useNavigate();
    const [adminData, setAdminData] = useState({})
    const logOut = () => {
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
    return(
        <>
            <Nav/>
            <h1>Main Admin View!</h1>
            <h1>First Name: {adminData.firstNameM}</h1>
            <h1>Last Name: {adminData.lastNameM}</h1>
            <h1>Successfully logged in!</h1>
            <Button onClick={logOut}
            colorScheme='blue'
            variant='solid'
            >Logout</Button>   
        </>
    )
}

export default MainAdminView;