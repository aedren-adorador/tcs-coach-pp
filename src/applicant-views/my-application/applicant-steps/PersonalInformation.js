import { Input, Text} from "@chakra-ui/react";
import React from "react";

function PersonalInformation({applicantData, getFieldProps}) {
    return(
        <>
        <Text color='gray'>First Name</Text>
        <Text mb='4'>{applicantData.firstNameM}</Text>

        <Text color='gray'>Last Name</Text>
        <Text mb='4'>{applicantData.lastNameM}</Text>

        <Text color='gray'>Email Address</Text>
        <Text mb='4'>{applicantData.emailM}</Text>

        <Text color='gray'>Birthday</Text>
         <Input
         {...getFieldProps('birthday')}
        size='sm'
        border='solid 0.2px black'
        width='300px'
        placeholder='YYYY-MM-DD'
        ></Input>
        
        <Text color='gray'>Contact Number</Text>
        <Input
         {...getFieldProps('contactNumber')}
        size='sm'
        border='solid 0.2px black'
        width='300px'
        ></Input>       
        </>
    )
}


export default PersonalInformation;