import { Button, Input, Text, Link, Flex } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";

function WorkExperience({applicantData, getFieldProps, jobData, jobApplicationDetails}) {

    const handleResumeUpload = (e) => {
        const uploadedResume = e.target.files[0]
        const resumeField = new FormData();
        resumeField.append('resume', uploadedResume)
        resumeField.append('firstName', applicantData.firstNameM)
        resumeField.append('lastName', applicantData.lastNameM)
        resumeField.append('id', applicantData._id)
        resumeField.append('jobID', jobData._id)
        axios.post(`${process.env.REACT_APP_SYS_URL}/api/applicant/work-experience-request/upload-resume`, resumeField)
            .then(result => {
                setResumeLink(result.data.resumeLink)
                setIsFileAttached(true)
            })
    }

    const [isFileAttached, setIsFileAttached] = useState(false);
    const [resumeLink, setResumeLink] = useState('');

    useEffect(() => {
    }, [isFileAttached])
    useEffect(() => {
    }, [resumeLink])

    useEffect(() => {
        const details = {applicantID: applicantData._id, jobID: jobData._id}
        axios.get(`${process.env.REACT_APP_SYS_URL}/api/applicant/work-experience-request/get-job-application-resume/${encodeURIComponent(JSON.stringify(details))}`)
            .then(result => {
                if (result.data.savedResumeLink) {
                    setResumeLink(result.data.savedResumeLink)
                    setIsFileAttached(true)
                }
            })
    }, [])

    return(
        <>
        <Text color='gray'>Resume</Text>
        {isFileAttached ?
        <>
        <Link href={resumeLink} target='_blank'>
            <Button
            variant='link'
            colorScheme='blue'
            textDecoration='underline'
            fontSize='14px'
            >[{jobData.jobTitleM}]-TCS-Resume-{applicantData.firstNameM}-{applicantData.lastNameM}.pdf (click to view)</Button>
        </Link>
        <Flex
        mt='10px'
        height='40px'
        >
            <Text
            fontSize='14px'
            >Choose a different file</Text>
            <Input
            margin='auto'
            align='center'
            ml='10px'
            display='inline-block'
            borderRadius='0px'
            type='file'
            width='150px'
            border='0px'
            padding='0px'
            fontSize='10px'
            onChange={handleResumeUpload}
        ></Input>
        </Flex>
        </> :
        <Input
        borderRadius='0px'
        type='file'
        width='400px'
        border='0px'
        padding='0px'
        mb='20px'
        onChange={handleResumeUpload}
        ></Input>
        }

       

        <Text color='gray' mt='20px'>LinkedIn Profile Link</Text>
        <Input
        {...getFieldProps('linkedIn')}
        size='sm'
        border='solid 0.2px black'
        width='400px'
        mb='20px'
        ></Input>
        </>
    )
}

export default WorkExperience;