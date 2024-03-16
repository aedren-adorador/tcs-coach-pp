import React, { useEffect, useRef, useState } from "react";
import { Box, Button, Stepper, StepIndicator, Step, StepStatus, useSteps, StepNumber, StepIcon, StepTitle, StepDescription, StepSeparator, Input, Text, Flex, useDisclosure, Modal, ModalBody, ModalOverlay, ModalFooter, ModalHeader, ModalContent, ModalCloseButton, Spinner, Card, Heading, CardBody, Stack, Checkbox, InputGroup, InputRightAddon } from "@chakra-ui/react";
import { ArrowLeftOutlined, DeleteOutlined } from "@ant-design/icons";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Formik, Form, setIn} from "formik";
import axios from "axios";

function QuestionsV2() {
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
    index: 3,
    count: steps.length,
    })

    const state = useLocation();
    const navigate = useNavigate();
    const applicantData = state.state.applicantData
    const jobData = state.state.jobData.jobData

    const [internetSpeed, setInternetSpeed] = useState();
    const [referredBy, setReferredBy] = useState();
    
    const handleApplicationSubmit = () => {
        setIsMovingOn(true)
        const details = {checkedCoachingExperience: checkedCoachingExperience, checkedAreasOfExpertise: checkedAreasOfExpertise, checkedAvailabilities: checkedAvailabilities, internetSpeed: internetSpeed, referredBy: referredBy}
        axios.post(`${process.env.REACT_APP_SYS_URL}/api/applicant/application-stepper-request/save-job-application-progress-questions-info`, {details, applicantData})
            .then(result => {
                setTimeout(() => {
                    setIsMovingOn(false)
                    const pathname = `/application-progress/${applicantData._id}/${jobData.jobTitleM}/summary`;
                    const state = { applicantData: applicantData, jobData: {jobData}};
                    navigate(pathname, {state: state})
                }, 1500)
            })
    }

    const coachingExperience = ['I have coached/tutored professionally', 'I have coached/tutored as an intern', 'I have coached/tutored friends or co-students', 'I have no tutoring experience']
    const areasOfExpertise = ['MERN/MEAN Stack Development','Financial Literacy (Accounting)', 'Data Science (SQL, Python, Excel)', 'Python Programming', 'Machine Learning/Artificial Intelligence', 'Calculus', 'Robotics', 'Cybersecurity']

    const availability = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

    const [checkedCoachingExperience, setCheckedCoachingExperience] = useState([]);
    const [checkedAreasOfExpertise, setCheckedAreasOfExpertise] = useState([]);
    const [checkedAvailabilities, setCheckedAvailabilities] = useState([]);

    const handleClickedCoachingExperience =(e) => {
        setCheckedCoachingExperience(prevCoachingExperience => {
            if (prevCoachingExperience.includes(e.target.value) === false && e.target.checked === true) {
                return [...prevCoachingExperience, e.target.value]
            }
            if (e.target.checked === false) {
                return prevCoachingExperience.filter(experience => experience !== e.target.value)
            }
        })
    }

    const handleClickedArea = (e) => {
        setCheckedAreasOfExpertise(prevAreasOfExpertise => {
            if (prevAreasOfExpertise.includes(e.target.value) === false && e.target.checked === true) {
                return [...prevAreasOfExpertise, e.target.value]
            }
            if (e.target.checked === false) {
                return prevAreasOfExpertise.filter(area => area !== e.target.value)
            }
        })
    }

    const handleClickedAvailability = (e) => {
        setCheckedAvailabilities(prevAvailabilities => {
            if (prevAvailabilities.includes(e.target.value) === false && e.target.checked === true) {
                return [...prevAvailabilities, e.target.value]
            }
            if (e.target.checked === false) {
                return prevAvailabilities.filter(availability => availability !== e.target.value)
            }
        })
    }

    useEffect(() => {
    },[checkedCoachingExperience, checkedAreasOfExpertise, checkedAvailabilities])

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_SYS_URL}/api/applicant/application-stepper-request/get-updated-details/${encodeURIComponent(JSON.stringify(applicantData))}`)
            .then(response => {
                if (response.data[0]) {
                    setCheckedCoachingExperience(response.data[0].coachingExperienceM)
                    setCheckedAreasOfExpertise(response.data[0].areasOfExpertiseM)
                    setCheckedAvailabilities(response.data[0].availabilityM)
                    setReferredBy(response.data[0].referredByM)
                    setInternetSpeed(response.data[0].internetSpeedM)
                }
            })
    }, [])

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
                <Text color='gray' mt='20px'>Coaching/Tutoring Experience</Text>
                <Stack mt='1' ml='5' spacing={1} direction='column' mb='4'>
                    {coachingExperience.map((coachingExperience, index) => {
                        return (
                            <Checkbox
                                key={index}
                                colorScheme='facebook'
                                value={coachingExperience}
                                onChange={handleClickedCoachingExperience}
                                isChecked={checkedCoachingExperience.includes(coachingExperience)}
                            >
                                <Text fontSize='14px' key={index}>{coachingExperience}</Text>
                            </Checkbox>
                        );
                    })}
                </Stack>

                <Text color='gray'>Areas of Expertise</Text>
                <Stack mt='1' ml='5' spacing={1} direction='column' mb='4'>
                    {areasOfExpertise.map((area, index) => {
                        return (
                            <Checkbox
                                key={index}
                                colorScheme='facebook'
                                value={area}
                                onChange={handleClickedArea}
                                isChecked={checkedAreasOfExpertise.includes(area)}
                            >
                                <Text fontSize='14px'>{area}</Text>
                            </Checkbox>
                        );
                    })}
                </Stack>

                <Text color='gray'>Teaching Schedule Availability (Philippine Standard Time)</Text>
                <Stack mt='1' ml='5' spacing={1} direction='row' mb='4' gap='5'>
                    {availability.map((availability, index) => {
                        return (
                            <Checkbox
                                key={index}
                                colorScheme='facebook'
                                value={availability}
                                onChange={handleClickedAvailability}
                                isChecked={checkedAvailabilities.includes(availability)}
                            >
                                <Text fontSize='14px'>{availability}</Text>
                            </Checkbox>
                        );
                    })}
                </Stack>

                <Text color='gray'>Internet Speed</Text>
                <InputGroup>
                    <Input
                    required
                    value={internetSpeed}
                    onChange={(e) => setInternetSpeed(e.target.value.toString())}
                    type='number'
                    size='sm'
                    border='solid 0.2px black'
                    width='180px'
                    height='35px'
                    mb='4'
                    >
                    </Input>
                    <InputRightAddon
                    border='solid tcs.main'
                    size='sm'
                    height='35px'
                    bg='tcs.main'   
                    color='white'         
                    >MBPS</InputRightAddon>
                </InputGroup>

                <Text color='gray'>Referred by (Write NA if Not Applicable)</Text>
                <Input
                value={referredBy}
                onChange={(e) => setReferredBy(e.target.value)}
                size='sm'
                border='solid 0.2px black'
                width='250px'
                required
                ></Input>
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
                mb='20px'
                mt='20px'
                >
                    
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
                    display={activeStep === 4 ? 'none' : ''}
                    type='submit'
                    bg='tcs.main'
                    borderRadius='0px'
                    size='md'
                    variant='solid'
                    colorScheme="blue"
                    >Save and Continue</Button>
                </Flex>
            </Box>
            </Form>
            )}
            </Formik>
        </>
    )
}

export default QuestionsV2;