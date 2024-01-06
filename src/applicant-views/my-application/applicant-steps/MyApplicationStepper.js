import React, { useEffect, useState } from "react";
import { Box, Button, Stepper, StepIndicator, Step, StepStatus, useSteps, StepNumber, StepIcon, StepTitle, StepDescription, StepSeparator, Input, Text, Flex } from "@chakra-ui/react";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";
import PersonalInformation from "./PersonalInformation";
import Education from './Education'

function MyApplicationStepper() {
    const navigate = useNavigate();
    const state = useLocation();
    const applicantData = state.state.applicantData
    const jobData = state.state.jobData
    
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
    
    const previousPage = () => {
        navigate(-1);
    }
    return (
        <> 
            <Box margin='5% 15% 5% 15%'>
                <Button
                mb='3'
                size='sm'
                variant='link'
                colorScheme="blackAlpha"
                fontWeight='500'
                onClick={previousPage}
                >
                    <ArrowLeftOutlined /> 
                    &nbsp;Back to Home Screen
                </Button>
                <Flex
                textAlign='center'
                fontWeight='1000'
                mb='20px'
                >{jobData.jobTitleM} Position</Flex>
                <Stepper
                minW='900px'
                index={activeStep}>
                
                {steps.map((step, index) => (
                    <Step key={index}>
                    <StepIndicator>
                        <StepStatus
                        complete={<StepIcon />}
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
                    {activeStep === 1 && <PersonalInformation applicantData={applicantData}/>}
                    {activeStep === 2 && <Education applicantData={applicantData}/>}
                     
                </Box>
                <Flex
                justify='center'
                >
                    {activeStep === 1 ? '' :
                    <Button
                    size='md'
                    bg='#0C3C55'
                    borderRadius='0px'
                    variant='solid'
                    colorScheme="blue"
                    onClick={() => setActiveStep(activeStep-1 < 1 ? 1 : activeStep-1)}
                    mr='10'>Back</Button>
                    }
                    <Button
                    bg='#0C3C55'
                    borderRadius='0px'
                    size='md'
                    variant='solid'
                    colorScheme="blue"
                    onClick={() => setActiveStep(activeStep+1 > steps.length ? steps.length : activeStep+1)}
                    >Save and Continue</Button>
                </Flex>
                
            </Box>
        </>
    )
}

export default MyApplicationStepper;