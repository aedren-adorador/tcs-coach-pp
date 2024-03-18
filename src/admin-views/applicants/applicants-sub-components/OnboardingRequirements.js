import { Badge, Box, Button, Card, CardBody, Checkbox, Flex, Grid, GridItem, Input, InputGroup, Link, List, ListItem, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Skeleton, Spinner, Stack, Table, TableCaption, TableContainer, Tbody, Td, Text, Textarea, Tfoot, Th, Thead, Tr, VStack, useDisclosure } from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { EditIcon } from "@chakra-ui/icons";
import { LinkOutlined, UserOutlined } from "@ant-design/icons";

function OnboardingRequirements(chosenApplicantAllJobApplicationDetails) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [isSendingOnboardingRequirementsChecklist, setIsSendingOnboardingRequirementsChecklist] = useState(false);
    const [isOnboardingRequirementsEmailSent, setIsOnboardingRequirementsEmailSent] = useState(false);
    const finalRef = useRef(null)
    const [onboardingChecklist, setOnboardingChecklist] = useState(['Google Classroom Enrollment', 'Signed Contract', 'Shadow Training', 'Birth Certificate', 'NBI Clearance', '2 Valid IDs'])


    useEffect(() => {
        
    }, [])

    useEffect(() => {
    }, [isOnboardingRequirementsEmailSent, chosenApplicantAllJobApplicationDetails])



    return(
        <>
        <Text fontSize='30px' color='black' fontWeight='500' mb='10px'>
        <UserOutlined/>&nbsp;
        {chosenApplicantAllJobApplicationDetails.chosenApplicantAllJobApplicationDetails.applicantJoinedDetails[0].firstNameM}&nbsp;
        {chosenApplicantAllJobApplicationDetails.chosenApplicantAllJobApplicationDetails.applicantJoinedDetails[0].lastNameM}
        </Text>
        <Grid
        mb='20px'
        minW='1000px'
        minH='200px'
        height='150px'
        templateColumns='repeat(1, 1fr)'
        gap='5'
        >
            <GridItem border='solid 0.2px lightgray'>
                <Flex justify='center' align='center' height='100%'>
                    <Link href={chosenApplicantAllJobApplicationDetails.chosenApplicantAllJobApplicationDetails.onboardingRequirementsM} target='_blank'>
                        <Button fontSize='30px' bg='tcs.main' color='white' _hover={{backgroundColor: 'darkblue'}}padding='20px'>Review Onboarding Requirements Here &nbsp; <LinkOutlined></LinkOutlined></Button>
                    </Link>
                </Flex>
                
            </GridItem>
        </Grid>

        <Text
        mb='20px'
        fontWeight='600'
        color='black'
        >Onboarding Requirements Checklist</Text>
        <Box mb='50px'>
            {onboardingChecklist.map((item, i) => (
                <Box>
                   <Stack spacing={5} direction='row'>
                    <List>
                        <ListItem>{i+1}. {item}</ListItem>
                    </List>
                    </Stack>
                
                </Box>
            ))}
        </Box>
        

        
        
        </>
    )
}


export default OnboardingRequirements;