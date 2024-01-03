import React from "react";
import { Step, StepDescription, StepIcon, StepIndicator, StepNumber, StepSeparator, StepStatus, StepTitle, Stepper, useSteps, Box } from '@chakra-ui/react'
import ReviewApplication from "./ReviewApplication";

function ReviewSubmissionsStepper({clickedButton}) {
    const steps = [
    { title: 'Step 1', description: 'Review Application' },
    { title: 'Step 2', description: 'Interview Feedback' },
    { title: 'Step 3', description: 'Teaching Demo Feedback' },
    { title: 'Step 4', description: 'Onboarding Requirements' },
    { title: 'Step 5', description: 'Finish Hiring' },
    ]

    const { activeStep } = useSteps({
        index: 0,
        count: steps.length,
    })

    return(
        <>
        <Stepper
        index={activeStep}
        size='md'
        mt='40px'
        >
        {steps.map((step, index) => (
            <Step key={index}>
            <StepIndicator>
                <StepStatus
                complete={<StepIcon />}
                incomplete={<StepNumber />}
                active={<StepNumber />}
                />
            </StepIndicator>

            <Box
            flexShrink='0'
            >
                <StepTitle
                fontSize='12px'
                fontWeight='500'
                >{step.title}</StepTitle>
                <StepDescription
                fontSize='12px'
                fontWeight='300'
                >{step.description}</StepDescription>
            </Box>

            <StepSeparator />
            </Step>
        ))}
        </Stepper>
        {clickedButton === 'Review Application' && <ReviewApplication/>}
        </>
    )
}

export default ReviewSubmissionsStepper;