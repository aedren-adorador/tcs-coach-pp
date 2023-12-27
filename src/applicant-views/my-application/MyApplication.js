import { Td, Table, TableCaption, TableContainer, Tr, Th, Tbody, Thead, Button, Badge} from "@chakra-ui/react";
import { Link } from "react-router-dom";

function MyApplication({applicantData}) {
    return (
        <>
            <TableContainer>
            <Table variant='simple'>
                <TableCaption>TCS Job Application Dashboard</TableCaption>
                <Thead>
                <Tr>
                    <Th>Application ID</Th>
                    <Th>Position Applied to</Th>
                    <Th>Status</Th>
                    <Th>Action</Th>
                </Tr>
                </Thead>
                <Tbody>
                <Tr>
                    <Td>260602</Td>
                    <Td>ReactJS Web Development Coach</Td>
                    <Td>
                        <Badge colorScheme='gray'>Not Submitted</Badge>
                    </Td>
                    <Td>
                        <Link to={{ pathname: '/application-progress'}} state={{applicantData: applicantData}}>
                        <Button
                        variant='solid'
                        colorScheme="blue"
                        size='sm'
                        >
                            Resume Application
                        </Button>
                        </Link>
                    </Td>
                </Tr>
                </Tbody>
            </Table>
            </TableContainer>
        </>
    )
}

export default MyApplication;