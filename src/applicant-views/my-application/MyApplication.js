import { WarningIcon } from "@chakra-ui/icons";
import { Td, Table, TableCaption, TableContainer, Tr, Th, Tbody, Thead, Button, Badge, Text, Image, Flex, Skeleton} from "@chakra-ui/react";
import suitcase from '../../admin-views/admin-view-imgs/suitcase.png'
import { useEffect, useState } from "react";
import axios from "axios";

function MyApplication({applicantData, setObtainedActiveNavButton}) {
    const [submittedJobApplicationDetails, setSubmittedJobApplicatioDetails] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (applicantData.jobApplicationsM && applicantData.jobApplicationsM.length !== 0) {
            axios.get(`http://localhost:3001/api/get-job-application/${applicantData.jobApplicationsM}`)
                .then(response => {
                    setSubmittedJobApplicatioDetails(response.data.submittedApplicationDetails)
                    setIsLoading(false);
                })
        }     
    }, [applicantData])

    useEffect(() => {
    }, [submittedJobApplicationDetails])
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
            >Hello, {applicantData.firstNameM} {applicantData.lastNameM}.</Text>
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
                {applicantData.jobApplicationsM && applicantData.jobApplicationsM.length !==0 ?
               
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
                        <Skeleton
                        height='50px'
                        isLoaded={!isLoading}
                        >{submittedJobApplicationDetails.positionAppliedToM}</Skeleton>
                    </Td>
                   
                    <Td>
                        <Skeleton
                        isLoaded={!isLoading}
                        height='50px'
                        >
                        {new Date(submittedJobApplicationDetails.dateSubmittedApplicationM).toDateString()}
                        </Skeleton>
                    </Td>
                    <Td>
                        <Skeleton
                        height='50px'
                        isLoaded={!isLoading}
                        >
                        {submittedJobApplicationDetails.currentStepM === 'submittedInitialApplication' &&
                        <Badge
                        bg='tcs.mongo'
                        color='white'
                        fontWeight='300'
                        padding='5px'
                        >Active: Application Received</Badge>}
                        </Skeleton>
                    </Td>   
                </Tr>
                
                
                :
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
                        -
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
                    <Td>
                        {submittedJobApplicationDetails.currentStepM === '' && '—'}
                        {submittedJobApplicationDetails.currentStepM === 'submittedInitialApplication' && 'No Tasks Yet'}
                    </Td>
                    <Td>
                        {submittedJobApplicationDetails.currentStepM === '' && '—'}
                        {submittedJobApplicationDetails.currentStepM === 'submittedInitialApplication' && '—'}
                    </Td>
                    <Td>
                        {submittedJobApplicationDetails.currentStepM === '' && '—'}
                       {submittedJobApplicationDetails.currentStepM === 'submittedInitialApplication' && '—'}
                    </Td>
                </Tr>
                </Tbody>
            </Table>
            </TableContainer>
        </>
    )
}

export default MyApplication;