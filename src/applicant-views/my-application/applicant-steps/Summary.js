import { BulbOutlined, FireOutlined, HeartOutlined, ThunderboltFilled, ThunderboltOutlined } from "@ant-design/icons";
import { Accordion, AccordionItem, Box, Card, Flex, Grid, GridItem, Text, AccordionButton, AccordionIcon, AccordionPanel} from "@chakra-ui/react";
import React from "react";

function Summary({applicantData, jobData, jobApplicationDetails}) {
    return(
        <>
        <Grid
        gridTemplateColumns='repeat(2, 1fr)'
        gap={5}
        minW='1000px'
        >
            <GridItem
            >
                <Flex mb='4'>
                    <Box mr='5'>
                        <Text color='gray'>Last Name</Text>
                        <Text
                        fontSize='30px'
                        fontWeight='1000'
                        >{applicantData.lastNameM}</Text>
                    </Box>
                    <Box>
                        <Text color='gray'>First Name</Text>
                        <Text
                        fontSize='30px'
                        fontWeight='1000'
                        >{applicantData.firstNameM}</Text>
                    </Box>
                </Flex>
                 <Text color='gray'>Email Address</Text>
                 <Text mb='4'>{applicantData.emailM}</Text>

                 <Text color='gray'>Contact Number</Text>
                 <Text mb='4'>{jobApplicationDetails.contactNumber}</Text>
                
                
                <Text color='gray'>LinkedIn Profile Link</Text>
                <Text mb='4'>{jobApplicationDetails.linkedIn}</Text>

                <Text color='gray'>Internet Speed</Text>
                <Text mb='4'>{jobApplicationDetails.internetSpeed} mbps</Text>

                <Text color='gray'>Referred by</Text>
                 <Text mb='4'>{jobApplicationDetails.referredBy}</Text>
            </GridItem>

            <GridItem>
                <Flex mb='4'>
                    <Box mr='5'>
                        <Text color='tcs.linky'>Position Applied To</Text>
                        <Text
                        fontSize='30px'
                        fontWeight='1000'
                        color='tcs.linky'
                        >{jobData.jobTitleM}</Text>
                    </Box>
                </Flex>
                 <Text color='gray'>Resume Attachment</Text>
                 <Text mb='4'>{applicantData.emailM}</Text>

                 <Text color='gray'>Education</Text>
                {jobApplicationDetails.education.length > 1 ?
                <Accordion mb='4' allowMultiple bg='tcs.dirtywhite'>
                    <AccordionItem>
                        <h2>
                        <AccordionButton>
                            <Box as="span" flex='1' textAlign='left' fontSize='14px'>
                            See Education Summary
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                        </h2>
                        {jobApplicationDetails.education.map(education => (
                            <AccordionPanel pb={4}>
                                <Text fontSize='13px'>
                                <BulbOutlined/> {education.university} - {education.degreeProgram}
                                </Text>
                            </AccordionPanel>
                        ))}
                    </AccordionItem>
                </Accordion> :
                <Text
                mb='4'
                >{jobApplicationDetails.education[0].university} <br></br>{jobApplicationDetails.education[0].degreeProgram}</Text>
                }

                 <Text color='gray'>Coaching/Tutoring Experience</Text>
                 {jobApplicationDetails.coachingExperience.length > 1 ?
                <Accordion mb='4' allowMultiple bg='tcs.dirtywhite'>
                    <AccordionItem>
                        <h2>
                        <AccordionButton>
                            <Box as="span" flex='1' textAlign='left' fontSize='14px'>
                            See Coaching Experience Summary
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                        </h2>
                        {jobApplicationDetails.coachingExperience.map(coachingExperience => (
                            <AccordionPanel pb={4}>
                                <Text fontSize='13px'>
                                <FireOutlined/> {coachingExperience}
                                </Text>
                            </AccordionPanel>
                        ))}
                    </AccordionItem>
                </Accordion> :
                <Text
                mb='4'
                >{jobApplicationDetails.coachingExperience[0]}</Text>
                }

                <Text color='gray'>Areas of Expertise</Text>
                {jobApplicationDetails.areasOfExpertise.length > 1 ?
                <Accordion mb='4' allowMultiple bg='tcs.dirtywhite'>
                    <AccordionItem>
                        <h2>
                        <AccordionButton>
                            <Box as="span" flex='1' textAlign='left' fontSize='14px'>
                            See Areas of Expertise Summary
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                        </h2>
                        {jobApplicationDetails.areasOfExpertise.map(area => (
                            <AccordionPanel pb={4}>
                                <Text fontSize='13px'>
                                <ThunderboltOutlined/> {area}
                                </Text>
                            </AccordionPanel>
                        ))}
                    </AccordionItem>
                </Accordion> :
                <Text
                mb='4'
                >{jobApplicationDetails.areasOfExpertise[0]}</Text>
                }

                <Text color='gray'>Availability</Text>
                {jobApplicationDetails.availability.length > 1 ?
                <Accordion mb='4' allowMultiple bg='tcs.dirtywhite'>
                    <AccordionItem>
                        <h2>
                        <AccordionButton>
                            <Box as="span" flex='1' textAlign='left' fontSize='14px'>
                            See Availability Summary
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                        </h2>
                        {jobApplicationDetails.availability.map(availability => (
                            <AccordionPanel pb={4}>
                                <Text fontSize='13px'>
                                <FireOutlined/> {availability}
                                </Text>
                            </AccordionPanel>
                        ))}
                    </AccordionItem>
                </Accordion> :
                <Text
                mb='4'
                >{jobApplicationDetails.availability[0]}</Text>
                }
                
            </GridItem>
        </Grid>
        </>
    )
}

export default Summary;