import React, { useEffect, useRef } from "react";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure, FormControl, FormLabel, Input, Button, Select, Textarea, useRadio, useRadioGroup, HStack, RadioGroup } from '@chakra-ui/react'
import { Formik, Form } from "formik";
import axios from "axios";

function CreateJobButton({fetchJobsList}) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const initialRef = useRef(null)
    
    const handleCreateJobSubmit = (job) => {
      axios.post(`${process.env.REACT_APP_SYS_URL}/api/admin/job-portal-action/create-job`, job)
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
        margin='15px 5% 0px 5%'
        >
          <ModalHeader>Create Job</ModalHeader>
          <ModalCloseButton />
          <ModalBody>

            <Formik
            initialValues={{jobTitle:'', jobLocation: '', jobDescription: '', jobResponsibilities: '', jobQualifications: '', jobSegmentation:'', jobCategory: ''}}
            onSubmit={handleCreateJobSubmit}
            >
            {(formikProps) => (
              <Form>
              <FormControl>
                <FormLabel fontSize='12px'>Job Title</FormLabel>
                <Input
                required
                size='sm'
                fontSize='12px'
                {...formikProps.getFieldProps('jobTitle')}
                />
              </FormControl>
              <FormControl mt={2}>
                <FormLabel fontSize='12px'>Job Location</FormLabel>
                <Select
                placeholder='Select job location'
                size='sm'
                fontSize='12px'
                required
                {...formikProps.getFieldProps('jobLocation')}
                >
                  <option value="Online/Remote">Online/Remote</option>
                  <option value="Onsite">Onsite</option>
                  <option value="Hybrid">Hybrid</option>
                </Select>
              </FormControl>
              <FormControl mt={2}>
                <FormLabel fontSize='12px'>Job Description</FormLabel>
                <Textarea
                required
                size='sm'
                minH='50px'
                fontSize='12px'
                {...formikProps.getFieldProps('jobDescription')}
                />
              </FormControl>
              <FormControl mt={2}>
                <FormLabel fontSize='12px'>Responsibilities</FormLabel>
                <Textarea
                required
                size='sm'
                minH='50px'
                fontSize='12px'
                {...formikProps.getFieldProps('jobResponsibilities')}
                />
              </FormControl>
              <FormControl mt={2}>
                <FormLabel fontSize='12px'>Qualifications</FormLabel>
                <Textarea
                required
                size='sm'
                minH='50px'
                fontSize='12px'
                {...formikProps.getFieldProps('jobQualifications')}
                />
              </FormControl>
              <FormControl mt={2}>
                <FormLabel fontSize='12px'>Job Segmentation</FormLabel>
                <Select
                required
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
              <FormControl mt={2}>
                <FormLabel fontSize='12px'>Job Category</FormLabel>
                <Select
                required
                placeholder='Select job category'
                size='sm'
                fontSize='12px'
                {...formikProps.getFieldProps('jobCategory')}
                >
                  <option value='Web Development'>Web Development</option>
                  <option value='Web3'>Web3</option>
                  <option value='Robotics'>Robotics</option>
                  <option value='Learning Intern'>Learning Intern</option>
                  <option value='Learning Associate'>Learning Associate</option>
                  <option value='Intern'>Intern</option>
                  <option value='Game Development'>Game Development</option>
                  <option value='Mobile Development'>Mobile Development</option>
                  <option value='SEO Marketing'>Data Science</option>
                  <option value='Data Structures and Algorithms'>Data Structures and Algorithms</option>
                  <option value='Artificial Intelligence'>Artificial Intelligence</option>
                  </Select>
              </FormControl>  
              <ModalFooter>
              <Button onClick={onClose} size='sm' mr={3}>Cancel</Button>
              <Button colorScheme='blue' size='sm' type='submit'>
                Create Job
              </Button>
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