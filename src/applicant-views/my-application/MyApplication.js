import { WarningIcon } from "@chakra-ui/icons";
import { Td, Table, TableContainer, Tr, Th, Tbody, Thead, Button, Badge, Text, Image, Flex, Skeleton, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, VStack} from "@chakra-ui/react";
import suitcase from '../../admin-views/admin-view-imgs/suitcase.png'
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Summary from "./applicant-steps/Summary";

function MyApplication({applicantData, setObtainedActiveNavButton}) {
    const navigate = useNavigate();
    const [submittedJobApplicationDetails, setSubmittedJobApplicatioDetails] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { isOpen: isOpenInterview, onOpen:onOpenInterview, onClose: onCloseInterview } = useDisclosure()
    const { isOpen: isOpenViewApplication, onOpen:onOpenViewApplication, onClose: onCloseViewApplication } = useDisclosure()
    const finalRef = useRef(null)

    const redirectToVideoInterview = () => {
        if (applicantData.jobApplicationsM.length === 1) {
            const details = {jobApplicationID: applicantData.jobApplicationsM[0]}
            axios.post(`${process.env.REACT_APP_SYS_URL}/api/applicant/video-interview-request/verify-interview-token`, details)
                .then(response => {
                    navigate(`/video-interview/introduction`, {state: {applicantData: applicantData, token: response.data.token, submittedJobApplicationDetails: submittedJobApplicationDetails}})
                })
        }
    }

    const handleWithdrawApplication = (jobApplicationID, applicantID) => {
        const details = {jobApplicationID, applicantID}
        axios.post(`${process.env.REACT_APP_SYS_URL}/api/general-request/withdraw-application`, details)
            .then(response => {
                 window.location.reload()
            })
       
    }

    useEffect(() => {
        if (applicantData.jobApplicationsM && applicantData.jobApplicationsM.length !== 0) {
            axios.get(`${process.env.REACT_APP_SYS_URL}/api/applicant/general-request/get-job-application/${applicantData.jobApplicationsM}`)
                .then(response => {
                    setSubmittedJobApplicatioDetails(response.data.submittedApplicationDetails)
                    setIsLoading(false);
                })
        } 
    }, [applicantData])

    useEffect(() => {
    }, [submittedJobApplicationDetails])
    return (
        <> 
            <TableContainer
            minW='900px'
            margin='20px 5% 20px 5%'
            >
            <Text
            fontSize='sm'
            fontWeight='300'
            mb='20px'
            >Hello, {applicantData.firstNameM}.</Text>
            <Text
            fontWeight='600'
            >My Application</Text>
            <Table
            size='sm'
            variant='simple'
            backgroundColor='#F3F8FF'
            layout='fixed'
            >
                <Thead>
                <Tr>
                    <Th width='150px'></Th>
                    <Th>Position Applied To</Th>
                    <Th>Application Date</Th>
                    <Th>Application Status</Th>
                    <Th>Action</Th>
                </Tr>
                </Thead>
                <Tbody>
                {applicantData.jobApplicationsM && applicantData.jobApplicationsM.length !==0 ?
               
                <Tr>
                     
                    <Td textAlign='center'>
                        <Flex
                        justify='center'
                        align='center'
                        >
                            <Image
                            src={suitcase}
                            width='60px'
                            
                            ></Image>
                        </Flex>
                    </Td>
                    
                    <Td>
                        <Skeleton
                        height='50px'
                        isLoaded={!isLoading}
                        >{submittedJobApplicationDetails.positionAppliedToM}</Skeleton>
                    </Td>
                   
                    <Td>
                        <Skeleton
                        isLoaded={!isLoading}
                        height='50px'
                        >
                        {new Date(submittedJobApplicationDetails.dateSubmittedApplicationM).toDateString()}
                        </Skeleton>
                    </Td>
                    <Td>
                        <Skeleton
                        height='50px'
                        isLoaded={!isLoading}
                        >
                        {submittedJobApplicationDetails.currentStepM === 'submittedInitialApplication' &&
                        <Badge
                        bg='tcs.mongo'
                        color='white'
                        fontWeight='500'
                        padding='5px'
                        >Active: Application Received</Badge>}

                        {submittedJobApplicationDetails.currentStepM === 'waitingForInterviewSubmission' &&
                        <Badge
                        bg='tcs.limey'
                        color='black'
                        fontWeight='500'
                        padding='5px'
                        >Active: Waiting for <br></br> Interview Submission</Badge>}

                        {submittedJobApplicationDetails.currentStepM === 'submittedVideoInterview' &&
                        <Badge
                        bg='tcs.limey'
                        color='black'
                        fontWeight='500'
                        padding='5px'
                        >Active: Video Interview <br></br> Under Review</Badge>}
                        </Skeleton>
                    </Td>
                    <Td>
                        <Flex direction='column' gap='2'>
                            <Button size='xs' borderRadius='0px' colorScheme='blue' onClick={onOpenViewApplication}>View Application </Button>
                            <Modal isOpen={isOpenViewApplication} onClose={onCloseViewApplication}>
                                <ModalOverlay />
                                <ModalContent borderRadius='0px' maxW='800px'>
                                <ModalHeader>View Application</ModalHeader>
                                <ModalCloseButton />
                                <ModalBody borderRadius='0'>
                                    <Flex gap='2' mb='2'>
                                        <Text fontWeight='500' color='tcs.mongo'>Job Title:</Text>
                                        <Text>{submittedJobApplicationDetails.positionAppliedToM}</Text>
                                    </Flex>
                                     <Flex gap='2' mb='3'>
                                        <Text fontWeight='500' color='tcs.mongo'>Availabilities:</Text>
                                        {submittedJobApplicationDetails.availabilityM && submittedJobApplicationDetails.availabilityM.map((i, index) => {
                                            return <Text mr='1px'>{i}</Text>
                                        })
                                        }
                                    </Flex>
                                    <Flex gap='2' mb='3'>
                                        <Text fontWeight='500' color='tcs.mongo'>Skills:</Text>
                                        {submittedJobApplicationDetails.areasOfExpertiseM && submittedJobApplicationDetails.areasOfExpertiseM.map((i, index) => {
                                            return <Text mr='1px'>{i},</Text>
                                        })
                                        }
                                    </Flex>
                                    <Flex gap='2'>
                                        <Text fontWeight='500' color='tcs.mongo'>Resume:</Text>
                                        <a href={submittedJobApplicationDetails.resumeM} target="_blank" rel='noreferrer'><Button borderRadius='0px' variant='outline' colorScheme='blue' size='xs'>View Resume</Button></a>
                                    </Flex>
                                </ModalBody>
                                <ModalFooter>
                                    <Button borderRadius='0px' colorScheme='blue' mr={3} onClick={() => {
                                        onCloseViewApplication()
                                    }}>
                                    Close
                                    </Button>
                                </ModalFooter>
                                </ModalContent>
                            </Modal>


                            <Button size='xs' colorScheme='red' variant='outline' borderRadius='0px'onClick={onOpen}>Withdraw Application</Button>
                            <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
                                <ModalOverlay />
                                <ModalContent borderRadius='0px'>
                                <ModalHeader>Withdraw Application Confirmation</ModalHeader>
                                <ModalCloseButton />
                                <ModalBody borderRadius='0'>
                                    Are you sure you are withdrawing your application? This action cannot be undone.
                                </ModalBody>
                                <ModalFooter>
                                    <Button borderRadius='0px' colorScheme='blue' mr={3} onClick={() => {
                                        onClose()
                                    }}>
                                    Cancel
                                    </Button>
                                    <Button variant='ghost' colorScheme='red' borderRadius='0px' onClick={() => {
                                        onClose()
                                        handleWithdrawApplication(applicantData.jobApplicationsM[0], applicantData._id)
                                    }}>Withdraw</Button>
                                </ModalFooter>
                                </ModalContent>
                            </Modal>
                        </Flex>
                        
                    </Td>
                </Tr>
                
                
                :
                <Tr>
                    <Td textAlign='center'>
                        <Flex
                        justify='center'
                        align='center'
                        >
                            <Image
                            src={suitcase}
                            width='60px'
                            
                            ></Image>
                        </Flex>
                    </Td>
                    
                    <Td>
                        No Application Yet
                    </Td>
                    <Td>
                        —
                    </Td>
                    <Td>
                        —
                    </Td>
                </Tr>
                }
                
                </Tbody>
            </Table>
            </TableContainer>



            <TableContainer
            minW='900px'
            margin='20px 5% 20px 5%'
            >
            <Text
            fontWeight='600'
            >Pending Tasks</Text>
            <Table
            size='sm'
            layout='fixed'
            variant='simple'
            backgroundColor='#F3F8FF'
            >
                <Thead>
                <Tr>
                    <Th width='150px'></Th>
                    <Th>Task Name</Th>
                    <Th>Deadline</Th>
                    <Th>Action</Th>
                </Tr>
                </Thead>
                <Tbody>
                <Tr>
                    <Td textAlign='center'>
                        <WarningIcon
                        style={{fontSize: '45px', color:'red'}}
                        
                        />
                    </Td>
                    <Td>
                        {submittedJobApplicationDetails.currentStepM === '' && '—'}
                        {submittedJobApplicationDetails.currentStepM === 'submittedInitialApplication' && 'No tasks yet'}
                        {submittedJobApplicationDetails.currentStepM === 'waitingForInterviewSubmission' && 'Take Asynchronous Video Interview'}
                        {submittedJobApplicationDetails.currentStepM === 'submittedVideoInterview' && 'No tasks yet'}
                    </Td>
                    <Td>
                        {submittedJobApplicationDetails.currentStepM === '' && '—'}
                        {submittedJobApplicationDetails.currentStepM === 'submittedInitialApplication' && '—'}
                        {submittedJobApplicationDetails.currentStepM === 'waitingForInterviewSubmission' && new Date(submittedJobApplicationDetails.deadlineDateInterviewM).toDateString()}
                        {submittedJobApplicationDetails.currentStepM === 'submittedVideoInterview' && '—'}

                    </Td>
                    <Td>
                        {submittedJobApplicationDetails.currentStepM === '' && '—'}
                       {submittedJobApplicationDetails.currentStepM === 'submittedInitialApplication' && '—'}
                       {submittedJobApplicationDetails.currentStepM === 'waitingForInterviewSubmission' &&
                       <>
                       <Button
                       onClick={onOpenInterview}
                       bg='tcs.mongo'
                       color='white'
                       colorScheme="green"
                       size='sm'
                       borderRadius='0px'
                       >Take Video Interview</Button>
                       <Modal isOpen={isOpenInterview} onClose={onCloseInterview}>
                            <ModalOverlay />
                            <ModalContent>
                            <ModalHeader fontWeight='700'>Video Interview Confirmation</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody fontWeight='300' fontSize='14px'>
                                Reminder: Once you take the interview, it cannot be undone. Please make sure you are ready before proceeding.
                            </ModalBody>

                            <ModalFooter>
                                <Button
                                colorScheme='red'
                                mr={3} onClick={onCloseInterview}
                                borderRadius='0px'
                                >
                                Cancel
                                </Button>
                                <Button
                                onClick={redirectToVideoInterview}
                                fontWeight='300'
                                variant='ghost'
                                borderRadius='0px'                    
                                >Yes, I'm ready.</Button>
                            </ModalFooter>
                            </ModalContent>
                        </Modal>
                       </>
                      }
                      {submittedJobApplicationDetails.currentStepM === 'submittedVideoInterview' && '—'}
                    </Td>
                </Tr>
                </Tbody>
            </Table>
            </TableContainer>
        </>
    )
}

export default MyApplication;