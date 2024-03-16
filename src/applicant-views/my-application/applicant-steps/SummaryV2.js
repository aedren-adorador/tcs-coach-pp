import React, { useEffect, useRef, useState } from "react";
import { Box, Button, Stepper, StepIndicator, Step, StepStatus, useSteps, StepNumber, StepIcon, StepTitle, StepDescription, StepSeparator, Input, Text, Flex, useDisclosure, Modal, ModalBody, ModalOverlay, ModalFooter, ModalHeader, ModalContent, ModalCloseButton, Spinner, Card, Heading, CardBody, Stack, Checkbox, InputGroup, InputRightAddon, GridItem, Grid, Accordion, AccordionItem, AccordionButton, AccordionIcon, AccordionPanel } from "@chakra-ui/react";
import { ArrowLeftOutlined, BulbOutlined, CalendarOutlined, DeleteOutlined, FireOutlined, ThunderboltOutlined } from "@ant-design/icons";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Formik, Form, setIn} from "formik";
import axios from "axios";

function SummaryV2() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [isMovingOn, setIsMovingOn] = useState(false);
    const finalRef = useRef(null)
    const steps = [
    { title: 'Step 1', description: 'Personal Info' },
    { title: 'Step 2', description: 'Education' },
    { title: 'Step 3', description: 'Work Experience' },
    { title: 'Step 4', description: 'Questions' },
    { title: 'Step 5', description: 'Summary' },
    ]

    const { activeStep, setActiveStep } = useSteps({
    index: 4,
    count: steps.length,
    })

    const state = useLocation();
    const navigate = useNavigate();
    const applicantData = state.state.applicantData
    const jobData = state.state.jobData.jobData
    const [allDetails, setAllDetails] = useState({});


    
    const handleApplicationSubmit = () => {
        setIsMovingOn(true)
        axios.post(`${process.env.REACT_APP_SYS_URL}/api/applicant/application-stepper-request/save-job-application-progress-questions-info`)
            .then(result => { 
                setTimeout(() => {
                    setIsMovingOn(false)
                    const pathname = `/application-progress/${applicantData._id}/${jobData.jobTitleM}/summary`;
                    const state = { applicantData: applicantData, jobData: {jobData}};
                    navigate(pathname, {state: state})
                }, 1500)
            })
    }
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_SYS_URL}/api/applicant/application-stepper-request/get-updated-details/${encodeURIComponent(JSON.stringify(applicantData))}`)
            .then(response => {
                if (response.data[0]) {
                    setAllDetails(response.data[0])
                }
            })
    }, [])

    useEffect(() => {
        console.log('nice ', allDetails)
    }, [allDetails])
    return (
        <> 
            <Formik
            initialValues={{hey: ''}}
            onSubmit={handleApplicationSubmit}
            enableReinitialize
            >
            {(formikProps) => (
                
            <Form>
            <Box margin='5% 15% 5% 15%'>
                <Link to={`/applicant-home/${applicantData._id}`}>
                <Button
                mb='3'
                size='sm'
                variant='link'
                colorScheme="blackAlpha"
                fontWeight='500'
                >
                    <ArrowLeftOutlined /> 
                    &nbsp;Back to Job Portal
                </Button>
                </Link>
                <Flex
                textAlign='center'
                fontWeight='600'
                mb='20px'
                >{jobData.jobTitleM} Position</Flex>
                <Stepper
                minW='900px'
                index={activeStep}
                colorScheme='facebook'
                >
                {steps.map((step, index) => (
                    <Step key={index}>
                    <StepIndicator >
                        <StepStatus
                        complete={<StepIcon/>}
                        incomplete={<StepNumber />}
                        active={<StepNumber />}
                        />
                    </StepIndicator>

                    <Box flexShrink='0'>
                        <StepTitle>{step.title}</StepTitle>
                        <StepDescription>{step.description}</StepDescription>
                    </Box>

                    <StepSeparator/>
                    </Step>

                ))}
                </Stepper>
                {/* //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}
                {allDetails._id &&
                <Grid
                gridTemplateColumns='repeat(2, 1fr)'
                gap={5}
                minW='1000px'
                >
                    <GridItem
                    >
                        <Flex mb='4'>
                            <Box mr='5'>
                                <Text color='gray'>Last Name</Text>
                                <Text
                                fontSize='30px'
                                fontWeight='600'
                                ></Text>
                            </Box>
                            <Box>
                                <Text color='gray'>First Name</Text>
                                <Text
                                fontSize='30px'
                                fontWeight='600'
                                ></Text>
                            </Box>
                        </Flex>
                        <Text color='gray'>Email Address</Text>
                        <Text mb='4'>{allDetails.emailM}</Text>

                        <Text color='gray'>Contact Number</Text>
                        <Text mb='4'>{allDetails.contactNumberM}</Text>
                        
                        
                        <Text color='gray'>LinkedIn Profile Link</Text>
                        <Text mb='4'>{allDetails.linkedInM}</Text>

                        <Text color='gray'>Internet Speed</Text>
                        <Text mb='4'>{allDetails.internetSpeedM} mbps</Text>

                        <Text color='gray'>Referred by</Text>
                        <Text mb='4'>{allDetails.referredByM}</Text>
                    </GridItem>

                    <GridItem>
                        <Flex mb='4'>
                            <Box mr='5'>
                                <Text color='tcs.linky'>Position Applied To</Text>
                                <Text
                                fontSize='30px'
                                fontWeight='600'
                                color='tcs.linky'
                                ></Text>
                            </Box>
                        </Flex>
                        {/* <Text color='gray'>Resume Attachment</Text>
                        <Link href={allDetails.resumeM} target='_blank'>
                            <Button
                            mb='4'
                            variant='link'
                            color='tcs.linky'
                            >Click to View Resume</Button>
                        </Link> */}
                        <Text color='gray'>Education</Text>
                        {allDetails.educationM && allDetails.educationM.length > 1 ?
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
                                {allDetails.educationM.map((education, index) => (
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
                        >{allDetails.educationM?.university} <br></br>{allDetails.educationM[0].degreeProgram}</Text>
                        }

                        <Text color='gray'>Coaching/Tutoring Experience</Text>
                        {allDetails.coachingExperienceM && allDetails.coachingExperienceM.length > 1 ?
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
                                {allDetails.coachingExperienceM && allDetails.coachingExperienceM.map((coachingExperience, index) => (
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
                        >{allDetails.coachingExperienceM[0]}</Text>
                        }

                        <Text color='gray'>Areas of Expertise</Text>
                        {allDetails.areasOfExpertiseM && allDetails.areasOfExpertiseM.length > 1 ?
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
                                {allDetails.areasOfExpertiseM.map((area, index) => (
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
                        >{allDetails.areasOfExpertise[0]}</Text>
                        }

                        <Text color='gray'>Availability</Text>
                        {allDetails.availabilityM && allDetails.availabilityM.length > 1 ?
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
                                {allDetails.availabilityM.map((availability, index) => (
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
                        >{allDetails.availability[0]}</Text>
                        }
                        
                    </GridItem>
                </Grid> }
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
                    <Text fontSize='30px' ml='30px'>Saving Progress...</Text>
                    </Flex>
                </ModalContent>
                </Modal>
                {/* //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/}
                 <Flex
                bottom={0}
                minW='1000px'
                justify='center'
                mt='20px'
                >
                <Box>
                    <Button
                    size='md'
                    bg='tcs.main'
                    borderRadius='0px'
                    variant='solid'
                    colorScheme="blue"
                    onClick={() => {
                        navigate(-1)
                    }}
                    mr='10'>Back</Button>
                    <Button
                    display={activeStep === 4 ? '' : 'none'}
                    colorScheme="green"
                    bg='tcs.mongo'
                    borderRadius='0px'
                    size='md'
                    variant='solid'
                    onClick={onOpen}
                    >Submit Application</Button> 

                    <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
                        <ModalOverlay />
                        <ModalContent borderRadius='0px'>
                        <ModalBody 
                        fontWeight='300'
                        fontSize='15px'
                        padding='40px 40px 0px 40px'
                        
                        >
                            You are now about to submit your application.
                            Make sure all the details you have inputted are as accurate as possible before confirming.
                        </ModalBody>

                        <ModalFooter>
                            <Button
                            borderRadius='0px'
                            bg='tcs.mongo'
                            color='white'
                            colorScheme='green'
                            mr={3}
                            onClick={() => {
                                const details = {applicantID: applicantData._id, jobID: jobData._id, position: jobData.jobTitleM, currentStep: 'submittedInitialApplication'}
                                axios.post(`${process.env.REACT_APP_SYS_URL}/api/applicant/application-stepper-request/save-job-application-id-to-applicant`, details)
                                    .then(response => {
                                        console.log(response.data.result)
                                        localStorage.removeItem('activeNavButton')
                                        localStorage.setItem('activeNavButton', 'My Application')
                                        navigate(`/applicant-home/${applicantData._id}`)
                                    })
                            }}
                            >
                            Confirm
                            </Button>
                        </ModalFooter>
                        </ModalContent>
                    </Modal>
                    </Box>
                </Flex>
            </Box>
            </Form>
            )}
            </Formik>
        </>
    )
}

export default SummaryV2;