import { Input, Text } from "@chakra-ui/react";
import React from "react";

function WorkExperience({applicantData, getFieldProps}) {
    const handleResumeUpload = (e) => {
        console.log(e.target.files[0], 'booom')
    }
    return(
        <>
        <Text color='gray'>Resume</Text>
        <Input
        borderRadius='0px'
        type='file'
        width='400px'
        border='0px'
        padding='0px'
        mb='20px'
        onChange={handleResumeUpload}
        ></Input>

        <Text color='gray'>LinkedIn Profile Link</Text>
        <Input
        {...getFieldProps('linkedIn')}
        size='sm'
        border='solid 0.2px black'
        width='300px'
                mb='20px'

        ></Input>
        </>
    )
}

export default WorkExperience;