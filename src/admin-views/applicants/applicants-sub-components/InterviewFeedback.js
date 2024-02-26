import { Box, Button, Card, CardBody, Flex, Grid, GridItem, Input, Link, Select, Skeleton, Table, TableCaption, TableContainer, Tbody, Td, Text, Textarea, Tfoot, Th, Thead, Tr, VStack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { StarOutlined, StarFilled } from "@ant-design/icons";
import axios from "axios";
import { EditIcon } from "@chakra-ui/icons";
import { Form, Formik } from "formik";

function InterviewFeedback(chosenApplicantAllJobApplicationDetails) {
   
    const [interviewQuestions, setInterviewQuestions] = useState(chosenApplicantAllJobApplicationDetails.chosenApplicantAllJobApplicationDetails.interviewQuestionsM)

    const [interviewCriteriaScores, setInterviewCriteriaScores] = useState({})

    const perfectScore = 5;

    const [clickedVideo, setClickedVideo] = useState(0)
    const [interviewResponsesList, setInterviewResponsesList] = useState([])
    const [isVideoLoading, setIsVideoLoading] = useState(false);
    const [editCriterionScore, setCriterionScore] = useState(false);
    
    useEffect(() => {
    }, [interviewResponsesList])

    useEffect(() => {
        if (interviewResponsesList[clickedVideo]) {
        const videoElement = document.getElementById("interviewVideo");
        videoElement.src = `${process.env.REACT_APP_SYS_URL}/${process.env.REACT_APP_INTERVIEW_STATIC}/${chosenApplicantAllJobApplicationDetails.chosenApplicantAllJobApplicationDetails.applicantJoinedDetails[0].firstNameM}-${chosenApplicantAllJobApplicationDetails.chosenApplicantAllJobApplicationDetails.applicantJoinedDetails[0].lastNameM}-${chosenApplicantAllJobApplicationDetails.chosenApplicantAllJobApplicationDetails.applicantJoinedDetails[0]._id}/${interviewResponsesList[clickedVideo]}`
        setIsVideoLoading(false)
        } 
    }, [clickedVideo, interviewResponsesList, chosenApplicantAllJobApplicationDetails.chosenApplicantAllJobApplicationDetails.applicantJoinedDetails]); 


    useEffect(() => {
        const details = {
        applicantID: chosenApplicantAllJobApplicationDetails.chosenApplicantAllJobApplicationDetails.applicantJoinedDetails[0]._id,
        applicantFirstName: chosenApplicantAllJobApplicationDetails.chosenApplicantAllJobApplicationDetails.applicantJoinedDetails[0].firstNameM,
        applicantLastName: chosenApplicantAllJobApplicationDetails.chosenApplicantAllJobApplicationDetails.applicantJoinedDetails[0].lastNameM
        }
        axios.get(`${process.env.REACT_APP_SYS_URL}/api/admin/applicant-screening/get-interview-responses/${encodeURIComponent(JSON.stringify(details))}`)
            .then(response => {
                setInterviewResponsesList(response.data)
            })

        
        if (chosenApplicantAllJobApplicationDetails.chosenApplicantAllJobApplicationDetails.interviewCriteriaScoresM && Object.keys(chosenApplicantAllJobApplicationDetails.chosenApplicantAllJobApplicationDetails.interviewCriteriaScoresM).length === 0) {
            axios.get(`${process.env.REACT_APP_SYS_URL}/api/admin/applicant-screening/populate-criteria`)
                .then(response => {
                    const criteria = {};
                    response.data.forEach(criterion => {
                        criteria[criterion.criterionM] = 0;
                    });
                    axios.post(`${process.env.REACT_APP_SYS_URL}/api/admin/applicant-screening/save-initial-criteria`, [criteria, chosenApplicantAllJobApplicationDetails.chosenApplicantAllJobApplicationDetails._id])
                        .then(response => setInterviewCriteriaScores(criteria))
                    
                })
        } else {
            setInterviewCriteriaScores(chosenApplicantAllJobApplicationDetails.chosenApplicantAllJobApplicationDetails.interviewCriteriaScoresM)
        }
    }, [])

    useEffect(() => {
    }, [interviewCriteriaScores])



    return(
        <>
        <Grid
        minW='1000px'
        minH='350px'
        templateColumns='repeat(2, 1fr)'
        gap='5'
        >
            <GridItem
            border='solid 0.5px lightgray'
            borderRadius='10px'
            padding='0px 10px 0px 10px'
            >
                <Text
                mt='10px'
                mb='20px'
                fontWeight='600'
                color='black'
                >Interview Questions</Text>
                {interviewQuestions.map((question, index)=> {
                    return <Flex fontSize='12px' gap='5' mb='10px' key={index}>
                    <Button
                    size='xs'
                    variant={index === clickedVideo ? 'outline' : 'link'}

                    onClick={()=>{
                            if (index !== clickedVideo) {
                                 setIsVideoLoading(true) 
                                setTimeout(() => {
                                setClickedVideo(index)
                                }, 1000)
                                }}
                            }
                    >Question {index+1}</Button>
                    <Box>{question}</Box>
                    </Flex>
                })}
            </GridItem>
            <Skeleton
            isLoaded={!isVideoLoading}
            >
            <GridItem minH='400px'>
                 {interviewResponsesList[clickedVideo] &&
                 
                 <video id="interviewVideo" width='500px' controls>
                    <source src={`${process.env.REACT_APP_SYS_URL}/${process.env.REACT_APP_INTERVIEW_STATIC}/${chosenApplicantAllJobApplicationDetails.chosenApplicantAllJobApplicationDetails.applicantJoinedDetails[0].firstNameM}-${chosenApplicantAllJobApplicationDetails.chosenApplicantAllJobApplicationDetails.applicantJoinedDetails[0].lastNameM}-${chosenApplicantAllJobApplicationDetails.chosenApplicantAllJobApplicationDetails.applicantJoinedDetails[0]._id}/${interviewResponsesList[clickedVideo]}`} type="video/webm" />
                </video>
                }
            </GridItem>
            </Skeleton>
        </Grid>

        <Text
        mt='20px'
        mb='20px'
        fontWeight='600'
        color='black'
        >Interview Feedback Criteria</Text>
        <TableContainer>
        <Table colorScheme='blue'>
            <Thead>
            <Tr>
                <Th>Criterion</Th>
                <Th>Rating</Th>
                <Th>Comments</Th>
            </Tr>
            </Thead>
            <Tbody>
            {interviewCriteriaScores && Object.keys(interviewCriteriaScores).map(key => (
                <Tr key={key}>
                    <Td>{key}</Td>
                    <Td>
                        {editCriterionScore ? 
                        <Select size='sm' maxW='60px' display='inline-block'>
                            <option value='1'>1</option>
                            <option value='2'>2</option>
                            <option value='3'>3</option>
                            <option value='4'>4</option>
                            <option value='5'>5</option>
                        </Select>
                        
                        : interviewCriteriaScores[key]}  /5
                        &nbsp;
                        <EditIcon _hover={{color: 'lightblue'}} onClick={()=>setCriterionScore(curr => !curr)}/>
                    </Td>
                    <Td><Textarea fontSize='12px'></Textarea></Td>
                </Tr>
            ))}
                

            </Tbody>

        </Table>
        <Flex justify='flex-end'>
            <Button size='md' borderRadius='0px' float='right' mb='50px' colorScheme='green'>Save Interview Review</Button>
        </Flex>
        </TableContainer>
        
        
        <Grid
        templateColumns='repeat(1, 1fr)'
        gap={5}
        mb='100px'
        >
            <GridItem
            >
                <Flex
                justify='center'
                direction='row'
                gap={3}
                width='100%'
                align='center'
                >
                     <Button
                    variant='outline'
                    colorScheme="red"
                    borderRadius='0px'
                    fontSize='12px'
                    width='270px'
                    height='40px'
                    fontWeight='300'
                     _hover={{color: 'white', bg:'darkred'}}
                    >Send &nbsp;<Text fontWeight='600' display='inline-block'>Interview Rejection</Text>&nbsp;Email</Button>
                    <Button
                    borderRadius='0px'
                    fontSize='12px'
                    width='270px'
                    height='40px'
                    backgroundColor='#DBF6E5'
                    fontWeight='300'
                    color='black'
                    _hover={{color: 'white', bg:'green'}}
                    >Send &nbsp;<Text fontWeight='600' display='inline-block'>Teaching Demo Invitation</Text>&nbsp;Email</Button>
                </Flex>
            </GridItem>
        </Grid>
        </>
    )
}


export default InterviewFeedback;