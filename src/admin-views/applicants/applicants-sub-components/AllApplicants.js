import React, { useEffect, useState } from "react";
import { TableContainer, Table, Thead, Tr, Th, Td, Flex, Tbody, Input, InputLeftElement, InputGroup, Text, HStack, Menu, MenuButton, Button, MenuList, MenuItem, Badge} from "@chakra-ui/react";
import { Search2Icon, ChevronDownIcon } from "@chakra-ui/icons";
import axios from "axios";
import Search from "antd/es/transfer/search";


function AllApplicants({applicants, updateChosenApplicantToReview, handleButtonClick}) {
    const allApplicantsTableHeaders = ['Applicant ID', 'Date Submitted', 'Applicant Name', 'Position Applied', 'Application Status', 'Offer Status']
    const [allJobApplications, setAllJobApplications] = useState([]);
    const [searchApplicantList, setSearchApplicantList] = useState('');

    const goToApplicantProgress = (jobApp) => {
      updateChosenApplicantToReview(jobApp);
     }

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_SYS_URL}/api/admin/applicant-screening/get-job-applications-joined-with-applicants`)
            .then(result => {
                setAllJobApplications(result.data.joinedApplicantAndJobApplicationDetails)
            })
    }, [])

    useEffect(() => {
        console.log(new Date(allJobApplications[0]?.dateSubmittedApplicationM.toString()).toLocaleDateString())
    }, [allJobApplications])

    useEffect(() => {
        if (searchApplicantList === '') {
            axios.get(`${process.env.REACT_APP_SYS_URL}/api/admin/applicant-screening/get-job-applications-joined-with-applicants`)
            .then(result => {
                setAllJobApplications(result.data.joinedApplicantAndJobApplicationDetails)
            })
        }
        setAllJobApplications(prev => {
        return prev.filter((jobApp, index) => {
            const applicant = jobApp.applicantJoinedDetails[0];
            const dateSubmitted = new Date(jobApp.dateSubmittedApplicationM).toLocaleDateString()
            const jobAppID = ('TCS-' + jobApp._id.toString()).toLowerCase()
            return (
                (jobAppID && jobAppID.includes(searchApplicantList.toLowerCase())) ||
                (dateSubmitted && dateSubmitted.toString().includes(searchApplicantList.toLowerCase())) ||
                (applicant && applicant.firstNameM && applicant.firstNameM.toLowerCase().includes(searchApplicantList.toLowerCase())) ||
                (applicant && applicant.lastNameM && applicant.lastNameM.toLowerCase().includes(searchApplicantList.toLowerCase())) ||
                jobApp.positionAppliedToM.toLowerCase().includes(searchApplicantList.toLowerCase()) ||
                (jobApp.currentStepM === 'submittedInitialApplication' && 'Submitted Resume Application (to review)'.toLowerCase().includes(searchApplicantList.toLowerCase())) ||
                (jobApp.currentStepM === 'waitingForVideoInterviewSubmission' && 'Waiting for Interview Submission'.toLowerCase().includes(searchApplicantList.toLowerCase())) ||
                (jobApp.currentStepM === 'submittedVideoInterview' && 'Submitted Video Interview (to review)'.toLowerCase().includes(searchApplicantList.toLowerCase())) ||
                (jobApp.currentStepM === 'waitingForTeachingDemoSubmission' && 'Waiting for Teaching Demo Submission'.toLowerCase().includes(searchApplicantList.toLowerCase())) ||
                (jobApp.currentStepM === 'submittedTeachingDemo' && 'Submitted Teaching Demo (to review)'.toLowerCase().includes(searchApplicantList.toLowerCase())) ||
                (jobApp.currentStepM === 'waitingForOnboardingRequirementsSubmission' && 'Waiting for Onboarding Requirements Submission'.toLowerCase().includes(searchApplicantList.toLowerCase())) ||
                (jobApp.currentStepM === 'submittedOnboardingRequirements' && 'Onboarding Requirements Sent'.toLowerCase().includes(searchApplicantList.toLowerCase())) ||
                (jobApp.currentStepM === 'finishedHiringApplicant' && 'HIRED APPLICANT'.toLowerCase().includes(searchApplicantList.toLowerCase())) ||
                (jobApp.currentStepM === 'rejectedApplicant' && 'REJECTED APPLICANT'.toLowerCase().includes(searchApplicantList.toLowerCase())) ||
                (jobApp.currentStepM === 'withdrawnApplication' && 'APPLICANT WITHDREW'.toLowerCase().includes(searchApplicantList.toLowerCase())) ||
                (jobApp.currentStepM === 'finishedHiringApplicant' && 'Offer Accepted'.toLowerCase().includes(searchApplicantList.toLowerCase())) || 
                (jobApp.currentStepM === 'withdrawnApplication' && 'Not Offered'.toLowerCase().includes(searchApplicantList.toLowerCase()))
            );
        });
    });

    }, [searchApplicantList])
    return(
        <>
        <Flex maxW='500px'>
            <Search value={searchApplicantList} onChange={(e) => setSearchApplicantList(e.target.value)}/>
        </Flex>
        <TableContainer
        border='solid 0.5px black'
        padding='30px 10px'
        mt='20px'   
        >
            <Table
            variant='simple'
            backgroundColor='white'
            fontSize='10px'
            color='black'
            fontWeight='300'
            >
                <Thead>
                <Tr key='tbl-hdrs'>
                    {allApplicantsTableHeaders.map((header, index) => {
                        return <Th fontSize='10px'textAlign='center' key={index}>{header}</Th>
                    })}
                </Tr>
                </Thead>
                <Tbody>
                {allJobApplications.map((jobApp, index) => {
                    if(jobApp.currentStepM){
                    return <Tr
                    key={index}
                    onClick={()=>goToApplicantProgress(jobApp)}
                    _hover={{
                        backgroundColor: "tcs.bluey",
                        color: 'black'
                    }}
                    >
                        <Td>
                            <Flex
                            align='center'
                            >
                                TCS-{jobApp._id}
                            </Flex>
                        </Td>
                        <Td textAlign='center'>{new Date(jobApp.dateSubmittedApplicationM).toLocaleDateString()}</Td>
                       
                        <Td textAlign='center'> {jobApp.applicantJoinedDetails[0].firstNameM} {jobApp.applicantJoinedDetails[0].lastNameM}</Td>
                        <Td textAlign='center'>{jobApp.positionAppliedToM}</Td>
                        <Td textAlign='center'>
                            {jobApp.currentStepM === 'submittedInitialApplication' &&
                            <Badge
                            border='solid 0.2px lightgray'
                            colorScheme='yellow'
                            padding='5px'
                            fontSize='8px'
                            fontWeight='500'
                            >Submitted Resume Application (to review)</Badge>}

                            {jobApp.currentStepM === 'waitingForInterviewSubmission' &&
                            <Badge
                            colorScheme='blue'
                            color='black'
                            padding='5px'
                            border='solid 0.2px lightgray'
                            fontWeight='500'
                            fontSize='8px'
                            >Waiting for Interview Submission</Badge>}

                            {jobApp.currentStepM === 'submittedVideoInterview' &&
                            <Badge
                            colorScheme='yellow'
                            color='black'
                            padding='5px'
                            border='solid 0.2px lightgray'
                            fontSize='8px'
                            fontWeight='500'
                            >Submitted Video Interview (to review)</Badge>}

                            {jobApp.currentStepM === 'waitingForTeachingDemoSubmission' &&
                            <Badge
                            border='solid 0.2px lightgray'
                            colorScheme='blue'
                            color='black'
                            padding='5px'
                            fontSize='8px'
                            fontWeight='500'
                            >Waiting for Teaching Demo Submission</Badge>}

                            {jobApp.currentStepM === 'submittedTeachingDemo' &&
                            <Badge
                            colorScheme='yellow'
                            color='black'
                            padding='5px'
                            border='solid 0.2px lightgray'
                            fontSize='8px'
                            fontWeight='500'
                            >Submitted Teaching Demo (to review)</Badge>}

                            {jobApp.currentStepM === 'waitingForOnboardingRequirementsSubmission' &&
                            <Badge
                            border='solid 0.2px lightgray'
                            colorScheme='blue'
                            color='black'
                            padding='5px'
                            fontSize='8px'
                            fontWeight='500'
                            >Waiting for Onboarding Requirements Submission</Badge>}

                            {jobApp.currentStepM === 'submittedOnboardingRequirements' &&
                            <Badge
                            border='solid 0.2px lightgray'
                            colorScheme='yellow'
                            color='black'
                            padding='5px'
                            fontSize='8px'
                            fontWeight='500'
                            >Onboarding Requirements Sent</Badge>}

                            {jobApp.currentStepM === 'finishedHiringApplicant' &&
                            <Badge
                            border='solid 0.2px lightgray'
                            bg='tcs.limey'
                            padding='5px'
                            fontSize='8px'
                            fontWeight='500'
                            >HIRED APPLICANT</Badge>}

                            {jobApp.currentStepM === 'rejectedApplicant' &&
                            <Badge
                            border='solid 0.2px red'
                            colorScheme='red'
                            padding='5px'
                            fontSize='8px'
                            fontWeight='500'
                            >REJECTED APPLICANT</Badge>}

                            {jobApp.currentStepM === 'withdrawnApplication' &&
                            <Badge
                            border='solid 0.2px red'
                            colorScheme='red'
                            padding='5px'
                            fontSize='8px'
                            fontWeight='500'
                            >APPLICANT WITHDREW</Badge>}

                        </Td>
                        <Td textAlign='center'>
                            {jobApp.currentStepM === 'submittedInitialApplication' && 'NA'}
                            {jobApp.currentStepM === 'waitingForInterviewSubmission' && 'NA'}
                            {jobApp.currentStepM === 'submittedVideoInterview' && 'NA'}
                            {jobApp.currentStepM === 'waitingForTeachingDemoSubmission' && 'NA'}
                            {jobApp.currentStepM === 'submittedTeachingDemo' && 'NA'}
                            {jobApp.currentStepM === 'waitingForOnboardingRequirementsSubmission' && 'Offer Sent'}
                            {jobApp.currentStepM === 'submittedOnboardingRequirements' && 'Offer Accepted'}
                            {jobApp.currentStepM === 'finishedHiringApplicant' && 'Offer Accepted'}
                            {jobApp.currentStepM === 'rejectedApplicant' && 'No Offer'}
                            {jobApp.currentStepM === 'withdrawnApplication' && 'Not Offered'}
                        </Td>
                    </Tr>
                    }
                })} 
    
                </Tbody>
            </Table>
        </TableContainer> 
        </>
    )
}

export default AllApplicants;