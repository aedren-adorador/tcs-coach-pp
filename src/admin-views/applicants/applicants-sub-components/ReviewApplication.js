import {Grid, GridItem, Flex, Box, Text, Accordion, AccordionButton, AccordionItem, AccordionIcon, AccordionPanel, Link, Button, Badge, Modal, ModalOverlay, ModalHeader, ModalContent, ModalCloseButton, ModalBody, ModalFooter, useDisclosure, Input, InputGroup, InputLeftAddon, InputRightAddon} from "@chakra-ui/react";
import { ThunderboltOutlined, BulbOutlined, FireOutlined, CalendarOutlined} from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { CloseIcon } from "@chakra-ui/icons";

function ReviewApplication({chosenApplicantAllJobApplicationDetails, setChosenApplicantAllJobApplicationDetails}) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const finalRef = React.useRef(null)
    useEffect(() => {
    }, [chosenApplicantAllJobApplicationDetails])
    
    const [isSending, setIsSending] = useState(false);
    const [questions, setQuestions] = useState(chosenApplicantAllJobApplicationDetails.interviewQuestionsM)

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
            applicantID: chosenApplicantAllJobApplicationDetails.applicantJoinedDetails[0]._id,
            jobQuestions: questions
        }
        axios.post(`${process.env.REACT_APP_SYS_URL}/api/admin/applicant-screening/send-interview-invite`, details)
            .then(response => {
                // console.log(response.data.joinedApplicantAndJobApplicationDetails[0])
                setChosenApplicantAllJobApplicationDetails(response.data.joinedApplicantAndJobApplicationDetails[0])
                setIsSending(false)
            })
    }

    const addQuestion = () => {
        const newQuestions = [...questions, '']
        setQuestions(newQuestions)
    }
    const deleteQuestion = (index) => {
    const newQuestions = questions.filter((_, i) => i !== index);
    setQuestions(newQuestions);
    };

     useEffect(() => {
    }, [chosenApplicantAllJobApplicationDetails])

    useEffect(() => {
        // console.log(questions)
    }, [questions])
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
                        fontWeight='600'
                        color='black'
                        >{chosenApplicantAllJobApplicationDetails.applicantJoinedDetails[0].lastNameM}</Text>
                    </Box>
                    <Box>
                        <Text color='gray'>First Name</Text>
                        <Text
                        color='black'
                        fontSize='30px'
                        fontWeight='600'
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
                        fontWeight='600'
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
                    fontWeight='400'
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
                bg='tcs.creamy'
                padding='5px'
                fontWeight='500'
                >Interview Invite Sent. Waiting for applicant to submit video interview.
                </Badge>}

                <Button
                size='sm'
                variant='outline'
                colorScheme='red'
                borderRadius='0px'
                display={chosenApplicantAllJobApplicationDetails.currentStepM === 'waitingForInterviewSubmission' || chosenApplicantAllJobApplicationDetails.currentStepM ==='submittedVideoInterview' ? 'none' : ''}
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
                display={chosenApplicantAllJobApplicationDetails.currentStepM === 'waitingForInterviewSubmission' || chosenApplicantAllJobApplicationDetails.currentStepM ==='submittedVideoInterview' ? 'none' : ''}
                size='sm'
                bg='tcs.mongo'
                color='white'
                colorScheme='green'
                borderRadius='0px'
                onClick={onOpen}
                >
                    Send Interview Invite
                </Button>
                }
               
            </Flex>
            <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent
                borderRadius='0'
                maxW='600px'
                >
                <ModalHeader>Set Interview Questions</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Flex
                    direction='column'
                    gap='2'
                    >
                    {questions.map((question, index) => (
                        <InputGroup>
                        <InputLeftAddon width='120px'>Question {index+1}</InputLeftAddon>
                        <Input placeholder='Input question here...'
                        onChange={(e) => {
                            const newQuestions = [...questions]
                            newQuestions[index] = e.target.value
                            setQuestions(newQuestions)
                        }}
                        value={questions[index]}
                        ></Input>
                        <Button variant='ghost' size='md' colorScheme="red" ml='2'
                        onClick={()=>deleteQuestion(index)}
                        ><CloseIcon fontSize='10px'></CloseIcon></Button>
                        </InputGroup>
                    ))}
                    </Flex>
                    <Button borderRadius='0' colorScheme="green" mt='2' size='xs' onClick={addQuestion}>+ Add Question</Button>
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme='red' mr={3} onClick={onClose} borderRadius='0' size='sm' variant='outline'>
                    Cancel
                    </Button>
                    <Button variant='ghost' size='sm' borderRadius='0' colorScheme="green" onClick={() => {
                        onClose()
                        sendInterviewInvite()
                    }}>Confirm Invite</Button>
                </ModalFooter>
                </ModalContent>
            </Modal>

        </>
    )
}

export default ReviewApplication;