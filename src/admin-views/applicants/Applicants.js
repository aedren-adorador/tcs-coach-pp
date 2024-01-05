import React, { useEffect, useState } from "react";
import AllApplicants from "./applicants-sub-components/AllApplicants";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, Grid, GridItem, Button, VStack} from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import axios from "axios";
import ReviewSubmissionsStepper from "./applicants-sub-components/ReviewSubmissionsStepper";

function Applicants() {
    const [applicantsResult, setApplicantsResult] = useState([]);
    const [chosenApplicantToReview, setChosenApplicantToReview] = useState('');
    const [clickedButton, setClickedButton] = useState('All Applicants');

    const getApplicants = async () => {
        const response = await axios.get('http://localhost:3001/api/get-applicants');
        setApplicantsResult(response.data.applicants)
    }
    const applicantsButtons = [
        'All Applicants', 'Review Application', 'Interview Feedback', 'Teaching Demo Feedback', 'Onboarding Requirements', 'Finish Hiring'
    ]
    
    const handleButtonClick = (index) => {
        if (index===0) {
            setChosenApplicantToReview('');
        }
        setClickedButton(applicantsButtons[index])
    }

    const updateChosenApplicantToReview = (id) => {
        setChosenApplicantToReview(id);
        setClickedButton('Review Application')
    }


    useEffect(() => {
        getApplicants()
    },[])

    useEffect(() => {
        console.log('CHANGED!', chosenApplicantToReview)
    }, [chosenApplicantToReview])

    useEffect(()=> {
        console.log(applicantsResult, 'WOW')
    }, [applicantsResult])

    useEffect(()=> { 
    },[clickedButton])
   

    return(
        <>
            <Breadcrumb
            color='#071C50'
            fontWeight='600'
            fontSize='14px'
            spacing='8px'
            ml='20px'
            separator={<ChevronRightIcon color='gray.500'/>}>
                
                <BreadcrumbItem>
                    <BreadcrumbLink href='#'>Applicants</BreadcrumbLink>
                </BreadcrumbItem>

                {chosenApplicantToReview !== '' ?
                 <BreadcrumbItem>
                    <BreadcrumbLink
                    href=''
                    fontWeight='200'
                    >Applicant ID: {chosenApplicantToReview}</BreadcrumbLink>
                </BreadcrumbItem>:
                ''
                }
            </Breadcrumb>

           <Grid 
           templateAreas={`"nav main"`}
           gridTemplateColumns={'200px 1fr'}
           h='100%'
           color='blackAlpha.700'
           fontWeight='bold'
           margin='0px 20px 0px 20px'
            >
                <GridItem area={'nav'}>
                    <VStack
                    mt='40px'
                    >
                        {
                        clickedButton === 'All Applicants' ?
                        <Button variant='link'
                            justifyContent='flex-start'
                            fontSize='12px'
                            margin='10px 0px 10px 0px'
                            width='100%'
                            fontWeight='600'
                            color='#071C50'
                            key={0}
                            onClick={()=>handleButtonClick(0)}
                            >{clickedButton}</Button> :
                        
                        applicantsButtons.map((button, index) => {
                            return button === clickedButton ?
                            <Button variant='link'
                            justifyContent='flex-start'
                            fontSize='12px'
                            margin='10px 0px 10px 0px'
                            width='100%'
                            fontWeight='600'
                            color='#071C50'
                            key={index}
                            onClick={()=>handleButtonClick(index)}
                            >{button}</Button> :
                            
                            <Button variant='link'
                            justifyContent='flex-start'
                            fontSize='12px'
                            margin='10px 0px 10px 0px'
                            width='100%'
                            fontWeight='300'
                            key={index}
                            onClick={()=>handleButtonClick(index)}
                            >{button}</Button>
                        })}
                    </VStack>
                </GridItem>
                <GridItem pl='2' area={'main'}>
                    {clickedButton === 'All Applicants' ?
                    <AllApplicants
                    applicants={applicantsResult}
                    updateChosenApplicantToReview={updateChosenApplicantToReview}
                    handleButtonClick={handleButtonClick}
                    />:
                    <ReviewSubmissionsStepper
                    clickedButton={clickedButton}
                    />
                    }

                </GridItem>
            </Grid>
        </>
    )
}

export default Applicants;