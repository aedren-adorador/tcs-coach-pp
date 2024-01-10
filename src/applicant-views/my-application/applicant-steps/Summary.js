import { BulbOutlined, CalendarOutlined, FireOutlined, HeartOutlined, ThunderboltFilled, ThunderboltOutlined } from "@ant-design/icons";
import { Accordion, AccordionItem, Box, Card, Flex, Grid, GridItem, Text, AccordionButton, AccordionIcon, AccordionPanel, Button, Link} from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";

function Summary({applicantData, jobData, jobApplicationDetails}) {
    const navigate = useNavigate();
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
                 <Link href={jobApplicationDetails.resume} target='_blank'>
                     <Button
                    mb='4'
                    variant='link'
                    color='tcs.linky'
                    >TCS-Resume-{applicantData.lastNameM}.pdf (click to view)</Button>
                 </Link>
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
                        {jobApplicationDetails.education.map((education, index) => (
                            <AccordionPanel pb={4} key={index}>
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
                        {jobApplicationDetails.coachingExperience.map((coachingExperience, index) => (
                            <AccordionPanel pb={4} key={index}>
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
                        {jobApplicationDetails.areasOfExpertise.map((area, index) => (
                            <AccordionPanel pb={4} key={index}>
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
                        {jobApplicationDetails.availability.map((availability, index) => (
                            <AccordionPanel pb={4} key={index}>
                                <Text fontSize='13px'>
                                <CalendarOutlined/> {availability}
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