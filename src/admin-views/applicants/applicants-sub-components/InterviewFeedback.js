import { Box, Button, Card, CardBody, Flex, Grid, GridItem, Link, Skeleton, Text, Textarea, VStack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { StarOutlined, StarFilled } from "@ant-design/icons";
import axios from "axios";

function InterviewFeedback(chosenApplicantAllJobApplicationDetails) {
   
    const [interviewQuestions, setInterviewQuestions] = useState(chosenApplicantAllJobApplicationDetails.chosenApplicantAllJobApplicationDetails.interviewQuestionsM)

    const [interviewCriteriaScores, setInterviewCriteriaScores] = useState({})
    
    const handleRating = (starIndex, criterion) => {
        setInterviewCriteriaScores(prevState => ({
            ...prevState,
             [criterion]: [String(starIndex), prevState[criterion][1]]
        })
        )
    }

    const handleFeedback = (criterion, e) => {
        setInterviewCriteriaScores(prevState => ({
            ...prevState,
            [criterion]: [prevState[criterion][0], e.target.value]
        }
        ))
    }

    const perfectScore = 5;

    const [clickedVideo, setClickedVideo] = useState(0)
    const [interviewResponsesList, setInterviewResponsesList] = useState([])
    const [isVideoLoading, setIsVideoLoading] = useState(false);

    useEffect(() => {
    }, [interviewResponsesList])

    useEffect(() => {
        const details = {interviewCriteriaScores: interviewCriteriaScores, jobApplicationID: chosenApplicantAllJobApplicationDetails.chosenApplicantAllJobApplicationDetails._id}
        axios.post(`${process.env.REACT_APP_SYS_URL}/api/admin/applicant-screening/update-interview-scores/${encodeURIComponent(JSON.stringify(details))}`)
            .then(response => console.log(response.data))

    }, [interviewCriteriaScores, chosenApplicantAllJobApplicationDetails.chosenApplicantAllJobApplicationDetails._id])

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
        }, [chosenApplicantAllJobApplicationDetails])

    useEffect(() => {
        if (chosenApplicantAllJobApplicationDetails.chosenApplicantAllJobApplicationDetails.interviewCriteriaScoresM) { 
            setInterviewCriteriaScores(chosenApplicantAllJobApplicationDetails.chosenApplicantAllJobApplicationDetails.interviewCriteriaScoresM)
        } else {
            const details = { jobApplicationID: chosenApplicantAllJobApplicationDetails.chosenApplicantAllJobApplicationDetails._id}
            axios.post(`${process.env.REACT_APP_SYS_URL}/api/admin/applicant-screening/supply-criteria`, details)
                .then(response => {
                    setInterviewCriteriaScores(response.data)
                })
        }
    }, [chosenApplicantAllJobApplicationDetails.chosenApplicantAllJobApplicationDetails.interviewCriteriaScoresM, chosenApplicantAllJobApplicationDetails.chosenApplicantAllJobApplicationDetails._id])

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
        {Object.keys(interviewCriteriaScores).map((criterion, index) => {
            return <Grid
            key={index}
            gap={1}
            templateColumns='repeat(3, 1fr)'
            mb='50px'
            >
               <Box>
                    <Text
                    key={Math.floor(1000000000 + Math.random() * 9000000000)}
                    >{criterion}</Text>
                </Box>
                <Flex>
                    {Array.from({length: perfectScore}, (_, starIndex) => (
                        <>
                       {starIndex + 1 <= Number(interviewCriteriaScores[criterion][0]) ? (
                            <StarFilled
                            key={Math.floor(1000000000 + Math.random() * 9000000000)}
                            style={{ fontSize: '30px', marginLeft: '10px',color:'gold' }}
                            
                            onClick={() => {
                                handleRating(starIndex + 1, criterion)
                            }}
                            />
                        ) : (
                            <StarOutlined
                            key={Math.floor(1000000000 + Math.random() * 9000000000)}
                            style={{ fontSize: '30px', marginLeft: '10px'}}
                            onClick={() => handleRating(starIndex + 1, criterion)}
                            />
                        )}
                       </>
    
                    ))}
                </Flex>
                <Textarea
                    key={index}
                    placeholder='Add comment'
                    size='xs'
                    value={interviewCriteriaScores[criterion][1]}
                    onChange={(e) => handleFeedback(criterion, e)}
                />
                
            </Grid>
        })}
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