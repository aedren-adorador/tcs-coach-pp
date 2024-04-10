import React, { useEffect, useRef, useState } from "react";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure, FormControl, FormLabel, Input, Button, Select, Textarea, useRadio, useRadioGroup, HStack, RadioGroup, Text, Flex } from '@chakra-ui/react'
import { Formik, Form } from "formik";
import axios from "axios";


function EditJobCategoriesButton({fetchJobsList}) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const initialRef = useRef(null)
    const [fetchedJobCategories, setFetchedJobCategories] = useState([]);
    
    const handleCreateJobSubmit = (job) => {
     
    }

    const addCategory = () => {
        setFetchedJobCategories(prev => {
            const updatedJobCategories = [...prev]
            updatedJobCategories.push('')
            return updatedJobCategories
        })
    }

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_SYS_URL}/api/general-request/fetch-job-categories`)
            .then(response => {
                const categoriesArray = []
                for (let category of response.data) {
                    categoriesArray.push(category.categoryM)
                }
                setFetchedJobCategories(categoriesArray)
            })
    }, [])

    useEffect(() => {
        console.log(fetchedJobCategories)
    }, [fetchedJobCategories])

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
        margin='5%'
        height='80%'
        overflow='auto'
        >
          <ModalHeader>Edit Job Categories</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex direction='column' gap='2'>
            {fetchedJobCategories && fetchedJobCategories.map((category, index) => (
                <Flex gap='2'>
                    <Input size='sm' value={category} readOnly border='solid 0.2px'></Input>
                </Flex>
            ))}
            </Flex>

            <Flex justify='flex-end' mt='5' gap='5'>
                <Button colorScheme='blue' onClick={() => addCategory()}>Add Category</Button>
                <Button colorScheme='green'>Save Categories</Button>
            </Flex>
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
      >Edit Job Categories</Button>
        </>
    )
}

export default EditJobCategoriesButton;