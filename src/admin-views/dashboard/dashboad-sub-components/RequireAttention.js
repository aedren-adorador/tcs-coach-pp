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
        >
            <Text color='#071C50' fontWeight='600' fontSize='14px'>Require Attention</Text>
            <Table
            variant='simple'
            backgroundColor='#F3F8FF'
            fontSize='12px'
            >
                <Thead>
                <Tr>
                    {requireAttentionHeaders.map(header => {
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
                <Tr>
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
                <Tr>
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
                <Tr>
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