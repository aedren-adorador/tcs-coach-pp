import React, { useEffect, useRef, useState } from "react";
import { Box, Button, Stepper, StepIndicator, Step, StepStatus, useSteps, StepNumber, StepIcon, StepTitle, StepDescription, StepSeparator, Input, Text, Flex, useDisclosure, Modal, ModalBody, ModalOverlay, ModalFooter, ModalHeader, ModalContent, ModalCloseButton } from "@chakra-ui/react";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { Link, useLocation, useNavigate } from "react-router-dom";
import PersonalInformation from "./PersonalInformation";
import Education from './Education'
import { Formik, Form } from "formik";
import axios from "axios";
import WorkExperience from "./WorkExperience";
import Questions from "./Questions";
import Summary from "./Summary";

function MyApplicationStepper() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const finalRef = useRef(null)

    const steps = [
    { title: 'Step 1', description: 'Personal Info' },
    { title: 'Step 2', description: 'Education' },
    { title: 'Step 3', description: 'Work Experience' },
    { title: 'Step 4', description: 'Questions' },
    { title: 'Step 5', description: 'Summary' },
    ]

    const { activeStep, setActiveStep } = useSteps({
    index: 0,
    count: steps.length,
    })

    const state = useLocation();
    const navigate = useNavigate();
    const applicantData = state.state.applicantData
    const jobData = state.state.jobData

    const [jobApplicationDetails, setJobApplicationDetails] = useState({
        applicantIDForeignKey : applicantData._id,
        jobIDForeignKey: jobData._id,
        birthday: '',
        education: [],
        resume: '',
        linkedIn: '',
        f2f: '',
        address: '',
        coachingExperience: [],
        areasOfExpertise: [],
        sourceOfInfo: '',
        availability: [],
        internetSpeed: '',
        referredBy: '',
        positionAppliedTo: jobData.jobTitleM,
        currentStep: '',
        dateSubmittedApplication: '',
        dateSubmittedInterview: '',
        dateSubmittedTeachingDemo: '',
        dateSubmittedOnboardingRequirements: '',
        finalVerdict: '',
    })
    
    const handleApplicationSubmit = (applicationDetails) => {
        axios.post(`${process.env.REACT_APP_SYS_URL}/api/applicant/application-stepper-request/save-job-application-progress`, applicationDetails)
            .then(result => {
                const modifiedJobApplicationDetails = {};
                    Object.keys(result.data.updatedJobApplication).forEach((key) => {
                    const newKey = key.endsWith('M') ? key.slice(0, -1) : key;
                    modifiedJobApplicationDetails[newKey] = result.data.updatedJobApplication[key];
                    });
                setJobApplicationDetails(modifiedJobApplicationDetails)
            })
    }

    useEffect(() => {   
    }, [jobApplicationDetails])

    useEffect(() => {
        const verifyDetails = { applicantData, jobData }
        axios.get(`${process.env.REACT_APP_SYS_URL}/api/applicant/application-stepper-request/verify-application-if-continue-or-new/${encodeURIComponent(JSON.stringify(verifyDetails))}`)
             .then(result => {
                const modifiedJobApplicationDetails = {};
                    Object.keys(result.data.jobApplicationSavedDetails).forEach((key) => {
                    const newKey = key.endsWith('M') ? key.slice(0, -1) : key;
                    modifiedJobApplicationDetails[newKey] = result.data.jobApplicationSavedDetails[key];
                    });
                setJobApplicationDetails(modifiedJobApplicationDetails)
            })
    }, [applicantData, jobData])

    useEffect(() => {
        const verifyDetails = { applicantData, jobData }
        axios.get(`${process.env.REACT_APP_SYS_URL}/api/applicant/application-stepper-request/verify-application-if-continue-or-new/${encodeURIComponent(JSON.stringify(verifyDetails))}`)
             .then(result => {
                const modifiedJobApplicationDetails = {};
                    Object.keys(result.data.jobApplicationSavedDetails).forEach((key) => {
                    const newKey = key.endsWith('M') ? key.slice(0, -1) : key;
                    modifiedJobApplicationDetails[newKey] = result.data.jobApplicationSavedDetails[key];
                    });
                setJobApplicationDetails(modifiedJobApplicationDetails)
            })
    }, [])

    return (
        <> 
            <Formik
            initialValues={{
                applicantIDForeignKey: jobApplicationDetails.applicantIDForeignKey || '',
                jobIDForeignKey: jobApplicationDetails.jobIDForeignKey || '',
                contactNumber: jobApplicationDetails.contactNumber || '',
                birthday: jobApplicationDetails.birthday ? jobApplicationDetails.birthday.slice(0, 10) : '',
                education: jobApplicationDetails.education || [],
                resume: jobApplicationDetails.resume || '',
                linkedIn: jobApplicationDetails.linkedIn || '',
                f2f: jobApplicationDetails.f2f || '',
                address: jobApplicationDetails.address || '',
                coachingExperience: jobApplicationDetails.coachingExperience || [],
                areasOfExpertise: jobApplicationDetails.areasOfExpertise || [],
                sourceOfInfo: jobApplicationDetails.sourceOfInfo || '',
                availability: jobApplicationDetails.availability || [],
                internetSpeed: jobApplicationDetails.internetSpeed || '',
                referredBy: jobApplicationDetails.referredBy || '',
                positionAppliedTo: jobApplicationDetails.positionAppliedTo || '',
                currentStep: jobApplicationDetails.currentStep || '',
                dateSubmittedApplication: jobApplicationDetails.dateSubmittedApplication|| '' ,
                dateSubmittedInterview: jobApplicationDetails.dateSubmittedInterview || '',
                dateSubmittedTeachingDemo: jobApplicationDetails.dateSubmittedTeachingDemo || '',
                dateSubmittedOnboardingRequirements: jobApplicationDetails.dateSubmittedOnboardingRequirements || '',
                finalVerdict: jobApplicationDetails.finalVerdict
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
                <Box margin='10px 0px 10px 0px'>
                    {activeStep === 0 &&
                    <PersonalInformation
                    applicantData={applicantData}
                    getFieldProps={formikProps.getFieldProps}
                    jobApplicationDetails={jobApplicationDetails}
                    />}

                    {activeStep === 1 &&
                    <Education
                    setFieldValue={formikProps.setFieldValue}
                    setJobApplicationDetails={setJobApplicationDetails}
                    jobApplicationDetails={jobApplicationDetails}
                    />}

                    {activeStep === 2 &&
                    <WorkExperience
                    applicantData={applicantData}
                    getFieldProps={formikProps.getFieldProps}
                    jobData={jobData}
                    jobApplicationDetails={jobApplicationDetails}
                    />}

                    {activeStep === 3 &&
                    <Questions
                    applicantData={applicantData}
                    getFieldProps={formikProps.getFieldProps}
                    jobApplicationDetails={jobApplicationDetails}
                    setFieldValue={formikProps.setFieldValue}
                    handleApplicationSubmit={handleApplicationSubmit}
                    />}

                    {activeStep === 4 &&
                    <Summary
                    applicantData={applicantData}
                    jobApplicationDetails={jobApplicationDetails}
                    jobData={jobData}
                    />}

                </Box>
                <Flex
                bottom={0}
                minW='1000px'
                justify='center'
                >
                    {activeStep === 0 ? '' :
                    <Button
                    size='md'
                    bg='#0C3C55'
                    borderRadius='0px'
                    variant='solid'
                    colorScheme="blue"
                    onClick={() => setActiveStep(activeStep-1 < 0 ? 0 : activeStep-1)}
                    mr='10'>Back</Button>
                    }
                  
                   
                    <Box>
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
                        <ModalContent>
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
                    
                    <Button
                    display={activeStep === 4 ? 'none' : ''}
                    type='submit'
                    bg='tcs.main'
                    borderRadius='0px'
                    size='md'
                    variant='solid'
                    colorScheme="blue"
                    onClick={()=>setActiveStep(activeStep+1 > steps.length ? steps.length : activeStep+1)}
                    
                    >Save and Continue</Button>
                    
                </Flex>
            </Box>
            </Form>
            )}
            </Formik>
        </>
    )
}

export default MyApplicationStepper;