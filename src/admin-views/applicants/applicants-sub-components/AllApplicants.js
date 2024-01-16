import React, { useEffect, useState } from "react";
import { TableContainer, Table, Thead, Tr, Th, Td, Flex, Tbody, Input, InputLeftElement, InputGroup, Text, HStack, Menu, MenuButton, Button, MenuList, MenuItem, Badge} from "@chakra-ui/react";
import { Search2Icon, ChevronDownIcon } from "@chakra-ui/icons";
import axios from "axios";


function AllApplicants({applicants, updateChosenApplicantToReview, handleButtonClick}) {
    const allApplicantsTableHeaders = ['Applicant ID', 'Date Submitted', 'Name', 'Position Applied', 'Application Status', 'Offer Status']
    const [allJobApplications, setAllJobApplications] = useState([]);

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
    }, [allJobApplications])
    return(
        <>
        <HStack
        margin='0'
        padding='0'
        mt='40px'
        mb='20px'
        >
            <Flex
            align='center'
            >
                <Text  fontSize='12px'>Show &nbsp;</Text>
                <Menu>
                <MenuButton
                as={Button}
                rightIcon={<ChevronDownIcon />}
                size='xs'
                >
                    10
                </MenuButton>
                <MenuList
                size='xs'
                >
                    <MenuItem>10</MenuItem>
                    <MenuItem>20</MenuItem>
                    <MenuItem>30</MenuItem>
                    <MenuItem>40</MenuItem>
                    <MenuItem>50</MenuItem>
                </MenuList>
                </Menu>
                <Text 
                fontSize='12px'
                mr='20px'
                > &nbsp;entries...</Text>
                  <InputGroup
                    size='xs'
                    width='150px'
                    >    
                        <InputLeftElement pointerEvents='none'>
                            <Search2Icon color='gray.300' />
                        </InputLeftElement>
                        <Input 
                        borderRadius='5px'
                        type='text'
                        placeholder='Search...'
                        />
                    </InputGroup>
            </Flex>
        </HStack>
        
        <TableContainer
        border='solid 0.5px lightgray'
        borderRadius='20px'
        padding='30px 10px'        
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
                        color: 'tcs.main'
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
                            bg='tcs.dirtywhite'
                            padding='5px'
                            fontSize='8px'
                            fontWeight='500'
                            >Submitted Resume Application (to review)</Badge>}

                            {jobApp.currentStepM === 'waitingForInterviewSubmission' &&
                            <Badge
                            bg='tcs.creamy'
                            padding='5px'
                            border='solid 0px'
                            fontWeight='500'
                            fontSize='8px'
                            >Waiting for Interview Submission</Badge>}

                            {jobApp.currentStepM === 'submittedVideoInterview' &&
                            <Badge
                            colorScheme='green'
                            padding='5px'
                            border='solid 0px'
                            fontSize='8px'
                            fontWeight='500'
                            >Submitted Video Interview (to review)</Badge>}
                        </Td>
                        <Td textAlign='center'>
                            {jobApp.currentStepM === 'submittedInitialApplication' && 'NA'}
                            {jobApp.currentStepM === 'waitingForInterviewSubmission' && 'NA'}
                            {jobApp.currentStepM === 'submittedVideoInterview' && 'NA'}
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