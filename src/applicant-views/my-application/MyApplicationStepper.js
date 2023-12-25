import React, { useEffect, useState } from "react";
import { Box, Button, Stepper, StepIndicator, Step, StepStatus, useSteps, StepNumber, StepIcon, StepTitle, StepDescription, StepSeparator, Input } from "@chakra-ui/react";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";

function MyApplicationStepper() {
    const navigate = useNavigate();
    const state = useLocation();
    console.log(state.state.applicantData)
    
    const steps = [
    { title: 'Step 1', description: 'Personal Info' },
    { title: 'Step 2', description: 'Work Experience' },
    { title: 'Step 3', description: 'Job-related Qs' },
    { title: 'Step 4', description: 'Summary' },
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
                variant='ghost'
                colorScheme="blackAlpha"
                fontWeight='500'
                onClick={previousPage}
                >
                    <ArrowLeftOutlined /> 
                    &nbsp;Back to Home Screen
                </Button>

                <Stepper index={activeStep}>
                
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
                <Box margin='20px'>
                    <label>Email Address</label>
                      <Input size='md' placeholder=""/>
                </Box>
                <Button
                variant='solid'
                colorScheme="blue"
                onClick={() => setActiveStep(activeStep-1 < 1 ? 1 : activeStep-1)}
                mr='2'>Back</Button>

                <Button
                variant='solid'
                colorScheme="blue"
                onClick={() => setActiveStep(activeStep+1 > steps.length ? steps.length : activeStep+1)}
                >Next</Button>
            </Box>
        </>
    )
}

export default MyApplicationStepper;