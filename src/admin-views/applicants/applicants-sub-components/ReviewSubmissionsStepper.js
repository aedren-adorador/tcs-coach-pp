import React, { useEffect } from "react";
import { Step, StepDescription, StepIcon, StepIndicator, StepNumber, StepSeparator, StepStatus, StepTitle, Stepper, useSteps, Box } from '@chakra-ui/react'
import ReviewApplication from "./ReviewApplication";
import InterviewFeedback from "./InterviewFeedback";
import TeachingDemoFeedback from "./TeachingDemoFeedback";
import OnboardingRequirements from "./OnboardingRequirements";

function ReviewSubmissionsStepper({clickedButton, chosenApplicantAllJobApplicationDetails, setChosenApplicantAllJobApplicationDetails}) {   
    const steps = [
    { title: 'Step 1', description: 'Review Application' },
    { title: 'Step 2', description: 'Interview Feedback' },
    { title: 'Step 3', description: 'Teaching Demo Feedback' },
    { title: 'Step 4', description: 'Onboarding Requirements' },
    { title: 'Step 5', description: 'Finish Hiring' },
    ]

    const { activeStep, setActiveStep } = useSteps({
        index: 0,
        count: steps.length,
    })

    useEffect(()=> {
       setActiveStep(steps.findIndex(step => step.description === clickedButton))
    },[clickedButton])

    // useEffect(() => {
    // }, [chosenApplicantAllJobApplicationDetails])

    return(
        <>
        <Stepper
        mb='20px'
        colorScheme='facebook'
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
        {clickedButton === 'Review Application' && <ReviewApplication chosenApplicantAllJobApplicationDetails={chosenApplicantAllJobApplicationDetails} setChosenApplicantAllJobApplicationDetails={setChosenApplicantAllJobApplicationDetails}/>}

        {clickedButton === 'Interview Feedback' && <InterviewFeedback chosenApplicantAllJobApplicationDetails={chosenApplicantAllJobApplicationDetails}/>}
        {clickedButton === 'Teaching Demo Feedback' && <TeachingDemoFeedback chosenApplicantAllJobApplicationDetails={chosenApplicantAllJobApplicationDetails}/>}
        {clickedButton === 'Onboarding Requirements' && <OnboardingRequirements/>}
        </>
    )
}

export default ReviewSubmissionsStepper;