import { Badge, Box, Button, Card, CardBody, Flex, Grid, GridItem, Input, InputGroup, Link, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Skeleton, Spinner, Table, TableCaption, TableContainer, Tbody, Td, Text, Textarea, Tfoot, Th, Thead, Tr, VStack, useDisclosure } from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { EditIcon } from "@chakra-ui/icons";
import { LinkOutlined, UserOutlined } from "@ant-design/icons";

function TeachingDemoFeedback(chosenApplicantAllJobApplicationDetails, setChosenApplicantAllJobApplicationDetails) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [isMovingOn, setIsMovingOn] = useState(false);
    const [isSendingDemoInvite, setIsSendingDemoInvite] = useState(false);
    const [isEmailSent, setIsEmailSent] = useState(false);
    const finalRef = useRef(null)

    const [interviewCriteriaScores, setInterviewCriteriaScores] = useState({})

    const [editCriterionScore, setCriterionScore] = useState(false);


    useEffect(() => {
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
        mb='20px'
        minW='1000px'
        minH='200px'
        height='150px'
        templateColumns='repeat(1, 1fr)'
        gap='5'
        >
            <GridItem border='solid 0.2px lightgray'>
                <Flex justify='center' align='center' height='100%'>
                    <Link href='https://www.youtube.com' target='_blank'>
                        <Button fontSize='30px' bg='tcs.main' color='white' _hover={{backgroundColor: 'darkblue'}}padding='20px'>Review Teaching Demo Link Here &nbsp; <LinkOutlined></LinkOutlined></Button>
                    </Link>
                </Flex>
                
            </GridItem>
        </Grid>

        <Text
        mb='20px'
        fontWeight='600'
        color='black'
        >Update Feedback Criteria</Text>
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
                   
                    {/* <Button
                    display={chosenApplicantAllJobApplicationDetails.chosenApplicantAllJobApplicationDetails.currentStepM !== 'waitingForTeachingDemoSubmission' ? '' : 'none'}
                    size='sm'
                    variant='outline'
                    colorScheme='red'
                    borderRadius='0px'
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
                     
                  
                    <Button
                    size='sm'
                    display={chosenApplicantAllJobApplicationDetails.chosenApplicantAllJobApplicationDetails.currentStepM !== 'waitingForTeachingDemoSubmission' && !isSendingDemoInvite ? '' : 'none'}
                    bg='tcs.mongo'
                    color='white'
                    colorScheme='green'
                    borderRadius='0px'
                    onClick={onOpen}
                    width='270px'
                    >
                        Send Teaching Demo Invite
                    </Button> 
                    {isSendingDemoInvite &&
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
                    </Button>} */}
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


export default TeachingDemoFeedback;