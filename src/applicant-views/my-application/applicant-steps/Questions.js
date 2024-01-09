import { Input, InputGroup, Stack, Checkbox, InputRightAddon, Text } from "@chakra-ui/react";
import React from "react";


function Questions({applicantData, getFieldProps}) {
    const coachingExperience = ['I have coached/tutored professionally', 'I have coached/tutored as an intern', 'I have coached/tutored friends or co-students', 'I have no tutoring experience']
    const areasOfExpertise = ['MERN/MEAN Stack Development','Financial Literacy (Accounting)', 'Data Science (SQL, Python, Excel)', 'Python Programming', 'Machine Learning/Artificial Intelligence', 'Calculus', 'Robotics', 'Cybersecurity']
    const handleClick =() => {
        console.log("WOW")
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
            return <Checkbox colorScheme='facebook' onClick={handleClick}>
                <Text fontSize='14px'>{coachingExperience}</Text>
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
            {areasOfExpertise.map(area => {
                return <Checkbox colorScheme='facebook'>
                <Text fontSize='14px'>{area}</Text>
            </Checkbox>
            })}
        </Stack>

        

        <Text color='gray'>Schedule Availability</Text>
        <Text mb='4'>{applicantData.lastNameM}</Text>

        <Text color='gray'>Internet Speed</Text>
        <InputGroup>
            <Input
            //  {...getFieldProps('birthday')}
            size='sm'
            border='solid 0.2px black'
            width='180px'
            height='35px'
            type='number'
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
        //  {...getFieldProps('birthday')}
        size='sm'
        border='solid 0.2px black'
        width='250px'
        ></Input>
        
        </>
    )
}

export default Questions;