import React, { useEffect, useState } from "react";
import { Box, Button, Stepper, StepIndicator, Step, StepStatus, useSteps, StepNumber, StepIcon, StepTitle, StepDescription, StepSeparator } from "@chakra-ui/react";

function MyApplications({activeNavButton}) {
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

    

    return (
        <>  
            <Box margin='5% 15% 5% 15%'>
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
                <p>{activeNavButton}</p>
            </Box>
        </>
    )
}

export default MyApplications;