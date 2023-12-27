import React from "react";
import { TableContainer, Table, TableCaption, Thead, Tr, Th, Tbody, Td, Button, Modal, ModalOverlay, ModalBody, ModalHeader, ModalContent, ModalCloseButton, ModalFooter, FormControl, FormLabel, Input, useDisclosure, Text, Textarea} from "@chakra-ui/react";
import { Formik, Form } from "formik";

function JobOpeningsAdmin() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const initialRef = React.useRef(null)

    const handleSubmit = (values) => {
        console.log(values)
    }

    return(
        <>
        <Button
        margin='auto'
        colorScheme='green'
        size='sm'
        mt='20px'
        onClick={onOpen}
        >Create New Job Post</Button>
       <TableContainer mt='20px'>
        <Table variant='striped' colorScheme="gray">
            <TableCaption>TCS Coach++ Job Openings</TableCaption>
            <Thead>
            <Tr>
                <Th>Job ID</Th>
                <Th>Job Title</Th>
                <Th>Date Published</Th>
                <Th>Status</Th>
                <Th>Applicants</Th>
                <Th>Action</Th>
            </Tr>
            </Thead>
            <Tbody>
            <Tr>
                <Td>260602</Td>
                <Td>ReactJS Web Dev Coach</Td>
                <Td>August 24, 2023</Td>
                <Td>Accepting Applications</Td>
                <Td>47</Td>
                <Td><Button size='sm' colorScheme='blackAlpha'>Edit Job Post</Button></Td>
            </Tr>
            <Tr>
                <Td>458212</Td>
                <Td>Python Coach</Td>
                <Td>September 15, 2023</Td>
                <Td>Accepting Applications</Td>
                <Td>21</Td>
                <Td><Button size='sm' colorScheme='blackAlpha'>Edit Job Post</Button></Td>
            </Tr>
            <Tr>
                <Td>813413</Td>
                <Td>Financial Literacy Coach</Td>
                <Td>September 15, 2023</Td>
                <Td>Accepting Applications</Td>
                <Td>34</Td>
                <Td><Button size='sm' colorScheme='blackAlpha'>Edit Job Post</Button></Td>
            </Tr>
            <Tr>
                <Td>623421</Td>
                <Td>Business Intelligence Coach</Td>
                <Td>Decemer 5, 2023</Td>
                <Td>Closed Applications</Td>
                <Td>60</Td>
                <Td><Button size='sm' colorScheme='blackAlpha'>Edit Job Post</Button></Td>
            </Tr>
            </Tbody>
        </Table>
        </TableContainer>

        <Modal
            initialFocusRef={initialRef}
            isOpen={isOpen}
            onClose={onClose}
        >
            <ModalOverlay/>
            <ModalContent maxW='700px'>
            <ModalHeader>Create New Job Posting</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>

                <Formik
                initialValues={{jobTitle: '', jobDescription: '', jobQualifications: ''}}
                onSubmit={handleSubmit}
                >
                {(formikProps) => (
                    <Form>
                    <FormControl>
                    <FormLabel>Job Title</FormLabel>
                    <Input
                    ref={initialRef}
                    placeholder='Insert job title...'
                    border='solid 1px'
                    {...formikProps.getFieldProps('jobTitle')}
                    />
                    </FormControl>

                    <FormControl mt={4}>
                    <FormLabel>Description</FormLabel>
                    <Textarea
                    placeholder='Insert job description...' 
                    border='solid 1px'
                    {...formikProps.getFieldProps('jobDescription')}
                    />
                    </FormControl>

                    <FormControl mt={4}>
                    <FormLabel>Job Qualifications</FormLabel>
                    <Textarea
                    placeholder='Insert qualifications...'
                    border='solid 1px'
                    {...formikProps.getFieldProps('jobQualifications')}
                    />
                    </FormControl>
                    <ModalFooter  padding='30px 0px 0px 0px'>
                        <Button type='submit' colorScheme='blue' mr={3}>
                        Create
                        </Button>
                        <Button onClick={onClose}  border='solid red' margin='0'>Cancel</Button>
                    </ModalFooter>
                    </Form>
                )}
                </Formik>
            </ModalBody>

            
            </ModalContent>
        </Modal>
            
        </>
    )
}

export default JobOpeningsAdmin;