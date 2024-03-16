    import React, { useEffect, useRef, useState } from "react";
    import { Box, Button, Stepper, StepIndicator, Step, StepStatus, useSteps, StepNumber, StepIcon, StepTitle, StepDescription, StepSeparator, Input, Text, Flex, useDisclosure, Modal, ModalBody, ModalOverlay, ModalFooter, ModalHeader, ModalContent, ModalCloseButton, Spinner, Card, Heading, CardBody, Stack } from "@chakra-ui/react";
    import { ArrowLeftOutlined, DeleteOutlined } from "@ant-design/icons";
    import { Link, useLocation, useNavigate } from "react-router-dom";
    import { Formik, Form, ErrorMessage} from "formik";
    import axios from "axios";

    function EducationV2() {

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
        index: 1,
        count: steps.length,
        })

        const state = useLocation();
        const navigate = useNavigate();
        const applicantData = state.state.applicantData
        const jobData = state.state.jobData.jobData
        
        const handleApplicationSubmit = (applicationDetails) => {
            setIsMovingOn(true)
            axios.post(`${process.env.REACT_APP_SYS_URL}/api/applicant/application-stepper-request/save-job-application-progress-education-info`, {applicantData, educationGroup})
                .then(result => {
                    const modifiedJobApplicationDetails = {};
                        Object.keys(result.data.updatedJobApplication).forEach((key) => {
                        const newKey = key.endsWith('M') ? key.slice(0, -1) : key;
                        modifiedJobApplicationDetails[newKey] = result.data.updatedJobApplication[key];
                        });
                    setTimeout(() => {
                        setIsMovingOn(false)
                        const pathname = `/application-progress/${applicantData._id}/${jobData.jobTitleM}/work-info`;
                        const state = { applicantData: applicantData, jobData: {jobData} };
                        navigate(pathname, {state: state})
                    }, 1500)
                })
        }

        const [educationGroup, setEducationGroup] = useState([]);
        const addEducation = () => {setEducationGroup([...educationGroup, { university: '', degreeProgram: '', finishDate: '' }])}

    
        useEffect(() => {
            axios.get(`${process.env.REACT_APP_SYS_URL}/api/applicant/application-stepper-request/get-updated-details/${encodeURIComponent(JSON.stringify(applicantData))}`)
                .then(response => {
                    setEducationGroup(response.data[0].educationM)
                })
        }, [])

        useEffect(() => {
        }, [educationGroup])

        

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
                        {
            educationGroup&& educationGroup.map((_, index) =>
            <Card
            key={index}
            mt='3'
            maxW='600px'
            border='solid 0.2px black'
            >
            
            <Heading size='md' fontWeight='500' margin='20px 0px 0px 20px'>Education {index+1}</Heading>
            <CardBody>
                <Button
                fontSize='12px'
                color='gray'
                size='xs'
                float='right'
                variant='ghost'
                fontWeight='500'
                onClick={()=> {
                    const updatedEducationGroup = educationGroup.filter((_, i) => i !== index);
                    setEducationGroup(updatedEducationGroup);
                }}
                >
                    <DeleteOutlined />&nbsp;
                    Delete Education</Button>
                <Stack spacing='3'>
                <Box>
                    <Text fontSize='xs' color='gray'>University/Institution</Text>
                    <ErrorMessage name={`educationGroup[${index}].university`} className='error-message' />
                    <Input
                    required
                    maxW='350px'
                    size='sm'
                    border='solid 0.2px black'
                    value={educationGroup[index].university}
                    onChange={(e) => {
                        const updatedEducationGroup = [...educationGroup]
                        updatedEducationGroup[index].university = e.target.value;
                        setEducationGroup(updatedEducationGroup);
                    }}
                    
                    
                    ></Input>
                </Box>
                <Box>
                    <Text fontSize='xs' color='gray'>
                    Degree Program
                    </Text>
                    <Input
                    required
                    maxW='350px'
                    size='sm'
                    border='solid 0.2px black'
                    value={educationGroup[index].degreeProgram}
                    onChange={(e) => {
                        const updatedEducationGroup = [...educationGroup]
                        updatedEducationGroup[index].degreeProgram = e.target.value;
                        setEducationGroup(updatedEducationGroup);
                    }}
                    
                    ></Input>
                </Box>
                <Box>
                    <Box fontSize='xs' color='gray'>
                    Date finished / Projected Finish date
                    </Box>
                    <Input
                    required
                    value={educationGroup[index].finishDate}
                    maxW='350px'
                    size='sm'
                    placeholder='format: MM/YYYY'
                    border='solid 0.2px black'
                    onChange={(e) => {
                        const updatedEducationGroup = [...educationGroup]
                        updatedEducationGroup[index].finishDate = e.target.value;
                        setEducationGroup(updatedEducationGroup);
                    }}
                    
                    ></Input>
                </Box>
                </Stack>
            </CardBody>
            </Card>
            
            )}
            <Flex justify='end' mt='4' maxW='600px'>
            <Button
                variant='solid'
                bg='#FFFDD0'
                borderRadius='0px'
                border='solid 0.2px black'
                colorScheme="yellow"
                fontWeight='500'
                size='sm'
                mb='20px'
                onClick={addEducation}
                >+ Add Education</Button>
            </Flex>

                        

                    </Box>
                    
                    <Flex
                    bottom={0}
                    minW='1000px'
                    justify='center'
                    >
                        <Button
                        size='md'
                        bg='tcs.main'
                        borderRadius='0px'
                        variant='solid'
                        colorScheme="blue"
                        onClick={() => navigate(-1)}
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

    export default EducationV2;