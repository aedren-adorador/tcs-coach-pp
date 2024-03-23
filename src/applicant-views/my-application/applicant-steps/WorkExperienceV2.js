import React, { useEffect, useRef, useState } from "react";
import { Box, Button, Stepper, StepIndicator, Step, StepStatus, useSteps, StepNumber, StepIcon, StepTitle, StepDescription, StepSeparator, Input, Text, Flex, useDisclosure, Modal, ModalBody, ModalOverlay, ModalFooter, ModalHeader, ModalContent, ModalCloseButton, Spinner, Card, Heading, CardBody, Stack } from "@chakra-ui/react";
import { ArrowLeftOutlined, DeleteOutlined } from "@ant-design/icons";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Formik, Form} from "formik";
import axios from "axios";

function WorkExperienceV2() {

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
    index: 2,
    count: steps.length,
    })

    const state = useLocation();
    const navigate = useNavigate();
    const applicantData = state.state.applicantData
    const jobData = state.state.jobData.jobData

    const handleResumeUpload = (e) => {
        console.log(applicantData)
        const uploadedResume = e.target.files[0]
        const resumeField = new FormData();
        resumeField.append('resume', uploadedResume)
        resumeField.append('applicantID', applicantData.applicantIDForeignKeyM)
        resumeField.append('jobID', applicantData.jobIDForeignKeyM)
        axios.post(`${process.env.REACT_APP_SYS_URL}/api/applicant/work-experience-request/upload-resume`, resumeField)
            .then(response => {
                setResumeLink(response.data.url)
                setIsFileAttached(true)
            })
    }

    const [isFileAttached, setIsFileAttached] = useState(false);
    const [resumeLink, setResumeLink] = useState('');
    const [linkedInLink, setLinkedInLink] = useState('');

    useEffect(() => {
    }, [isFileAttached])
    useEffect(() => {
    }, [resumeLink])
    
    const handleApplicationSubmit = () => {
        setIsMovingOn(true)
        axios.post(`${process.env.REACT_APP_SYS_URL}/api/applicant/application-stepper-request/save-job-application-progress-work-info`, {linkedInLink: linkedInLink, applicantData})
            .then(result => {
                setTimeout(() => {
                    setIsMovingOn(false)
                    const pathname = `/application-progress/${applicantData._id}/${jobData.jobTitleM}/questions-info`;
                    const state = { applicantData: applicantData, jobData: {jobData}};
                    navigate(pathname, {state: state})
                }, 1500)
            })
    }
   
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_SYS_URL}/api/applicant/application-stepper-request/get-updated-details-work-part/${encodeURIComponent(JSON.stringify(applicantData))}`)
            .then(response => {
                if (response.data.result[0]){
                    setLinkedInLink(response.data.result[0].linkedInM)
                    if (response.data.result[0].resumeM) {
                        setResumeLink(response.data.url)
                    }
                }
            })
    }, [])

    useEffect(() => {
    }, [linkedInLink, resumeLink])


    

    return (
        <> 
            <Formik
            initialValues={{hey: ''}}
            validate={values => {
                const errors = {};
               
            }}
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
                <Box margin='10px 0px 10px 0px'> 
                    <Text color='gray'>Resume</Text>
                        {resumeLink ?
                        <>
                        <Link to={resumeLink} target='_blank'>
                            <Button
                            variant='link'
                            colorScheme='blue'
                            textDecoration='underline'
                            fontSize='14px'
                            >Resume Saved (Click to View)</Button>
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
                        required
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
                        value={linkedInLink}
                        onChange={(e) => setLinkedInLink(e.target.value)}
                        required
                        size='sm'
                        border='solid 0.2px black'
                        width='400px'
                        mb='20px'
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
                </Box>
                {/* //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/}
                
                <Flex
                mb='50px'
                minW='1000px'
                justify='center'
                >
                    {activeStep === 1 ? '' :
                    <Button
                    size='md'
                    bg='tcs.main'
                    borderRadius='0px'
                    variant='solid'
                    colorScheme="blue"
                    onClick={() => navigate(-1)}
                    mr='10'>Back</Button>
                    }
                    
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

export default WorkExperienceV2;