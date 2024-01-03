import React from "react";
import AllApplicants from "./applicants-sub-components/AllApplicants";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, Grid, GridItem, Button, VStack} from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";

function Applicants() {
    const applicantsButtons = [
        'All Applicants', 'Review Application', 'Interview Feedback', 'Teaching Demo Feedback', 'Onboarding Requirements', 'Finish Hiring'
    ]
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

                <BreadcrumbItem>
                    <BreadcrumbLink href='#' fontWeight='200'>Applicant ID: 202082</BreadcrumbLink>
                </BreadcrumbItem>
            </Breadcrumb>

           <Grid
           mar
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
                        {applicantsButtons.map(button => {
                            return <Button variant='link'
                            justifyContent='flex-start'
                            fontSize='12px'
                            margin='10px 0px 10px 0px'
                            width='100%'
                            fontWeight='300'
                            >{button}</Button>
                        })}
                        
                    </VStack>
                </GridItem>
                <GridItem pl='2' area={'main'}>
                     <AllApplicants/>
                </GridItem>
            </Grid>
        </>
    )
}

export default Applicants;