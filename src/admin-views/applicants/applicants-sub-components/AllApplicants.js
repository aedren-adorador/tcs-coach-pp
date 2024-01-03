import React, { useEffect } from "react";
import { TableContainer, Table, Thead, Tr, Th, Td, Flex, Tbody, Input, InputLeftElement, InputGroup, Text, HStack, Menu, MenuButton, Button, MenuList, MenuItem} from "@chakra-ui/react";
import { Search2Icon, ChevronDownIcon } from "@chakra-ui/icons";
import axios from "axios";


function AllApplicants({applicants, updateChosenApplicantToReview, handleButtonClick}) {
    const allApplicantsTableHeaders = [
        'Applicant ID', 'Date Submitted', 'Name', 'Position Applied', 'Application Status', 'Offer Status'
    ]

    const goToApplicantProgress = (id) => {
      updateChosenApplicantToReview(id);
      handleButtonClick('Review Application')
    }
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
        padding='30px 80px'
        >
            <Table
            variant='simple'
            backgroundColor='white'
            fontSize='12px'
            >
                <Thead>
                <Tr key='tbl-hdrs'>
                    {allApplicantsTableHeaders.map((header, index) => {
                        return <Th fontSize='10px'textAlign='center' key={index}>{header}</Th>
                    })}
                </Tr>
                </Thead>
                <Tbody>
                {applicants.map((applicant, index) => {
                    return <Tr
                    onClick={()=>goToApplicantProgress(applicant._id)}
                    _hover={{
                        backgroundColor: "#f2f1f1",
                        color: 'teal'
                    }}
                    >
                        <Td>
                            <Flex
                            align='center'
                            >
                                {applicant.firstNameM} {applicant.lastNameM}
                            </Flex>
                        </Td>
                        <Td textAlign='center'>3</Td>
                        <Td textAlign='center'>123</Td>
                        <Td textAlign='center'>40</Td>
                        <Td textAlign='center'>33</Td>
                        <Td textAlign='center'>7</Td>
                    </Tr>
                })}
    
                </Tbody>
            </Table>
        </TableContainer>
       
        </>
    )
}

export default AllApplicants;