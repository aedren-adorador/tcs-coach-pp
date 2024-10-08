import { Badge, Box, Button, Card, CardBody, Flex, Grid, GridItem, Input, InputGroup, Link, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Skeleton, Spinner, Table, TableCaption, TableContainer, Tbody, Td, Text, Textarea, Tfoot, Th, Thead, Tr, VStack, useDisclosure } from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { EditIcon } from "@chakra-ui/icons";
import { UserOutlined } from "@ant-design/icons";

function InterviewFeedback(chosenApplicantAllJobApplicationDetails, setChosenApplicantAllJobApplicationDetails) {
    const { isOpen: isOpenRejection, onOpen: onOpenRejection, onClose: onCloseRejection } = useDisclosure()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [isMovingOn, setIsMovingOn] = useState(false);
    const [isSendingDemoInvite, setIsSendingDemoInvite] = useState(false);
    const [isEmailSent, setIsEmailSent] = useState(false);
    const finalRef = useRef(null)
    const [interviewQuestions, setInterviewQuestions] = useState(chosenApplicantAllJobApplicationDetails.chosenApplicantAllJobApplicationDetails.interviewQuestionsM)

    const [interviewCriteriaScores, setInterviewCriteriaScores] = useState({})

    const perfectScore = 5;

    const [clickedVideo, setClickedVideo] = useState(0)
    const [interviewResponsesList, setInterviewResponsesList] = useState([])
    const [isVideoLoading, setIsVideoLoading] = useState(false);
    const [editCriterionScore, setCriterionScore] = useState(false);
    
    useEffect(() => {
    }, [interviewResponsesList])

    useEffect(() => {
        if (interviewResponsesList[clickedVideo]) {
            const videoElement = document.getElementById("interviewVideo");
        videoElement.src = interviewResponsesList[clickedVideo]
        setIsVideoLoading(false)
        }
        
    }, [clickedVideo]); 


    useEffect(() => {
        const details = {
        applicantID: chosenApplicantAllJobApplicationDetails.chosenApplicantAllJobApplicationDetails.applicantJoinedDetails[0]._id,
        questions: chosenApplicantAllJobApplicationDetails.chosenApplicantAllJobApplicationDetails.interviewQuestionsM,
        jobID: chosenApplicantAllJobApplicationDetails.chosenApplicantAllJobApplicationDetails.jobIDForeignKeyM,
        applicantFirstName: chosenApplicantAllJobApplicationDetails.chosenApplicantAllJobApplicationDetails.applicantJoinedDetails[0].firstNameM,
        applicantLastName: chosenApplicantAllJobApplicationDetails.chosenApplicantAllJobApplicationDetails.applicantJoinedDetails[0].lastNameM
        }
        axios.get(`${process.env.REACT_APP_SYS_URL}/api/admin/applicant-screening/get-interview-responses/${encodeURIComponent(JSON.stringify(details))}`)
            .then(response => {
                console.log('gago', response)
                setInterviewResponsesList(response.data)
            })

        const details2 = {applicantID: chosenApplicantAllJobApplicationDetails.chosenApplicantAllJobApplicationDetails._id}
        axios.get(`${process.env.REACT_APP_SYS_URL}/api/admin/applicant-screening/get-applicant-criteria-scores/${encodeURIComponent(JSON.stringify(details2))}`)
            .then(response => {
                setInterviewCriteriaScores(response.data)
            })
    }, [])

    useEffect(() => {
    }, [interviewCriteriaScores])



    return(
        <>
        <Text fontSize='30px' color='black' fontWeight='500' mb='10px'>
        <UserOutlined/>&nbsp;
        {chosenApplicantAllJobApplicationDetails.chosenApplicantAllJobApplicationDetails.applicantJoinedDetails[0].firstNameM}&nbsp;
        {chosenApplicantAllJobApplicationDetails.chosenApplicantAllJobApplicationDetails.applicantJoinedDetails[0].lastNameM}
        </Text>
        <Grid
        minW='1000px'
        minH='400px'
        height='400px'
        templateColumns='repeat(2, 1fr)'
        gap='5'
        >
            <GridItem
            border='solid 0.5px lightgray'
            borderRadius='10px'
            padding='0px 10px 0px 10px'
            >
                <Text
                mt='10px'
                mb='20px'
                fontWeight='600'
                color='black'
                >Interview Questions</Text>
                {interviewQuestions.map((question, index)=> {
                    return <Flex fontSize='12px' gap='1' mb='10px' key={index}  justify='space-around'>
                    <Button
                    height='30px'
                    size='xs'
                    border={index === clickedVideo ? 'solid' : ''}
                    width='50%'
                    _hover={{backgroundColor:'tcs.main', color: 'white'}}
                    onClick={()=>{
                            if (index !== clickedVideo) {
                                 setIsVideoLoading(true) 
                                setTimeout(() => {
                                setClickedVideo(index)
                                }, 1000)
                                }}
                            }
                    >Question {index+1}</Button>
                    <Box width='50%' ml='5px'>{question}</Box>
                    </Flex>
                })}
            </GridItem>
            <Skeleton
            isLoaded={!isVideoLoading}
            >
            <GridItem height='420px'>
                 {interviewResponsesList.length > 0 && interviewResponsesList[clickedVideo] &&
                 <>
                 <video id="interviewVideo" width='500px' controls style={{borderRadius: '10px 10px 10px 10px', height: '100%', width: '100%', backgroundColor: 'black'}}>
                    <source src={interviewResponsesList[clickedVideo]} type="video/webm" />
                </video>
                </>
                }
            </GridItem>
            </Skeleton>
        </Grid>

        <Text
        mt='50px'
        mb='20px'
        fontWeight='600'
        color='black'
        >Interview Feedback Criteria</Text>
        <TableContainer>
        <Table colorScheme='blue'>
            <Thead>
            <Tr>
                <Th>Criterion</Th>
                <Th>Rating</Th>
                <Th>Comments</Th>
            </Tr>
            </Thead>
            <Tbody>
            {interviewCriteriaScores && Object.keys(interviewCriteriaScores).map(criterion => (
                <Tr key={criterion}>
                    <Td>{criterion}</Td>
                    <Td>
                        {editCriterionScore ? (
                            <Select 
                                defaultValue={interviewCriteriaScores[criterion][0].toString()}
                                size='sm' 
                                maxW='60px' 
                                display='inline-block'
                                onChange={(event) => {
                                    const newScore = event.target.value;
                                    // Update interviewCriteriaScores with the new score and existing comment
                                    setInterviewCriteriaScores(prev => ({
                                        ...prev,
                                        [criterion]: [newScore, prev[criterion][1]]
                                    }));
                                }}
                            >
                                <option value='0'>0</option>
                                <option value='1'>1</option>
                                <option value='2'>2</option>
                                <option value='3'>3</option>
                                <option value='4'>4</option>
                                <option value='5'>5</option>
                            </Select>
                        ) : interviewCriteriaScores[criterion][0]}  /5
                        &nbsp;
                        <EditIcon _hover={{color: 'lightblue'}} onClick={()=>setCriterionScore(curr => !curr)}/>
                    </Td>
                    <Td>
                        <Textarea 
                            fontSize='12px'
                            value={interviewCriteriaScores[criterion][1]}
                            onChange={(event) => {
                                const newComment = event.target.value;
                                // Update interviewCriteriaScores with the new comment and existing score
                                setInterviewCriteriaScores(prev => ({
                                    ...prev,
                                    [criterion]: [prev[criterion][0], newComment]
                                }));
                            }}
                        />
                    </Td>
                </Tr>
            ))}
            </Tbody>

        </Table>
        <Flex justify='flex-end'>
            <Button size='md' borderRadius='0px' float='right' mb='30px' colorScheme='blue' mt='5px'
            onClick={() => {
                setIsMovingOn(true)
                axios.post(`${process.env.REACT_APP_SYS_URL}/api/admin/applicant-screening/save-interview-feedback`, {interviewCriteriaScores, chosenApplicantAllJobApplicationDetails})
                    .then(response => {
                        setTimeout(() => {
                            setInterviewCriteriaScores(response.data)
                            setIsMovingOn(false)
                        }, 1500)
                        
                    })
            }}
            >Save Interview Review</Button>

            <Modal isOpen={isMovingOn}>
            <ModalOverlay/>
            <ModalContent zIndex='1' width='100%'>
                <Flex justify='center' margin='10px'>
                    <Spinner
                thickness='4px'
                speed='0.65s'
                emptyColor='gray.200'
                color='blue.500'
                size='xl'
                />
                <Text fontSize='30px' ml='30px'>Saving Feedback...</Text>
                </Flex>
            </ModalContent>
            </Modal>
        </Flex>
        </TableContainer>
        

        
        <Grid
        templateColumns='repeat(1, 1fr)'
        gap={5}
        mb='100px'
        >
            <GridItem
            >
                <Flex
                justify='flex-end'
                direction='row'
                gap={3}
                width='100%'
                align='center'
                >

                   <Modal isOpen={isOpenRejection} onClose={onCloseRejection}>
                        <ModalOverlay />
                        <ModalContent
                        borderRadius='0'
                        maxW='500px'
                        >
                        <ModalHeader>Confirm Rejection Email</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            Are you sure you want to reject this applicant?
                        </ModalBody>

                        <ModalFooter>
                            <Button colorScheme='red' mr={3} onClick={onCloseRejection} borderRadius='0' size='sm' variant='outline'>
                            Cancel
                            </Button>
                            <Button  size='sm' borderRadius='0' colorScheme="red" onClick={() => {
                                onCloseRejection()
                                axios.post(`${process.env.REACT_APP_SYS_URL}/api/admin/applicant-screening/send-rejection-email`, chosenApplicantAllJobApplicationDetails.chosenApplicantAllJobApplicationDetails)
                                    .then(response => window.location.reload())
                            }}>Send Rejection</Button>
                        </ModalFooter>
                        </ModalContent>
                    </Modal>
                   
                    <Button
                    display={chosenApplicantAllJobApplicationDetails.chosenApplicantAllJobApplicationDetails.currentStepM === 'submittedVideoInterview' ? '' : 'none'}
                    size='sm'
                    variant='outline'
                    colorScheme='red'
                    borderRadius='0px'
                    onClick={onOpenRejection}
                    >
                        Send Rejection Email 
                    </Button> 
                   

                    <Badge
                    display={chosenApplicantAllJobApplicationDetails.chosenApplicantAllJobApplicationDetails.currentStepM === 'waitingForTeachingDemoSubmission' ? '' : 'none'}
                    bg='tcs.creamy'
                    padding='5px'
                    fontWeight='500'
                    >Teaching Demo Invite Sent. Waiting for applicant to submit video interview.
                    </Badge>
                     
                  
                    
                    {isSendingDemoInvite ?
                    <Button
                    isLoading
                    loadingText='Sending Teaching Demo Invite'
                    size='sm'
                    bg='tcs.mongo'
                    color='white'
                    colorScheme='green'
                    borderRadius='0px'
                    onClick={onOpen}
                    width='270px'
                    >
                    </Button>:
                    <Button
                    size='sm'
                    display={chosenApplicantAllJobApplicationDetails.chosenApplicantAllJobApplicationDetails.currentStepM === 'submittedVideoInterview' ? '' : 'none'}
                    bg='tcs.mongo'
                    color='white'
                    colorScheme='green'
                    borderRadius='0px'
                    onClick={onOpen}
                    width='270px'
                    >
                        Send Teaching Demo Invite
                    </Button> 
                    }
                     <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
                        <ModalOverlay />
                        <ModalContent
                        borderRadius='0'
                        maxW='500px'
                        >
                        <ModalHeader>Confirm Teaching Demo Invite</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            Are you sure you want to send teaching demo invite?
                        </ModalBody>

                        <ModalFooter>
                            <Button colorScheme='red' mr={3} onClick={onClose} borderRadius='0' size='sm' variant='outline'>
                            Cancel
                            </Button>
                            <Button variant='ghost' size='sm' borderRadius='0' colorScheme="green" onClick={() => {
                                onClose()
                                setIsSendingDemoInvite(true)
                                axios.post(`${process.env.REACT_APP_SYS_URL}/api/admin/applicant-screening/send-demo-invite`, chosenApplicantAllJobApplicationDetails.chosenApplicantAllJobApplicationDetails)
                                    .then(response => {
                                        setIsSendingDemoInvite(false)
                                        setIsEmailSent(true)
                                        window.location.reload()
                                    })
                            }}>Confirm Invite</Button>
                        </ModalFooter>
                        </ModalContent>
                    </Modal>

                </Flex>
            </GridItem>
        </Grid>
        </>
    )
}


export default InterviewFeedback;