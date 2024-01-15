import { Box, Button, Card, CardBody, Flex, Grid, GridItem, Text, Textarea, VStack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { StarOutlined, StarFilled } from "@ant-design/icons";

function InterviewFeedback(chosenApplicantAllJobApplicationDetails) {
    const [interviewQuestions, setInterviewQuestions] = useState([
        'Tell us about yourself.',
        'Why did you apply to TCS?',
        'What are your strenghts?',
        'Tell about a time where you had a conflict with a group.',
        'How would you explain a complex topic to an audience?',
        'What do you think is the future of technology?',
        'In a collaborative environment, who are you in the group?',
        'State one important mistake that has shaped you for the better.',
    ])

    const [interviewCriteriaScores, setInterviewCriteriaScores] = useState({
        'English Proficiency': 0, 
        'Communication Skills': 0,
        'Expertise in Subject Area': 0,
        'Professionalism':0,
    })
    
    const handleRating = (starIndex, criterion) => {
        setInterviewCriteriaScores(prevState => ({
            ...prevState,
            [criterion]: starIndex
        }))
    }

    const perfectScore = 5;

    const showVideo = (videoNumber) => {
        console.log(videoNumber)

    }

    return(
        <>
        <Grid
        templateColumns='repeat(2, 1fr)'
        >
            <GridItem>
                <Text
                mt='10px'
                mb='20px'
                fontWeight='600'
                color='black'
                >Interview Questions</Text>
                {interviewQuestions.map((question, index)=> {
                    return <Flex fontSize='12px' gap='5' mb='10px'>
                    <Button
                    key={index}
                    size='xs'
                    variant='link'
                    color='gray'
                    onClick={()=>showVideo(index+1)}
                    >Question {index+1}</Button>
                    <Box>{question}</Box>
                    </Flex>
                })}
            </GridItem>

            <GridItem >
                <video width="750" height="500" controls >
                    <source src='../../../../interview-recordings/Aedren-Adorador-65a18b0854ecefdefec9b6c7/Question1-Aedren-Adorador-722007329.webm' type="video/webm"/>
                </video>


            </GridItem>

        </Grid>
        
        
        <Grid
        templateColumns='repeat(2, 1fr)'
        gap={5}
        >
            <GridItem
            >
                <Flex
                justify='center'
                align='center'
                height='100%'
                >
                    <Card
                    width='200px'
                    >
                        <CardBody>
                            Score: Potential Fit
                        </CardBody>
                    </Card>
                </Flex>
            </GridItem>
            <GridItem
            >
                <Flex
                direction='column'
                gap={3}
                width='100%'
                align='center'
                >
                    <Button
                    borderRadius='30px'
                    fontSize='12px'
                    width='270px'
                    height='60px'
                    backgroundColor='#DBF6E5'
                    fontWeight='300'
                    color='black'
                    _hover={{color: 'white', bg:'green'}}
                    >Send &nbsp;<Text fontWeight='600' display='inline-block'>Teaching Demo Invitation</Text>&nbsp;Email</Button>

                    <Button
                    borderRadius='30px'
                    fontSize='12px'
                    width='270px'
                    height='60px'
                    backgroundColor='#F7E1E1'
                    fontWeight='300'
                    color='black'
                    _hover={{color: 'white', bg:'darkred'}}
                    >Send &nbsp;<Text fontWeight='600' display='inline-block'>Interview Rejection</Text>&nbsp;Email</Button>
                </Flex>
            </GridItem>
        </Grid>

        

        <Text
        mt='40px'
        mb='20px'
        fontWeight='600'
        color='black'
        >Interview Feedback Criteria</Text>
        {Object.keys(interviewCriteriaScores).map((criterion) => {
            return <Grid
            gap={5}
            templateColumns='repeat(4, 1fr)'
            mb='10px'
            >
               <Box>
                    <Text
                    key={Math.floor(1000000000 + Math.random() * 9000000000)}
                    >{criterion}</Text>
                </Box>
                <Flex>
                    {Array.from({length: perfectScore}, (_, starIndex) => (
                        <>
                       {starIndex + 1 <= interviewCriteriaScores[criterion] ? (
                            <StarFilled
                            style={{ fontSize: '30px', marginLeft: '10px',color:'gold' }}
                            
                            onClick={() => handleRating(starIndex + 1, criterion)}
                            />
                        ) : (
                            <StarOutlined
                            style={{ fontSize: '30px', marginLeft: '10px'}}
                            onClick={() => handleRating(starIndex + 1, criterion)}
                            />
                        )}
                       </>
    
                    ))}
                </Flex>
                <Textarea
                    placeholder='Add comment'
                    size='xs'/>
                <Button
                size='sm'
                >Save</Button>
            </Grid>
        })}
        </>
    )
}


export default InterviewFeedback;