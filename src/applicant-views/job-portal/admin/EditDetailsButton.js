import { Button, useDisclosure } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { FormControl, FormLabel, TextArea, Input, Select, Modal, ModalBody, ModalOverlay, ModalFooter, Textarea, ModalContent, ModalHeader, ModalCloseButton} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";

function EditDetailsButton({id, fetchJobsList}) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const initialRef = useRef(null)

    const [toUpdateJob, setToUpdateJob] = useState({});

    const getJob = async (id) => {
        const response = await axios.get(`http://localhost:3001/api/get-job-to-update/${id}`)
        setToUpdateJob(response.data.jobToUpdate)
    }

    const updateJobDetails = (job) => {
        axios.put('http://localhost:3001/api/update-job', job)
            .then(() => {
              fetchJobsList()
              onClose()
                // fetchJobsList()
                    // .then(() => onClose())
            })
    }

    useEffect(() => {
    }, [toUpdateJob])

    return(
        <>
       <Button
       onClick={()=> {
        getJob(id)
            .then(() => onOpen())
       }}
       zIndex='0'
       mt='10px'
       size='sm'
       borderRadius='0px'
       fontWeight='1000'
       width='100px'
       boxShadow='5px 5px 5px lightgray'
       >
        Edit Details
        </Button>


        <Modal
        initialFocusRef={initialRef}
        isOpen={isOpen}
        onClose={onClose}
        >
        <ModalOverlay/>
        <ModalContent
        maxW='600px'
        >
          <ModalHeader>Update Job</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={3}>
            <Formik
            initialValues={{jobTitle:toUpdateJob.jobTitleM, jobLocation: toUpdateJob.jobLocationM, jobDescription: toUpdateJob.jobDescriptionM, jobResponsibilities: toUpdateJob.jobResponsibilitiesM, jobQualifications: toUpdateJob.jobQualificationsM, jobSegmentation:toUpdateJob.jobSegmentationM, jobId: id}}
            onSubmit={updateJobDetails}
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
                Update Job
              </Button>
              <Button onClick={onClose} size='sm'>Cancel</Button>
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


export default EditDetailsButton;