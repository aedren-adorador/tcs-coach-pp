import React from "react";
import { TableContainer, Table, TableCaption, Thead, Tr, Th, Tbody, Td, Tfoot, Text, Image, Flex} from "@chakra-ui/react";
import suitcaseIcon from '../../admin-view-imgs/suitcase.png'
function RequireAttention() {
    const requireAttentionHeaders = [
        'Position', 'Positions Left', 'Applications', 'Interviewed', 'Rejected', 'Withdrawn', 'Pending Feedback', 'Offered'
    ]
    return(
        <>
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
                            Python Coach

                        </Flex>
                    </Td>
                    <Td textAlign='center'>3</Td>
                    <Td textAlign='center'>123</Td>
                    <Td textAlign='center'>40</Td>
                    <Td textAlign='center'>33</Td>
                    <Td textAlign='center'>7</Td>
                    <Td textAlign='center'>40</Td>
                    <Td textAlign='center'>2</Td>
                </Tr>
                <Tr
                _hover={{backgroundColor: 'tcs.bluey'}}
                key='2'>
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
                            Data Analytics Coach
                        </Flex>
                    </Td>
                    <Td textAlign='center'>3</Td>
                    <Td textAlign='center'>123</Td>
                    <Td textAlign='center'>40</Td>
                    <Td textAlign='center'>33</Td>
                    <Td textAlign='center'>7</Td>
                    <Td textAlign='center'>40</Td>
                    <Td textAlign='center'>2</Td>
                </Tr>
                <Tr
                _hover={{backgroundColor: 'tcs.bluey'}}
                key='3'>
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
                            Web Development Coach
                        </Flex>
                    </Td>
                    <Td textAlign='center'>3</Td>
                    <Td textAlign='center'>123</Td>
                    <Td textAlign='center'>40</Td>
                    <Td textAlign='center'>33</Td>
                    <Td textAlign='center'>7</Td>
                    <Td textAlign='center'>40</Td>
                    <Td textAlign='center'>2</Td>
                </Tr>
                <Tr 
                _hover={{backgroundColor: 'tcs.bluey'}}
                key='4'>
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
                            Python Coach
                        </Flex>
                    </Td>
                    <Td textAlign='center'>3</Td>
                    <Td textAlign='center'>123</Td>
                    <Td textAlign='center'>40</Td>
                    <Td textAlign='center'>33</Td>
                    <Td textAlign='center'>7</Td>
                    <Td textAlign='center'>40</Td>
                    <Td textAlign='center'>2</Td>
                </Tr>
                </Tbody>
            </Table>
        </TableContainer>
       
        </>
    )
}

export default RequireAttention;