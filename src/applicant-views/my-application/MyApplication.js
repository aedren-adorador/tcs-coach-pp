import { WarningIcon } from "@chakra-ui/icons";
import { Td, Table, TableContainer, Tr, Th, Tbody, Thead, Button, Badge, Text, Image, Flex, Skeleton, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, VStack, Input, FormLabel, FormHelperText, FormControl, List, ListItem, FormErrorMessage} from "@chakra-ui/react";
import suitcase from '../../admin-views/admin-view-imgs/suitcase.png'
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Form } from "formik";
import ScheduleSelector from "react-schedule-selector";

function MyApplication({applicantData, setObtainedActiveNavButton}) {
    const [schedule, setSchedule] = useState([]);
    
    const handleScheduleChange = (newSchedule) => {
        setSchedule(newSchedule.map(sched =>  (`${sched}`)))
    }
    const navigate = useNavigate();
    const [withdrawValue, setWithdrawValue] = useState('');
    const [isSendingDemoLink, setIsSendingDemoLink] = useState(false);
    const [isSendingReqsLink, setIsSendingReqsLink] = useState(false);
    const [onboardingLink, setOnboardingLink] = useState('');
    const [submittedJobApplicationDetails, setSubmittedJobApplicatioDetails] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isFileTooLarge, setIsFileTooLarge] = useState(false);
    const [isReqsFileTooLarge, setIsReqsFileTooLarge] = useState(false)
    const [demoZip, setDemoZip] = useState(null)
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { isOpen: isOpenInterview, onOpen:onOpenInterview, onClose: onCloseInterview } = useDisclosure()
    const { isOpen: isOpenViewApplication, onOpen:onOpenViewApplication, onClose: onCloseViewApplication } = useDisclosure()
    const { isOpen: isOpenTeachingDemo, onOpen:onOpenTeachingDemo, onClose: onCloseTeachingDemo } = useDisclosure()
    const { isOpen: isOpenOnboardingReqs, onOpen:onOpenOnboardingReqs, onClose: onCloseOnboardingReqs } = useDisclosure()
    const finalRef = useRef(null)

    const redirectToVideoInterview = (jobApplicationID) => {       
        const details = {jobApplicationID: jobApplicationID[0]._id}
        axios.post(`${process.env.REACT_APP_SYS_URL}/api/applicant/video-interview-request/verify-interview-token`, details)
            .then(response => {
                navigate(`/video-interview/introduction`, {state: {applicantData: applicantData, token: response.data.token, submittedJobApplicationDetails: submittedJobApplicationDetails}})
            })
    }

    const handleWithdrawApplication = (jobApplicationID, applicantID) => {
        const details = {jobApplicationID, applicantID}
        axios.post(`${process.env.REACT_APP_SYS_URL}/api/general-request/withdraw-application`, details)
            .then(response => {
                 window.location.reload()
            })
    }

    const handleFileChange = (e) => {
        const maxFileSize = 150 * 1024 * 1024; // 150 MB in bytes
        const file = e.target.files[0];
   
        if (file.size > maxFileSize) {
            e.target.value = ''; // Clear the input
            setIsFileTooLarge(true);
        } else {
            setDemoZip(e.target.files[0])
            setIsFileTooLarge(false);
           
        }
    }

    const handleReqsFileChange = (e) => {
        const maxFileSize = 5 * 1024 * 1024; // 5 MB in bytes
        const file = e.target.files[0];
   
        if (file.size > maxFileSize) {
            e.target.value = ''; // Clear the input
            setIsReqsFileTooLarge(true);
        } else {
            setOnboardingLink(e.target.files[0])
            setIsReqsFileTooLarge(false);
        }
    }
    

    useEffect(() => {
        if (applicantData.jobApplicationsM && applicantData.jobApplicationsM.length !== 0) {
            axios.get(`${process.env.REACT_APP_SYS_URL}/api/applicant/general-request/get-job-application/${applicantData._id}`)
                .then(response => {
                    if (response.data[0]) {
                        setSubmittedJobApplicatioDetails(response.data)
                        setIsLoading(false);
                    } 
                })
        } 
    }, [applicantData])

    useEffect(() => {
    }, [submittedJobApplicationDetails, withdrawValue, demoZip])
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
                {applicantData.jobApplicationsM && applicantData.jobApplicationsM.length !==0 && submittedJobApplicationDetails ?
               
                submittedJobApplicationDetails && submittedJobApplicationDetails.map((i, index) => (

                <Tr >
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
                        >{i[0].positionAppliedToM}</Skeleton>
                    </Td>
                   
                    <Td>
                        <Skeleton
                        isLoaded={!isLoading}
                        height='50px'
                        >
                        {new Date(i[0].dateSubmittedApplicationM).toDateString()}
                        </Skeleton>
                    </Td>
                    <Td>
                        <Skeleton
                        height='50px'
                        isLoaded={!isLoading}
                        >
                        {i[0].currentStepM === 'submittedInitialApplication' &&
                        <Badge
                        bg='tcs.mongo'
                        color='white'
                        fontWeight='500'
                        padding='5px'
                        >Active: Application Received</Badge>}

                        {i[0].currentStepM === 'waitingForInterviewSubmission' &&
                        <Badge
                        bg='tcs.limey'
                        color='black'
                        fontWeight='500'
                        padding='5px'
                        >Active: Waiting for <br></br> Interview Submission</Badge>}

                        {i[0].currentStepM === 'submittedVideoInterview' &&
                        <Badge
                        bg='tcs.limey'
                        color='black'
                        fontWeight='500'
                        padding='5px'
                        >Active: Video Interview <br></br> Under Review</Badge>}

                        {i[0].currentStepM === 'waitingForTeachingDemoSubmission' &&
                        <Badge
                        bg='tcs.limey'
                        color='black'
                        fontWeight='500'
                        padding='5px'
                        >Active: Waiting for <br></br> Teaching Demo Submission</Badge>}

                         {i[0].currentStepM === 'submittedTeachingDemo' &&
                        <Badge
                        bg='tcs.limey'
                        color='black'
                        fontWeight='500'
                        padding='5px'
                        >Active: Teaching Demo <br></br> Under Review</Badge>}

                        {i[0].currentStepM === 'waitingForOnboardingRequirementsSubmission' &&
                        <Badge
                        bg='tcs.limey'
                        color='black'
                        fontWeight='500'
                        padding='5px'
                        >Active: Waiting for Onboarding <br></br> Requirements Submission</Badge>}

                         {i[0].currentStepM === 'submittedOnboardingRequirements' &&
                        <Badge
                        bg='tcs.limey'
                        color='black'
                        fontWeight='500'
                        padding='5px'
                        >Accepted Offer and Submitted <br></br>Onboarding Requirements</Badge>}

                        {i[0].currentStepM === 'finishedHiringApplicant' &&
                        <Badge
                        bg='tcs.limey'
                        color='black'
                        fontWeight='500'
                        padding='5px'
                        >CONGRATULATIONS! <br /> YOU ARE HIRED</Badge>}
                        

                        {i[0].currentStepM === 'rejectedApplicant' &&
                        <Badge
                        colorScheme='red'
                        fontWeight='500'
                        padding='5px'
                        >REJECTED</Badge>}

                        {i[0].currentStepM === 'withdrawnApplication' &&
                        <Badge
                        colorScheme='red'
                        fontWeight='500'
                        padding='5px'
                        >Application Withdrawn</Badge>}
                        </Skeleton>
                    </Td>
                    <Td>
                        <Flex direction='column' gap='2'>
                            <Button size='xs' colorScheme='blue' onClick={onOpenViewApplication}
                            display={i[0].currentStepM === 'finishedHiringApplicant' || i[0].currentStepM ===  'rejectedApplicant' || i[0].currentStepM === 'withdrawnApplication'? 'none': ''}
                            >View Application</Button>
                            <Modal isOpen={isOpenViewApplication} onClose={onCloseViewApplication}>
                                <ModalOverlay />
                                <ModalContent borderRadius='0px' maxW='800px'>
                                <ModalHeader>View Application</ModalHeader>
                                <ModalCloseButton />
                                <ModalBody borderRadius='0'>
                                    <Flex gap='2' mb='2'>
                                        <Text fontWeight='500' color='tcs.mongo'>Job Title:</Text>
                                        <Text>{i[0].positionAppliedToM}</Text>
                                    </Flex>
                                     <Flex gap='2' mb='3'>
                                        <Text fontWeight='500' color='tcs.mongo'>Availabilities:</Text>
                                        <ScheduleSelector
                                            numDays={7}
                                            minTime={9}
                                            maxTime={21}
                                            startDate={new Date('Mon Apr 01 2024 10:00:00 GMT+0800 (Philippine Standard Time)')}
                                            selection={i[0].availabilityM}
                                            dateFormat="ddd"
                                        />
                                    </Flex>
                                    <Flex gap='2' mb='3'>
                                        <Text fontWeight='500' color='tcs.mongo'>Skills:</Text>
                                        {i[0].areasOfExpertiseM && i[0].areasOfExpertiseM?.map((z, index) => {
                                            return <Text mr='1px'>{z},</Text>
                                        })
                                        }
                                    </Flex>
                                   <Flex gap='2'>
                                        <Text fontWeight='500' color='tcs.mongo'>Resume:</Text>
                                            <Link to={i[0].resumeM} target='_blank'>
                                                <Button borderRadius='0px' variant='outline' colorScheme='blue' size='xs'
                                            >View Resume</Button>
                                            </Link>
                                    </Flex>
                                </ModalBody>
                                <ModalFooter>
                                    <Button  colorScheme='blue' mr={3} onClick={() => {
                                        onCloseViewApplication()
                                    }}>
                                    Close
                                    </Button>
                                </ModalFooter>
                                </ModalContent>
                            </Modal>


                            <Button size='xs' colorScheme='red' variant='outline' onClick={() => {
                                onOpen()
                                setWithdrawValue(i[0]._id)
                            }}
                            display={i[0].currentStepM === 'submittedOnboardingRequirements' || i[0].currentStepM === 'finishedHiringApplicant' || i[0].currentStepM === 'rejectedApplicant' || i[0].currentStepM === 'withdrawnApplication' ? 'none': ''}
                            >Withdraw Application</Button>
                            <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
                                <ModalOverlay />
                                <ModalContent borderRadius='0px'>
                                <ModalHeader>Withdraw Application Confirmation</ModalHeader>
                                <ModalCloseButton />
                                <ModalBody borderRadius='0'>
                                    Are you sure you are withdrawing your application? This action cannot be undone. 
                                </ModalBody>
                                <ModalFooter>
                                    <Button colorScheme='blue' mr={3} onClick={() => {
                                        onClose()
                                    }}>
                                    Cancel
                                    </Button>
                                    <Button variant='ghost' colorScheme='red' onClick={() => {
                                        onClose()
                                        handleWithdrawApplication(withdrawValue)
                                    }}>Withdraw</Button>
                                </ModalFooter>
                                </ModalContent>
                            </Modal>
                        </Flex>
                        
                    </Td>
                </Tr>
                ))
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
                    <Th>Position Applied To</Th>
                    <Th>Task Name</Th>
                    <Th>Deadline</Th>
                    <Th>Action</Th>
                </Tr>
                </Thead>
                <Tbody>
                {applicantData.jobApplicationsM && applicantData.jobApplicationsM.length !== 0 && submittedJobApplicationDetails ? (
                submittedJobApplicationDetails.map((i, index) => (
                    (i[0].currentStepM !== 'withdrawnApplication' && i[0].currentStepM !== 'finishedHiringApplicant') && (
                    <Tr key={index}>
                    <Td textAlign='center'>
                        <WarningIcon style={{ fontSize: '45px', color: 'red' }} />
                    </Td>
                    <Td>{i[0].positionAppliedToM}</Td>
                    <Td>
                        {i[0].currentStepM === '' && '—'}
                        {i[0].currentStepM === 'submittedInitialApplication' && <Text>No tasks yet</Text>}
                        {i[0].currentStepM === 'waitingForInterviewSubmission' && 'Take Asynchronous Video Interview'}
                        {i[0].currentStepM === 'submittedVideoInterview' && <Text>No tasks yet</Text>}
                        {i[0].currentStepM === 'waitingForTeachingDemoSubmission' && 'Submit Teaching Demo Link'}
                        {i[0].currentStepM === 'submittedTeachingDemo' && <Text>No tasks yet</Text>}
                        {i[0].currentStepM === 'waitingForOnboardingRequirementsSubmission' && `Submit Onboarding Requirements`}
                        {i[0].currentStepM === 'submittedOnboardingRequirements' && <Text>No tasks yet</Text>}
                    </Td>
                    <Td>
                        {i[0].currentStepM === '' && '—'}
                        {i[0].currentStepM === 'submittedInitialApplication' && '—'}
                        {i[0].currentStepM === 'waitingForInterviewSubmission' && new Date(i[0].deadlineDateInterviewM).toDateString()}
                        {i[0].currentStepM === 'submittedVideoInterview' && '—'}
                        {i[0].currentStepM === 'waitingForTeachingDemoSubmission' &&
                        <>
                        <Text fontSize='12px'>Please submit as soon as you can <br/> as we review applicants on a rolling <br/>basis.</Text>
                        </>
                        }
                        {i[0].currentStepM === 'submittedTeachingDemo' && '—'}
                        {i[0].currentStepM === 'waitingForOnboardingRequirementsSubmission' && 
                        <>
                        <Text fontSize='12px'>Please submit as soon as you can so we<br></br> can process your employe details faster <br></br></Text>
                        </>
                        }
                        {i[0].currentStepM === 'submittedOnboardingRequirements' && '—'}

                    </Td>
                    <Td>
                        {i[0].currentStepM === '' && '—'}
                        {i[0].currentStepM === 'submittedInitialApplication' && '—'}
                        {i[0].currentStepM === 'waitingForInterviewSubmission' && (
                        <Button
                            onClick={onOpenInterview}
                            colorScheme="green"
                            size='sm'
                        >
                            Take Video Interview
                        </Button>
                        )}
                        {i[0].currentStepM === 'submittedVideoInterview' && '—'}
                        {i[0].currentStepM === 'waitingForTeachingDemoSubmission' && (
                            <>
                            <FormControl mb='2'>
                            <FormHelperText size='sm'>Attach Teaching Demo Zip File</FormHelperText>
                            <Input
                            accept='.zip'
                            mt='10px'
                            border='none'
                            size='xs'
                            type='file'
                            onChange={(e) => handleFileChange(e)}
                            >
                            </Input>
                            {isFileTooLarge && <Text color='red' ml='10px' mt='5px' fontSize='12px'>File too large. (max 150mb)</Text>}
                            

                             <Modal isOpen={isOpenTeachingDemo} onClose={onCloseTeachingDemo}>
                                <ModalOverlay />
                                <ModalContent>
                                <ModalHeader fontWeight='700'>Teaching Demo Submission</ModalHeader>
                                <ModalCloseButton />
                                <ModalBody fontWeight='300' fontSize='14px'>
                                    Are you sure you want to submit this teaching demo file?
                                </ModalBody>

                                <ModalFooter>
                                    <Button
                                    colorScheme='red'
                                    mr={3} onClick={onCloseTeachingDemo}
                                    >
                                    Cancel
                                    </Button>
                                    <Button
                                    
                                    onClick={() => {
                                        onCloseTeachingDemo()
                                        setIsSendingDemoLink(true)
                                        const demoForm = new FormData();
                                        demoForm.append('demoZip', demoZip);
                                        demoForm.append('applicantID', i[0].applicantIDForeignKeyM)
                                        demoForm.append('jobID', i[0].jobIDForeignKeyM)
                                       axios.post(`${process.env.REACT_APP_SYS_URL}/api/applicant/demo-request/submit-demo-link`, demoForm, {
                                            headers: {
                                                'Content-Type': 'multipart/form-data' // Adjust content type if needed
                                            }
                                        })
                                        .then(response => {
                                            setIsSendingDemoLink(false)
                                            window.location.reload()
                                        })
                                    }}
                                    fontWeight='300'
                                    variant='ghost'
                                    >Confirm</Button>
                                </ModalFooter>
                                </ModalContent>
                            </Modal>
                            </FormControl>
                            <Flex justify='flex-end'>
                            {!isSendingDemoLink && !isFileTooLarge && demoZip && <Button colorScheme='green' size='sm'
                            onClick={() => onOpenTeachingDemo()}
                            >Submit</Button>}
                            {isSendingDemoLink &&  <Button isLoading loadingText='Submitting Demo' size='sm' colorScheme="green"></Button>}
                           
                            </Flex>
                            </>
                        )}
                        {i[0].currentStepM === 'submittedTeachingDemo' && '—'}

                        {i[0].currentStepM === 'waitingForOnboardingRequirementsSubmission' && (
                            <>
                            <FormControl mb='2'>
                            <FormHelperText>Submit Onboarding Reqs Zip Here</FormHelperText>
    
                            <Input
                            accept='.zip'
                            mt='10px'
                            border='none'
                            size='xs'
                            type='file'
                            onChange={(e) => handleReqsFileChange(e)}
                            >
                            </Input>
                            {isReqsFileTooLarge && <Text color='red' ml='10px' mt='5px' fontSize='12px'>File too large. (max 5 MB)</Text>}

                            <Modal isOpen={isOpenOnboardingReqs} onClose={onCloseOnboardingReqs}>
                                <ModalOverlay />
                                <ModalContent>
                                <ModalHeader fontWeight='700'>Onboarding Reqs Submission</ModalHeader>
                                <ModalCloseButton />
                                <ModalBody fontWeight='300' fontSize='14px'>
                                    Are you sure you want to submit this onboarding requirements link?
                                </ModalBody>

                                <ModalFooter>
                                    <Button
                                    colorScheme='red'
                                    mr={3} onClick={onCloseOnboardingReqs}
                                    >
                                    Cancel
                                    </Button>
                                    <Button
                                    onClick={() => {
                                        onCloseOnboardingReqs()
                                        setIsSendingReqsLink(true)
                                        const onboardingForm = new FormData();
                                        onboardingForm.append('onboardingZip', onboardingLink);
                                        onboardingForm.append('applicantID', i[0].applicantIDForeignKeyM)
                                        onboardingForm.append('jobID', i[0].jobIDForeignKeyM)
                                        axios.post(`${process.env.REACT_APP_SYS_URL}/api/applicant/onboarding-request/submit-onboarding-zip`, onboardingForm, {
                                                headers: {
                                                    'Content-Type': 'multipart/form-data' // Adjust content type if needed
                                                }
                                            })
                                        .then(response => {
                                            setIsSendingDemoLink(false)
                                            window.location.reload()
                                        })
                                    }}
                                    fontWeight='300'
                                    variant='ghost'
                                    >Confirm</Button>
                                </ModalFooter>
                                </ModalContent>
                            </Modal>
                            </FormControl>
                            
                            <Flex justify='flex-end'>
                             {!isSendingReqsLink && !isReqsFileTooLarge && onboardingLink && <Button colorScheme='green' size='sm'
                            onClick={() => onOpenOnboardingReqs()}
                            >Submit</Button>}
                            {isSendingReqsLink &&  <Button isLoading loadingText='Submitting Onboarding Reqs' size='sm' colorScheme="green"></Button>}
                            </Flex>
                            </>
                        )}
                         {i[0].currentStepM === 'submittedOnboardingRequirements' && '—'}
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
                                >
                                Cancel
                                </Button>
                                <Button
                                onClick={()=>redirectToVideoInterview(i)}
                                fontWeight='300'
                                variant='ghost'
                                >Yes, I'm ready.</Button>
                            </ModalFooter>
                            </ModalContent>
                        </Modal>
                    </Td>
                    </Tr>
                    )
                ))
                ) : 
                    <>
                    <Tr>
                        <Td></Td>
                        <Td>No Tasks Yet</Td>
                        <Td>—</Td>
                        <Td>—</Td>
                    </Tr>
                    </>
                    }

                </Tbody>
            </Table>
            </TableContainer>
        </>
    )
}

export default MyApplication;