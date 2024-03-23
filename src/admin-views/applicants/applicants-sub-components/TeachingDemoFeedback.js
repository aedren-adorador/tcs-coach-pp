import { Badge, Box, Button, Card, CardBody, Flex, Grid, GridItem, Input, InputGroup, Link, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Skeleton, Spinner, Table, TableCaption, TableContainer, Tbody, Td, Text, Textarea, Tfoot, Th, Thead, Tr, VStack, useDisclosure } from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { DownloadIcon, EditIcon } from "@chakra-ui/icons";
import { LinkOutlined, UserOutlined } from "@ant-design/icons";

function TeachingDemoFeedback(chosenApplicantAllJobApplicationDetails, setChosenApplicantAllJobApplicationDetails) {
    const { isOpen: isOpenRejection, onOpen: onOpenRejection, onClose: onCloseRejection } = useDisclosure()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [isMovingOn, setIsMovingOn] = useState(false);
    const [isSendingOnboardingRequirementsChecklist, setIsSendingOnboardingRequirementsChecklist] = useState(false);
    const [isOnboardingRequirementsEmailSent, setIsOnboardingRequirementsEmailSent] = useState(false);
    const finalRef = useRef(null)

    const [interviewCriteriaScores, setInterviewCriteriaScores] = useState({})

    const [editCriterionScore, setCriterionScore] = useState(false);

    useEffect(() => {
        const details2 = {applicantID: chosenApplicantAllJobApplicationDetails.chosenApplicantAllJobApplicationDetails._id}
        axios.get(`${process.env.REACT_APP_SYS_URL}/api/admin/applicant-screening/get-applicant-criteria-scores/${encodeURIComponent(JSON.stringify(details2))}`)
            .then(response => {
                setInterviewCriteriaScores(response.data)
            })
        if (chosenApplicantAllJobApplicationDetails.chosenApplicantAllJobApplicationDetails.currentStepM === 'waitingForOnboardingRequirementsSubmission') {
            setIsOnboardingRequirementsEmailSent(true);
        } else {
            setIsOnboardingRequirementsEmailSent(false)
        }
    }, [])

    useEffect(() => {
    }, [interviewCriteriaScores])

    useEffect(() => {
    }, [isOnboardingRequirementsEmailSent, chosenApplicantAllJobApplicationDetails])



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
                    <Link href={chosenApplicantAllJobApplicationDetails.chosenApplicantAllJobApplicationDetails.teachingDemoM} target='_blank'>
                        <Button fontSize='30px' bg='tcs.main' color='white' _hover={{backgroundColor: 'darkblue'}}padding='20px'>
                            
                            Review Teaching Demo Here &nbsp; <DownloadIcon/></Button>
                    </Link>
                </Flex>
                
            </GridItem>
        </Grid>

        <Text
        mb='20px'
        fontWeight='600'
        color='black'
        >Update Feedback</Text>
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
            >Save Review</Button>

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
                    display={chosenApplicantAllJobApplicationDetails.chosenApplicantAllJobApplicationDetails.currentStepM === 'submittedTeachingDemo' ? '' : 'none'}
                    size='sm'
                    variant='outline'
                    colorScheme='red'
                    borderRadius='0px'
                    onClick={onOpenRejection}
                    >
                        Send Rejection Email 
                    </Button>
                    
                   
                    
                    <Badge
                    display={chosenApplicantAllJobApplicationDetails.chosenApplicantAllJobApplicationDetails.currentStepM === 'waitingForOnboardingRequirementsSubmission' ? '' : 'none'}
                    bg='tcs.creamy'
                    padding='5px'
                    fontWeight='500'
                    >Onboarding Requirements Checklist Sent to Applicant.
                    </Badge>
                     
                  
            

                    {isSendingOnboardingRequirementsChecklist ?
                    <Button
                    isLoading
                    loadingText='Sending Onboarding Requirements Checklist'
                    size='sm'
                    bg='tcs.mongo'
                    color='white'
                    colorScheme='green'
                    borderRadius='0px'
                    onClick={onOpen}
                    >
                    </Button>:
                    <Button
                    display={chosenApplicantAllJobApplicationDetails.chosenApplicantAllJobApplicationDetails.currentStepM === 'submittedTeachingDemo' ? '' : 'none'}
                    size='sm'
                    bg='tcs.mongo'
                    color='white'
                    colorScheme='green'
                    borderRadius='0px'
                    onClick={onOpen}
                    >
                       Accept Applicant and Send Onboarding Requirements
                    </Button>
                    }

                     <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
                        <ModalOverlay />
                        <ModalContent
                        borderRadius='0'
                        maxW='500px'
                        >
                        <ModalHeader>Send Onboarding Requirements</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                           Are you sure you want to send onboarding requirements checklist?
                        </ModalBody>

                        <ModalFooter>
                            <Button colorScheme='red' mr={3} onClick={onClose} borderRadius='0' size='sm' variant='outline'>
                            Cancel
                            </Button>
                            <Button variant='ghost' size='sm' borderRadius='0' colorScheme="green" onClick={() => {
                                onClose()
                                setIsSendingOnboardingRequirementsChecklist(true)
                                axios.post(`${process.env.REACT_APP_SYS_URL}/api/admin/applicant-screening/send-onboarding-invite`, chosenApplicantAllJobApplicationDetails.chosenApplicantAllJobApplicationDetails)
                                    .then(response => {
                                        setIsSendingOnboardingRequirementsChecklist(false)
                                        setIsOnboardingRequirementsEmailSent(true)
                                        window.location.reload()
                                    })
                            }}>Confirm</Button>
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