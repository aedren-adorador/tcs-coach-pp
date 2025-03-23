import React, { useEffect, useState } from "react";
import { TableContainer, Table, Thead, Tr, Th, Tbody, Td, Text, Image, Flex, HStack, Card, Box, CardBody} from "@chakra-ui/react";
import suitcaseIcon from './admin-view-imgs/suitcase.png'
import axios from "axios";
import reviewApplication from './admin-view-imgs/review-application.png'
import interviewFeedback from './admin-view-imgs/interview-feedback.png'
import teachingDemoFeedback from './admin-view-imgs/teaching-demo-feedback.png'
import preEmploymentRequirements from './admin-view-imgs/pre-employment-requirements.png'

function Dashboard() {
    const [jobs, setJobs] = useState([]);
    const [jobApps, setJobApps] = useState([]);
    const boxesOverview = [
    "Review Application", "Interview Feedback", "Teaching Demo Feedback", "Pre-employment Requirements",
    ];
    const boxesOverviewPics = [
        reviewApplication, interviewFeedback, teachingDemoFeedback, preEmploymentRequirements
    ]

    const requireAttentionHeaders = [
        'Position', 'Applications', 'Interviewed', 'Rejected', 'Withdrawn',  'Offered']

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_SYS_URL}/api/general-request/get-job-stats`)
            .then(response => {
                setJobs(response.data.jobs)
                setJobApps(response.data.jobApplications)
            })
    }, [])

    useEffect(() => {
    }, [jobs, jobApps])


    return(
        <>

        
        <Box>
            <Text
        margin='20px 0px 0px 5%'
        color='#071C50'
        fontWeight='600'
        fontSize='14px'
        >Overview</Text>

        <HStack
        maxW="100%"
        display="flex"
        justify="space-between"
        margin="30px 5% 50px 5%"
        >
            {boxesOverview.map((box, index) => (
            <Card
            key={index}
            height="170px"
            minW="250px"
            maxW="280px"
            position="relative"
            shadow='none'
            backgroundColor='#F3F8FF'
            >
                <Box
                backgroundColor='#F3F8FF'
                border="solid 1px"
                width="90px"
                height="90px"
                position="absolute"
                top="-20px"
                left="-20px"
                display="flex"
                justifyContent="center"
                alignItems="center"
                borderRadius='15px'
                borderColor='lightgray'
                >
                {/* {jobApps} */}
                {box === 'Review Application' && jobApps.filter((application, index) => application.currentStepM === 'submittedInitialApplication').length}
                {box === 'Interview Feedback' && jobApps.filter((application, index) => application.currentStepM === 'submittedVideoInterview').length}
                {box === 'Teaching Demo Feedback' && jobApps.filter((application, index) => application.currentStepM === 'submittedTeachingDemo').length}
                {box === 'Pre-employment Requirements' && jobApps.filter((application, index) => application.currentStepM === 'submittedOnboardingRequirements').length}
                </Box>
                <CardBody>
                    <Image
                    float='right'
                    width='100px'
                    margin='5px'
                    src={boxesOverviewPics[index]}
                    alt={`overview-img-${index+1}`}
                    />
                    <Box
                    position='absolute'
                    bottom='10'
                    fontSize='12px'
                    color='gray'
                    >
                        {box}
                    </Box>
                </CardBody>
            </Card>
            ))}
        </HStack>
        </Box>
        
        <TableContainer
        margin='0px 5% 5%'
        height='300px'
        overflowY='scroll'
        >
            <Table
            variant='simple'
            backgroundColor='#F3F8FF'
            fontSize='12px'
            position='relative'
            
            >
                <Thead>
                <Tr>
                    {requireAttentionHeaders.map((header, index) => {
                        return <Th
                        fontSize='10px'
                        textAlign='center'
                        key={index}
                        position='sticky'
                        top='0'
                        zIndex='1'
                        backgroundColor='#F3F8FF'
                        >{header}</Th>
                    })}
                </Tr>
                </Thead>
                <Tbody>
                
                {jobs && jobs.map((job, index) => (
                <Tr
                key='1'
                _hover={{backgroundColor: 'tcs.bluey'}}
                >
                    <Td>
                        <Flex
                        align='center'
                        >
                            <Image
                            src={suitcaseIcon}
                            alt="suitcaseIcon"
                            display='inline-block'
                            width='40px'
                            marginRight='20px'
                            />
                            {job.jobTitleM}
                        </Flex>
                    </Td>
                    {jobApps && 
                    <Td
                    textAlign='center'
                    >{jobApps.filter((application, index) => application.positionAppliedToM.toString() === job.jobTitleM && application.currentStepM.toString() !== '').length}</Td>}
                    
                    {jobApps &&
                    <Td textAlign='center'
                    >{jobApps.filter((application, index) => application.positionAppliedToM.toString() === job.jobTitleM && application.dateSubmittedInterviewM).length}</Td>}

                    {jobApps &&
                     <Td textAlign='center'>
                        {jobApps.filter((application, index) => application.positionAppliedToM.toString() === job.jobTitleM && application.currentStepM.toString() ==='rejectedApplicant').length}
                     </Td>
                    }
                   {jobApps &&
                   <Td textAlign='center'>
                    {jobApps.filter((application, index) => application.positionAppliedToM.toString() === job.jobTitleM && application.currentStepM.toString() ==='withdrawnApplication').length}
                   </Td>
                   }

                   {jobApps &&
                   <Td textAlign='center'>
                    {jobApps.filter((application, index) => application.positionAppliedToM.toString() === job.jobTitleM && 
                    (
                    application.currentStepM.toString() ==='waitingForOnboardingRequirementsSubmission' ||
                    application.currentStepM.toString() ==='submittedOnboardingRequirements' ||
                    application.currentStepM.toString() ==='finishedHiringApplicant'
                    )
                    ).length}
                   </Td>
                   }
                </Tr>
               ))}
                </Tbody>
            </Table>

                    
        </TableContainer>
        </>
    )
}

export default Dashboard;