import { Text, Grid, GridItem, HStack, VStack, Box } from "@chakra-ui/react";
import React from "react";


function ReviewApplication() {
    return(
        <>
        <Grid
        mt='40px'
        templateAreas={`"column1 column2"`}
        templateColumns='repeat(2, 1fr)'

        h='100%'
        fontWeight='bold'
        >
        <GridItem
        area={'column1'}
        >   
        <VStack
        spacing={4}
        align='flex-start'
        >
            <Box>
                <Text
                fontSize='15px'
                color='gray.400'
                fontWeight='500'
                >Last Name &nbsp;&nbsp;&nbsp;&nbsp; First Name
                </Text>
                <Text
                fontSize='20px'
                color='black'
                fontWeight='1000'
                >FABIAN&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; DAWN NICOLE</Text>
            </Box>

            <Box>
                <Text
                fontSize='15px'
                color='gray.400'
                fontWeight='500'
                >Email Address
                </Text>
                <Text
                fontSize='15px'
                color='black'
                fontWeight='400'
                display='inline-block'
                >dawn.fabian@obf.ateneo.edu</Text>
            </Box>

            <Box>
                <Text
                fontSize='15px'
                color='gray.400'
                fontWeight='500'
                >Contact Number
                </Text>
                <Text
                fontSize='15px'
                color='black'
                fontWeight='400'
                display='inline-block'
                >09061381777</Text>
            </Box>

             <Box>
                <Text
                fontSize='15px'
                color='gray.400'
                fontWeight='500'
                >Institution/University
                </Text>
                <Text
                fontSize='15px'
                color='black'
                fontWeight='400'
                display='inline-block'
                >Ateneo de Manila University</Text>
            </Box>

             <Box>
                <Text
                fontSize='15px'
                color='gray.400'
                fontWeight='500'
                >Education Level
                </Text>
                <Text
                fontSize='15px'
                color='black'
                fontWeight='400'
                display='inline-block'
                >Bachelor's Degree</Text>
            </Box>

            <Box>
                <Text
                fontSize='15px'
                color='gray.400'
                fontWeight='500'
                >Major/Specialization
                </Text>
                <Text
                fontSize='15px'
                color='black'
                fontWeight='400'
                display='inline-block'
                >BS Management Information Systems</Text>
            </Box>

            <Box>
                <Text
                fontSize='15px'
                color='gray.400'
                fontWeight='500'
                >LinkedIn Profile Link
                </Text>
                <Text
                fontSize='15px'
                color='black'
                fontWeight='400'
                display='inline-block'
                >https://www.linkedin.com/in/dawn-fabian/</Text>
            </Box>

            <Box>
                <Text
                fontSize='15px'
                color='gray.400'
                fontWeight='500'
                >Are you willing to do Face-to-Face classes?
                </Text>
                <Text
                fontSize='15px'
                color='black'
                fontWeight='400'
                display='inline-block'
                >Yes</Text>
            </Box>

            <Box>
                <Text
                fontSize='15px'
                color='gray.400'
                fontWeight='500'
                >If yes, where do you live?
                </Text>
                <Text
                fontSize='15px'
                color='black'
                fontWeight='400'
                display='inline-block'
                >Katipunan, Quezon City</Text>
            </Box>
        </VStack>
        </GridItem>


        <GridItem
        area={'column2'}
        >
        <VStack
        spacing={4}
        align='flex-start'
        >
            <Box>
                <Text
                fontSize='15px'
                color='blue.400'
                fontWeight='500'
                >Position Applied To
                </Text>
                <Text
                fontSize='20px'
                color='blue.400'
                fontWeight='1000'
                >DATA ANALYTICS COACH</Text>
            </Box>

            <Box>
                <Text
                fontSize='15px'
                color='gray.400'
                fontWeight='500'
                >Resume Attachment
                </Text>
                <Text
                fontSize='15px'
                color='blue.400'
                fontWeight='400'
                display='inline-block'
                textDecoration='underline'
                >Fabian_Resume.pdf(click to view)</Text>
            </Box>

            <Box>
                <Text
                fontSize='15px'
                color='gray.400'
                fontWeight='500'
                >Coaching/Tutoring Experience
                </Text>
                <Text
                fontSize='15px'
                color='black'
                fontWeight='400'
                display='inline-block'
                >High School Tutor Experience</Text>
            </Box>

             <Box>
                <Text
                fontSize='15px'
                color='gray.400'
                fontWeight='500'
                >Areas of Expertise
                </Text>
                <Text
                fontSize='15px'
                color='black'
                fontWeight='400'
                display='inline-block'
                >Data Analytics, Project Management</Text>
            </Box>

             <Box>
                <Text
                fontSize='15px'
                color='gray.400'
                fontWeight='500'
                >Where did you hear about this job opening?
                </Text>
                <Text
                fontSize='15px'
                color='black'
                fontWeight='400'
                display='inline-block'
                >LinkedIn</Text>
            </Box>

            <Box>
                <Text
                fontSize='15px'
                color='gray.400'
                fontWeight='500'
                >Availability
                </Text>
                <Text
                fontSize='15px'
                color='black'
                fontWeight='400'
                display='inline-block'
                >Saturday</Text>
            </Box>

            <Box>
                <Text
                fontSize='15px'
                color='gray.400'
                fontWeight='500'
                >Internet Speed
                </Text>
                <Text
                fontSize='15px'
                color='black'
                fontWeight='400'
                display='inline-block'
                >15 mbps</Text>
            </Box>

            <Box>
                <Text
                fontSize='15px'
                color='gray.400'
                fontWeight='500'
                >Referred by
                </Text>
                <Text
                fontSize='15px'
                color='black'
                fontWeight='400'
                display='inline-block'
                >Aedren Adorador</Text>
            </Box>

            <Box>
                <Text
                fontSize='15px'
                color='gray.400'
                fontWeight='500'
                >If yes, where do you live?
                </Text>
                <Text
                fontSize='15px'
                color='black'
                fontWeight='400'
                display='inline-block'
                >Katipunan, Quezon City</Text>
            </Box>
        </VStack>
        </GridItem>
        </Grid>
        </>
    )
}

export default ReviewApplication;