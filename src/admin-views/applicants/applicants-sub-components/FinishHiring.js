import { Badge, Box, Button, Card, CardBody, Checkbox, Flex, Grid, GridItem, Input, InputGroup, Link, List, ListItem, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Skeleton, Spinner, Stack, Table, TableCaption, TableContainer, Tbody, Td, Text, Textarea, Tfoot, Th, Thead, Tr, VStack, useDisclosure } from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { EditIcon } from "@chakra-ui/icons";
import { LinkOutlined, UserOutlined } from "@ant-design/icons";

function FinishHiring(chosenApplicantAllJobApplicationDetails) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const finalRef = useRef(null)

    useEffect(() => {
        
    }, [])

    return(
        <>
        
        <Grid
        mb='20px'
        minW='1000px'
        minH='300px'
        height='300px'
        templateColumns='repeat(1, 1fr)'
        gap='5'
        >
            <GridItem border='solid 0.2px lightgray'>
                <Flex justify='center' align='center' height='100%'>
                <Text fontSize='30px' color='black' fontWeight='500' mb='10px' textAlign='center'>
                <UserOutlined/>&nbsp;
                {chosenApplicantAllJobApplicationDetails.chosenApplicantAllJobApplicationDetails.applicantJoinedDetails[0].firstNameM}&nbsp;
                {chosenApplicantAllJobApplicationDetails.chosenApplicantAllJobApplicationDetails.applicantJoinedDetails[0].lastNameM}
                </Text>
                
                <Button size='lg' colorScheme='green' ml='10px'
                onClick={onOpen}
                >Finish Hiring Applicant</Button>
                </Flex>
                <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
                        <ModalOverlay />
                        <ModalContent
                        borderRadius='0'
                        maxW='500px'
                        >
                        <ModalHeader>Finish Hiring Applicant Confirmation</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                           Are you sure you want to finish hiring for {chosenApplicantAllJobApplicationDetails.chosenApplicantAllJobApplicationDetails.applicantJoinedDetails[0].firstNameM} {chosenApplicantAllJobApplicationDetails.chosenApplicantAllJobApplicationDetails.applicantJoinedDetails[0].lastNameM}?
                        </ModalBody>

                        <ModalFooter>
                            <Button colorScheme='red' mr={3} onClick={onClose} borderRadius='0' size='sm' variant='outline'>
                            Cancel
                            </Button>
                            <Button variant='ghost' size='sm' borderRadius='0' colorScheme="green" onClick={() => {
                                onClose()
                                axios.post(`${process.env.REACT_APP_SYS_URL}/api/admin/applicant-screening/finish-hiring`, chosenApplicantAllJobApplicationDetails.chosenApplicantAllJobApplicationDetails)
                                    .then(response => window.location.reload())
                            }}>Confirm</Button>
                        </ModalFooter>
                        </ModalContent>
                    </Modal>
            </GridItem>
                
            
        </Grid>
        </>
    )
}


export default FinishHiring;