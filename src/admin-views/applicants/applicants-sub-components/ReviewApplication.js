import {Grid, GridItem, Flex, Box, Text, Accordion, AccordionButton, AccordionItem, AccordionIcon, AccordionPanel, Link, Button, Badge} from "@chakra-ui/react";
import { ThunderboltOutlined, BulbOutlined, FireOutlined, CalendarOutlined} from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import axios from "axios";

function ReviewApplication({chosenApplicantAllJobApplicationDetails, setChosenApplicantAllJobApplicationDetails}) {
    useEffect(() => {
    }, [chosenApplicantAllJobApplicationDetails])
    
    const [isSending, setIsSending] = useState(false);

    const sendInterviewInvite = () => {
        setIsSending(true)
        const today = new Date()
        const oneWeekDeadline = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
        const details = {
            oneWeekDeadline: oneWeekDeadline,
            position: chosenApplicantAllJobApplicationDetails.positionAppliedToM,
            emailAddress: chosenApplicantAllJobApplicationDetails.applicantJoinedDetails[0].emailM,
            firstName: chosenApplicantAllJobApplicationDetails.applicantJoinedDetails[0].firstNameM,
            jobApplicationID: chosenApplicantAllJobApplicationDetails._id,
            applicantID: chosenApplicantAllJobApplicationDetails.applicantJoinedDetails[0]._id
        }
        axios.post('http://localhost:3001/api/send-interview-invite', details)
            .then(response => {
                console.log(response.data.joinedApplicantAndJobApplicationDetails[0])
                setChosenApplicantAllJobApplicationDetails(response.data.joinedApplicantAndJobApplicationDetails[0])
                setIsSending(false)
            })
    }

    useEffect(() => {
    }, [chosenApplicantAllJobApplicationDetails])

    
    return(
        <>
        <Grid
        gridTemplateColumns='repeat(2, 1fr)'
        minW='1000px'
        mt='20px'
        fontWeight='300'
        color='black'
        fontSize='14px'
        >
            <GridItem
            >
                <Flex mb='4'>
                    <Box mr='5'>
                        <Text color='gray'>Last Name</Text>
                        <Text
                        fontSize='30px'
                        fontWeight='1000'
                        color='black'
                        >{chosenApplicantAllJobApplicationDetails.applicantJoinedDetails[0].lastNameM}</Text>
                    </Box>
                    <Box>
                        <Text color='gray'>First Name</Text>
                        <Text
                        color='black'
                        fontSize='30px'
                        fontWeight='1000'
                        >
                        {chosenApplicantAllJobApplicationDetails.applicantJoinedDetails[0].firstNameM}
                        </Text>
                    </Box>
                </Flex>
                 <Text color='gray'>Email Address</Text>
                 <Text mb='4'>
                    {chosenApplicantAllJobApplicationDetails.applicantJoinedDetails[0].emailM}
                 </Text>

                 <Text color='gray'>Contact Number</Text>
                 <Text mb='4'>
                    {chosenApplicantAllJobApplicationDetails.contactNumberM}
                 </Text>
                
                
                <Text color='gray'>LinkedIn Profile Link</Text>
                <Text mb='4'>
                    {chosenApplicantAllJobApplicationDetails.linkedInM}
                </Text>

                <Text color='gray'>Internet Speed</Text>
                <Text mb='4'>
                    {chosenApplicantAllJobApplicationDetails.internetSpeedM}
                    mbps
                </Text>

                <Text color='gray'>Referred by</Text>
                 <Text mb='4'>
                    {chosenApplicantAllJobApplicationDetails.referredByM}
                 </Text>
            </GridItem>

            <GridItem>
                <Flex mb='4'>
                    <Box mr='5'>
                        <Text color='tcs.linky'>Position Applied To</Text>
                        <Text
                        fontSize='30px'
                        fontWeight='1000'
                        color='tcs.linky'
                        >
                            {chosenApplicantAllJobApplicationDetails.positionAppliedToM}
                        </Text>
                    </Box>
                </Flex>
                 <Text color='gray'>Resume Attachment</Text>
                 <Link href={chosenApplicantAllJobApplicationDetails.resumeM} target='_blank'>
                     <Button
                    mb='4'
                    variant='link'
                    color='tcs.linky'
                    >TCS-Resume-{chosenApplicantAllJobApplicationDetails.applicantJoinedDetails[0].firstNameM}-{chosenApplicantAllJobApplicationDetails.applicantJoinedDetails[0].lastNameM} (click to view)</Button>
                 </Link>
                
                <Text color='gray'>Education</Text>
                {chosenApplicantAllJobApplicationDetails.educationM.length > 1 ?
                <Accordion mb='4' allowMultiple bg='tcs.dirtywhite'>
                    <AccordionItem>
                        <h2>
                        <AccordionButton>
                            <Box as="span" flex='1' textAlign='left' fontSize='14px'>
                            See Education Summary
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                        </h2>
                        {chosenApplicantAllJobApplicationDetails.educationM.map((education, index) => (
                            <AccordionPanel pb={4} key={index}>
                                <Text fontSize='13px'>
                                <BulbOutlined/> {education.university} - {education.degreeProgram}
                                </Text>
                            </AccordionPanel>
                        ))}
                    </AccordionItem>
                </Accordion> :
                <Text
                mb='4'
                >{chosenApplicantAllJobApplicationDetails.educationM[0].university} <br></br>{chosenApplicantAllJobApplicationDetails.educationM[0].degreeProgram}</Text>
                }

                 <Text color='gray'>Coaching/Tutoring Experience</Text>
                 {chosenApplicantAllJobApplicationDetails.coachingExperienceM.length > 1 ?
                <Accordion mb='4' allowMultiple bg='tcs.dirtywhite'>
                    <AccordionItem>
                        <h2>
                        <AccordionButton>
                            <Box as="span" flex='1' textAlign='left' fontSize='14px'>
                            See Coaching Experience Summary
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                        </h2>
                        {chosenApplicantAllJobApplicationDetails.coachingExperienceM.map((coachingExperience, index) => (
                            <AccordionPanel pb={4} key={index}>
                                <Text fontSize='13px'>
                                <FireOutlined/> {coachingExperience}
                                </Text>
                            </AccordionPanel>
                        ))}
                    </AccordionItem>
                </Accordion> :
                <Text
                mb='4'
                >{chosenApplicantAllJobApplicationDetails.coachingExperienceM[0]}</Text>
                }

                <Text color='gray'>Areas of Expertise</Text>
                {chosenApplicantAllJobApplicationDetails.areasOfExpertiseM.length > 1 ?
                <Accordion mb='4' allowMultiple bg='tcs.dirtywhite'>
                    <AccordionItem>
                        <h2>
                        <AccordionButton>
                            <Box as="span" flex='1' textAlign='left' fontSize='14px'>
                            See Areas of Expertise Summary
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                        </h2>
                        {chosenApplicantAllJobApplicationDetails.areasOfExpertiseM.map((area, index) => (
                            <AccordionPanel pb={4} key={index}>
                                <Text fontSize='13px'>
                                <ThunderboltOutlined/> {area}
                                </Text>
                            </AccordionPanel>
                        ))}
                    </AccordionItem>
                </Accordion> :
                <Text
                mb='4'
                >{chosenApplicantAllJobApplicationDetails.areasOfExpertise[0]}</Text>
                }

                <Text color='gray'>Availability</Text>
                {chosenApplicantAllJobApplicationDetails.availabilityM.length > 1 ?
                <Accordion mb='4' allowMultiple bg='tcs.dirtywhite'>
                    <AccordionItem>
                        <h2>
                        <AccordionButton>
                            <Box as="span" flex='1' textAlign='left' fontSize='14px'>
                            See Availability Summary
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                        </h2>
                        {chosenApplicantAllJobApplicationDetails.availabilityM.map((availability, index) => (
                            <AccordionPanel pb={4} key={index}>
                                <Text fontSize='13px'>
                                <CalendarOutlined/> {availability}
                                </Text>
                            </AccordionPanel>
                        ))}
                    </AccordionItem>
                </Accordion> :
                <Text
                mb='4'
                >{chosenApplicantAllJobApplicationDetails.availabilityM[0]}</Text>
                }
                
            </GridItem>
        </Grid>
        <Flex
            justify='flex-end'
            minW='100vh'
            gap='5'
            mb='20px'
            >
                {chosenApplicantAllJobApplicationDetails.currentStepM === 'waitingForInterviewSubmission' &&
                <Badge
                bg='tcs.mongo'
                color='white'
                padding='5px'
                >Interview Invite Sent. Waiting for applicant to submit asynchronous interview.
                </Badge>}

                <Button
                size='sm'
                variant='outline'
                colorScheme='red'
                display={chosenApplicantAllJobApplicationDetails.currentStepM === 'waitingForInterviewSubmission' ? 'none' : ''}
                >
                    Send Rejection Email
                </Button>
                
                {isSending ? 
                <Button
                isLoading
                loadingText='Sending Email'
                size='sm'
                bg='tcs.mongo'
                color='white'
                colorScheme='green'
                onClick={sendInterviewInvite}
                >
                </Button>
                :
                 <Button
                display={chosenApplicantAllJobApplicationDetails.currentStepM === 'waitingForInterviewSubmission' ? 'none' : ''}
                size='sm'
                bg='tcs.mongo'
                color='white'
                colorScheme='green'
                onClick={sendInterviewInvite}
                >
                    Send Interview Invite
                </Button>
                }
               
            </Flex>

        </>
    )
}

export default ReviewApplication;