import React, { useEffect, useState } from "react";
import { TableContainer, Table, Thead, Tr, Th, Td, Flex, Tbody, Input, InputLeftElement, InputGroup, Text, HStack, Menu, MenuButton, Button, MenuList, MenuItem, Badge} from "@chakra-ui/react";
import { Search2Icon, ChevronDownIcon } from "@chakra-ui/icons";
import axios from "axios";


function AllApplicants({applicants, updateChosenApplicantToReview, handleButtonClick}) {
    const allApplicantsTableHeaders = ['Applicant ID', 'Date Submitted', 'Name', 'Position Applied', 'Application Status', 'Offer Status']
    const [allJobApplications, setAllJobApplications] = useState([]);

    const goToApplicantProgress = (id) => {
      updateChosenApplicantToReview(id);
    }

    useEffect(() => {
        axios.get('http://localhost:3001/api/get-job-applications-joined-with-applicants')
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
                    return <Tr
                    key={index}
                    onClick={()=>goToApplicantProgress(jobApp.applicantJoinedDetails[0]._id)}
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
                            border='solid 0.2px'
                            fontSize='8px'
                            >Submitted Resume Application (to review)</Badge>}
                        </Td>
                        <Td textAlign='center'>
                            {jobApp.currentStepM === 'submittedInitialApplication' && 'NA'}
                        </Td>
                    </Tr>
                })}
    
                </Tbody>
            </Table>
        </TableContainer>
       
        </>
    )
}

export default AllApplicants;