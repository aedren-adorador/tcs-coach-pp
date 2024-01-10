import React, { useEffect, useRef } from "react";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure, FormControl, FormLabel, Input, Button, Select, Textarea } from '@chakra-ui/react'
import { Formik, Form } from "formik";
import axios from "axios";

function CreateJobButton({fetchJobsList}) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const initialRef = useRef(null)
    
    const handleCreateJobSubmit = (job) => {
      axios.post('http://localhost:3001/api/create-job', job)
        .then(() => {
          fetchJobsList()
          onClose()
        })
    }

    return(
        <>
        <Modal
        initialFocusRef={initialRef}
        isOpen={isOpen}
        onClose={onClose}
        >
        <ModalOverlay/>
        <ModalContent
        maxW='600px'
        >
          <ModalHeader>Create Job</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={3}>
            <Formik
            initialValues={{jobTitle:'', jobLocation: '', jobDescription: '', jobResponsibilities: '', jobQualifications: '', jobSegmentation:''}}
            onSubmit={handleCreateJobSubmit}
            >
            {(formikProps) => (
              <Form>
              <FormControl>
                <FormLabel fontSize='12px'>Job Title</FormLabel>
                <Input
                size='sm'
                fontSize='12px'
                {...formikProps.getFieldProps('jobTitle')}
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel fontSize='12px'>Job Location</FormLabel>
                <Select
                placeholder='Select job location'
                size='sm'
                fontSize='12px'
                {...formikProps.getFieldProps('jobLocation')}
                >
                  <option value="Online/Remote">Online/Remote</option>
                  <option value="Onsite">Onsite</option>
                  <option value="Hybrid">Hybrid</option>
                </Select>
              </FormControl>
              <FormControl mt={4}>
                <FormLabel fontSize='12px'>Job Description</FormLabel>
                <Textarea
                size='sm'
                minH='50px'
                fontSize='12px'
                {...formikProps.getFieldProps('jobDescription')}
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel fontSize='12px'>Responsibilities</FormLabel>
                <Textarea
                size='sm'
                minH='50px'
                fontSize='12px'
                {...formikProps.getFieldProps('jobResponsibilities')}
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel fontSize='12px'>Qualifications</FormLabel>
                <Textarea
                size='sm'
                minH='50px'
                fontSize='12px'
                {...formikProps.getFieldProps('jobQualifications')}
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel fontSize='12px'>Job Segmentation</FormLabel>
                <Select
                placeholder='Select expertise level'
                size='sm'
                fontSize='12px'
                {...formikProps.getFieldProps('jobSegmentation')}
                >
                  <option value="Fresh Grads/Entry Level">Fresh Grads/Entry Level</option>
                  <option value="Mid Level">Mid Level</option>
                  <option value="Senior Level">Senior Level</option>
                  </Select>
              </FormControl>  
              <ModalFooter>
              <Button colorScheme='blue' mr={3} size='sm' type='submit'>
                Create Job
              </Button>
              <Button onClick={onClose} size='sm'>Cancel</Button>
            </ModalFooter>
              </Form>
            )}
            </Formik>
          </ModalBody>

          
        </ModalContent>
      </Modal>

      <Button
      onClick={onOpen}
      ml='20px'
      size='lg'
      variant='outline'
      borderRadius='0px'
      color='#0C3C55'
      borderColor='#0C3C55'
      >Create Job</Button>
        </>
    )
}

export default CreateJobButton;