import React from "react";
import { TableContainer, Table, Thead, Tr, Th, Td, Flex, Tbody, Input, InputLeftElement, InputGroup, Text, HStack, Box, Menu, MenuButton, Button, MenuList, MenuItem} from "@chakra-ui/react";
import { PhoneIcon, Search2Icon, ChevronDownIcon } from "@chakra-ui/icons";


function AllApplicants() {
    const allApplicantsTableHeaders = [
        'Applicant ID', 'Date Submitted', 'Name', 'Position Applied', 'Application Status', 'Offer Status'
    ]
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
                <Tr>
                    {allApplicantsTableHeaders.map(header => {
                        return <Th fontSize='10px'textAlign='center'>{header}</Th>
                    })}
                </Tr>
                </Thead>
                <Tbody>
                <Tr>
                    <Td>
                        <Flex
                        align='center'
                        >
                            Python Coach

                        </Flex>
                    </Td>
                    <Td textAlign='center'>3</Td>
                    <Td textAlign='center'>123</Td>
                    <Td textAlign='center'>40</Td>
                    <Td textAlign='center'>33</Td>
                    <Td textAlign='center'>7</Td>
                </Tr>
                <Tr>
                    <Td>
                        <Flex
                        align='center'
                        >
                            Data Analytics Coach
                        </Flex>
                    </Td>
                    <Td textAlign='center'>3</Td>
                    <Td textAlign='center'>123</Td>
                    <Td textAlign='center'>40</Td>
                    <Td textAlign='center'>33</Td>
                    <Td textAlign='center'>7</Td>
                </Tr>
               
                </Tbody>
            </Table>
        </TableContainer>
       
        </>
    )
}

export default AllApplicants;