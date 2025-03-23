import React, { useEffect, useRef, useState } from "react";
import { Box, Button, Stepper, StepIndicator, Step, StepStatus, useSteps, StepNumber, StepIcon, StepTitle, StepDescription, StepSeparator, Input, Text, Flex, useDisclosure, Modal, ModalBody, ModalOverlay, ModalFooter, ModalHeader, ModalContent, ModalCloseButton, Spinner } from "@chakra-ui/react";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import axios from "axios";

function PersonalInformationV2() {
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
        contactNumber: 0,
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
        setIsMovingOn(true)
        axios.post(`${process.env.REACT_APP_SYS_URL}/api/applicant/application-stepper-request/save-job-application-progress`, applicationDetails)
            .then(result => {
                const modifiedJobApplicationDetails = {};
                    Object.keys(result.data.updatedJobApplication).forEach((key) => {
                    const newKey = key.endsWith('M') ? key.slice(0, -1) : key;
                    modifiedJobApplicationDetails[newKey] = result.data.updatedJobApplication[key];
                    });
                setJobApplicationDetails(modifiedJobApplicationDetails)
                setTimeout(() => {
                    setIsMovingOn(false)
                    const pathname = `/application-progress/${applicantData._id}/${jobData.jobTitleM}/education-info`;
                    const state = { applicantData: result.data.updatedJobApplication, jobData: {jobData} };
                    navigate(pathname, {state: state})
                }, 1500)
                
            })
    }

    useEffect(() => {   
        console.log("WHO")
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
            }}
            validate={values => {
                const errors = {};
                if (!/^\d{4}-\d{2}-\d{2}$/.test(values.birthday)) {
                    errors.birthday = 'Please enter a valid date in the format YYYY-MM-DD';
                }
                if (!/^09\d{9}$/.test(values.contactNumber)) {
                    errors.contactNumber = 'Please enter a valid contact number starting with 09 followed by 9 digits';
                }
                return errors;
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
                    <Text color='gray'>First Name</Text>
                    <Text mb='4'>{applicantData.firstNameM}</Text>

                    <Text color='gray'>Last Name</Text>
                    <Text mb='4'>{applicantData.lastNameM}</Text>

                    <Text color='gray'>Email Address</Text>
                    <Text mb='4'>{applicantData.emailM}</Text>

                    <Text color='gray'>Birthday (YYYY-MM-DD)</Text>
                    {formikProps.errors.birthday && formikProps.touched.birthday && (
                        <Text color="red" fontSize="sm">
                            {formikProps.errors.birthday}
                        </Text>
                    )}
                    <Input
                    {...formikProps.getFieldProps('birthday')}
                    size='sm'
                    border='solid 0.2px black'
                    width='300px'
                    mb='4'
                    required
                    ></Input>
                    
                    
                    <Text color='gray'>Contact Number (09xxxxxxxxx)</Text>
                    {formikProps.errors.contactNumber && formikProps.touched.contactNumber && (
                        <Text color="red" fontSize="sm">
                            {formikProps.errors.contactNumber}
                        </Text>
                    )}
                    <Input
                    required
                    {...formikProps.getFieldProps('contactNumber')}
                    size='sm'
                    border='solid 0.2px black'
                    width='300px'
                     ></Input>

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

export default PersonalInformationV2;