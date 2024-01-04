import { Text, Grid, GridItem, Flex, Card, CardBody, Button, HStack, FormControl, FormLabel, Switch, Box } from "@chakra-ui/react";
import React from "react";

function OnboardingRequirements() {
    const onboardingRequirements = [
        'Google Classroom Enrollment', 
        'In-service Training',
        'Signed Contract',
        'Shadow Teaching'
    ]
    return(
        <> 
        <Text
        mt='40px'
        mb='20px'
        fontWeight='1000'
        color='black'
        >Onboarding Requirements</Text>
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
                            Progress Here
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
                    >Send Incomplete Step 4 Reminder</Button>

                    <Button
                    borderRadius='30px'
                    fontSize='12px'
                    width='270px'
                    height='60px'
                    backgroundColor='#F7E1E1'
                    fontWeight='300'
                    color='black'
                    _hover={{color: 'white', bg:'darkred'}}
                    >Finish Step 4</Button>
                </Flex>
            </GridItem>
        </Grid>

        <Grid
        margin='20px 100px 0px 170px'
        templateColumns='repeat(2, 1fr)'>
            <GridItem
            >
                 {onboardingRequirements.map((requirement, index) => {
                    return <Text>{requirement}</Text>
            })}

            </GridItem>
            <GridItem
            > 
    
                 {onboardingRequirements.map((requirement, index) => {
                    return <FormControl display='flex' alignItems='center'>
                            <FormLabel htmlFor='email-alerts' mb='0'>
                                No
                            </FormLabel>
                            <Switch id='email-alerts' />
                             <FormLabel htmlFor='email-alerts' mb='0'>
                                Yes
                            </FormLabel>
                        </FormControl>
            })}
            </GridItem>

        </Grid>
       
        </>
    )
}

<Box border='solid green' display='inline-block'>
                        <FormControl display='flex' alignItems='center'>
                            <FormLabel htmlFor='email-alerts' mb='0'>
                                No
                            </FormLabel>
                            <Switch id='email-alerts' />
                             <FormLabel htmlFor='email-alerts' mb='0'>
                                Yes
                            </FormLabel>
                        </FormControl>
                    </Box>


export default OnboardingRequirements;