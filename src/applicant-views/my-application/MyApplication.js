import { CiCircleOutlined } from "@ant-design/icons";
import { WarningIcon } from "@chakra-ui/icons";
import { Td, Table, TableCaption, TableContainer, Tr, Th, Tbody, Thead, Button, Badge, Text, Image, Flex} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import suitcase from '../../admin-views/admin-view-imgs/suitcase.png'

function MyApplication({applicantData, setObtainedActiveNavButton}) {
    return (
        <> 
            <TableContainer
            minW='900px'
            margin='20px 5% 20px 5%'
            >
            <Text
            fontSize='sm'
            fontWeight='300'
            mb='20px'
            >Hello, {applicantData.firstNameM}.</Text>
            <Text
            fontWeight='1000'
            >My Application</Text>
            <Table
            size='sm'
            variant='simple'
            backgroundColor='#F3F8FF'
            layout='fixed'
            >
                <Thead>
                <Tr>
                    <Th width='150px'></Th>
                    <Th>Position Applied To</Th>
                    <Th>Application Date</Th>
                    <Th>Application Status</Th>
                </Tr>
                </Thead>
                <Tbody>
                {applicantData.positionAppliedToM !== null ?
                <Tr>
                    <Td textAlign='center'>
                        <Flex
                        justify='center'
                        align='center'
                        >
                            <Image
                            src={suitcase}
                            width='60px'
                            
                            ></Image>
                        </Flex>
                    </Td>
                    <Td>{applicantData.positionAppliedToM}</Td>
                    <Td>
                        {applicantData.dateSubmittedApplicationM}
                    </Td>
                    <Td>
                        Under Review
                    </Td>
                </Tr> :
                <Tr>
                    <Td textAlign='center'>
                        <Flex
                        justify='center'
                        align='center'
                        >
                            <Image
                            src={suitcase}
                            width='60px'
                            
                            ></Image>
                        </Flex>
                    </Td>
                    <Td>
                        No Application Yet
                    </Td>
                    <Td>
                        —
                    </Td>
                    <Td>
                        —
                    </Td>
                </Tr>
                }
                
                </Tbody>
            </Table>
            </TableContainer>



            <TableContainer
            minW='900px'
            margin='20px 5% 20px 5%'
            >
            <Text
            fontWeight='1000'
            >Pending Tasks</Text>
            <Table
            size='sm'
            layout='fixed'
            variant='simple'
            backgroundColor='#F3F8FF'
            >
                <Thead>
                <Tr>
                    <Th width='150px'></Th>
                    <Th>Task Name</Th>
                    <Th>Deadline</Th>
                    <Th>Action</Th>
                </Tr>
                </Thead>
                <Tbody>
                <Tr>
                    <Td textAlign='center'>
                        <WarningIcon
                        style={{fontSize: '45px', color:'red'}}
                        
                        />
                    </Td>
                    <Td>Submit Application</Td>
                    <Td>
                        Jan 13, 2023
                    </Td>
                    <Td>
                        {applicantData.positionAppliedToM === null &&
                        <Badge colorScheme="green" fontWeight='300' padding='2'>Apply to Job Portal</Badge>}
                        {/* <Link to={{ pathname: '/application-progress'}} state={{applicantData: applicantData}}>
                        <Button
                        variant='solid'
                        colorScheme="green"
                        size='sm'
                        >
                            Resume Application
                        </Button>
                        </Link> */}
                    </Td>
                </Tr>
                </Tbody>
            </Table>
            </TableContainer>
        </>
    )
}

export default MyApplication;