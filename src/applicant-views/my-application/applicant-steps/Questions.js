import { Input, InputGroup, Stack, Checkbox, InputRightAddon, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";


function Questions({applicantData, getFieldProps}) {
    const coachingExperience = ['I have coached/tutored professionally', 'I have coached/tutored as an intern', 'I have coached/tutored friends or co-students', 'I have no tutoring experience']
    const areasOfExpertise = ['MERN/MEAN Stack Development','Financial Literacy (Accounting)', 'Data Science (SQL, Python, Excel)', 'Python Programming', 'Machine Learning/Artificial Intelligence', 'Calculus', 'Robotics', 'Cybersecurity']

    const availability = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

    const [checkedCoachingExperience, setCheckedCoachingExperience] = useState([]);
    const [checkedAreasOfExpertise, setCheckedAreasOfExpertise] = useState([]);
    const [checkedAvailabilities, setCheckedAvailabilities] = useState([]);

    const handleClickedCoachingExperience =(e) => {
        setCheckedCoachingExperience(prevCoachingExperience => {
            if (prevCoachingExperience.includes(e.target.value) === false && e.target.checked === true) {
                return [...prevCoachingExperience, e.target.value]
            }
            if (e.target.checked === false) {
                return prevCoachingExperience.filter(experience => experience !== e.target.value)
            }
        })
    }

    const handleClickedArea = (e) => {
        setCheckedAreasOfExpertise(prevAreasOfExpertise => {
            if (prevAreasOfExpertise.includes(e.target.value) === false && e.target.checked === true) {
                return [...prevAreasOfExpertise, e.target.value]
            }
            if (e.target.checked === false) {
                return prevAreasOfExpertise.filter(area => area !== e.target.value)
            }
        })
    }

    const handleClickedAvailability = (e) => {
        setCheckedAvailabilities(prevAvailabilities => {
            if (prevAvailabilities.includes(e.target.value) === false && e.target.checked === true) {
                return [...prevAvailabilities, e.target.value]
            }
            if (e.target.checked === false) {
                return prevAvailabilities.filter(availability => availability !== e.target.value)
            }
        })
    }

    return(
        <>
        <Text color='gray'>Coaching/Tutoring Experience</Text>
        <Stack
        mt='1'
        ml='5'
        spacing={1}
        direction='column'
        mb='4'
        >
            {coachingExperience.map((coachingExperience, index) => {
            return <Checkbox
            colorScheme='facebook'
            onChange={handleClickedCoachingExperience}
            key={index}
            value={coachingExperience}
            >
                <Text fontSize='14px' key={index}>{coachingExperience}</Text>
            </Checkbox>
            })} 
        </Stack>

        <Text color='gray'>Areas of Expertise</Text>
        <Stack
        mt='1'
        ml='5'
        spacing={1}
        direction='column'
        mb='4'
        >
            {areasOfExpertise.map((area, index) => {
                return <Checkbox
                key={index}
                colorScheme='facebook'
                value={area}
                onChange={handleClickedArea}
                >
                <Text fontSize='14px'>{area}</Text>
            </Checkbox>
            })}
        </Stack>

         <Text color='gray'>Availability (Philippine Standard Time)</Text>
        <Stack
        mt='1'
        ml='5'
        spacing={1}
        direction='row'
        mb='4'
        gap='5'
        >
            {availability.map((availability, index) => {
                return <Checkbox
                key={index}
                colorScheme='facebook'
                value={availability}
                onChange={handleClickedAvailability}
                >
                <Text fontSize='14px'>{availability}</Text>
            </Checkbox>
            })}
        </Stack>

        

        <Text color='gray'>Schedule Availability</Text>
        <Text color='gray'>Internet Speed</Text>
        <InputGroup>
            <Input
             {...getFieldProps('internetSpeed')}
            size='sm'
            border='solid 0.2px black'
            width='180px'
            height='35px'
            mb='4'
            >
            </Input>
            <InputRightAddon
            size='sm'
            height='35px'
            border='solid 0.2px'
            bg='#0C3C55'   
            color='white'         
            >MBPS</InputRightAddon>
        </InputGroup>

        <Text color='gray'>Referred by (Write NA if Not Applicable)</Text>
        <Input
         {...getFieldProps('referredBy')}
        size='sm'
        border='solid 0.2px black'
        width='250px'
        ></Input>
        
        </>
    )
}

export default Questions;