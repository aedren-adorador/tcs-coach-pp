import { Button, Grid, Text, GridItem, Card, Flex, CardBody, Box, Textarea} from "@chakra-ui/react";
import { StarOutlined, StarFilled } from "@ant-design/icons";
import React, { useState } from "react";

function TeachingDemoFeedback() {
    const teachingDemoCriteria = [
        'English Proficiency',
        'Communication Skills',
        'Expertise in Subject Area',
        'Professionalism'
    ]

    const [teachingDemoCriteriaScores, setTeachingDemoCriteriaScores] = useState({
        'English Proficiency': 0, 
        'Communication Skills': 0,
        'Expertise in Subject Area': 0,
        'Professionalism':0,
    })
    
    const handleRating = (starIndex, criterion) => {
        setTeachingDemoCriteriaScores(prevState => ({
            ...prevState,
            [criterion]: starIndex
        }))
    }

    const perfectScore =5;
    return(
        <>
         <Text
        mt='40px'
        mb='20px'
        fontWeight='1000'
        color='black'
        >Teaching Demo Link</Text>

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
        fontWeight='1000'
        color='black'
        >Teaching Demo Feedback Criteria</Text>
        {teachingDemoCriteria.map(criterion => {
            return <Grid
            gap={5}
            templateColumns='repeat(4, 1fr)'
            mb='10px'
            >
                <Box>
                    <Text>{criterion}</Text>
                </Box>
                <Flex>
                    {Array.from({length: perfectScore}, (_, starIndex) => (
                        <>
                       {starIndex + 1 <= teachingDemoCriteriaScores[criterion] ? (
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

export default TeachingDemoFeedback;