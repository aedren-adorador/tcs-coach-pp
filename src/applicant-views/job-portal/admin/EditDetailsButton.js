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
        const response = await axios.get(`${process.env.REACT_APP_SYS_URL}/api/admin/job-portal-action/get-job-to-update/${id}`)
        setToUpdateJob(response.data.jobToUpdate)
    }

    const updateJobDetails = (job) => {
        axios.put(`${process.env.REACT_APP_SYS_URL}/api/admin/job-portal-action/update-job`, job)
            .then(() => {
              fetchJobsList()
              onClose()
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
       fontWeight='400'
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
        margin='15px 5% 0px 5%'
        >
          <ModalHeader>Update Job</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={3}>
            <Formik
            initialValues={{jobTitle:toUpdateJob.jobTitleM, jobLocation: toUpdateJob.jobLocationM, jobDescription: toUpdateJob.jobDescriptionM, jobResponsibilities: toUpdateJob.jobResponsibilitiesM, jobQualifications: toUpdateJob.jobQualificationsM, jobSegmentation:toUpdateJob.jobSegmentationM, jobCategory: toUpdateJob.jobCategoryM, jobId: id}}
            onSubmit={updateJobDetails}
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
                required
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