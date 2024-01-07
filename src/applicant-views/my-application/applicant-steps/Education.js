import { DeleteOutlined } from "@ant-design/icons";
import { Input, Text, Stack, Card, CardHeader, CardBody, StackDivider, Box, Heading, ButtonGroup, Button, Flex} from "@chakra-ui/react";
import { getValue } from "@testing-library/user-event/dist/utils";
import React, { useEffect, useState } from "react";


function PersonalInformation({applicantData, setFieldValue, jobApplicationDetails}) {
    const [educationGroup, setEducationGroup] = useState([{university: '', degreeProgram: '', finishDate: ''}]);
    const addEducation = () => {
        setEducationGroup([...educationGroup, { university: '', degreeProgram: '', finishDate: '' }])
    }
    
    useEffect(() => {
        setFieldValue('education', educationGroup)
    }, [educationGroup])

    useEffect(() => {
        if (jobApplicationDetails.education) {
            setEducationGroup(jobApplicationDetails.education)
        }
    }, [])
    
    return(
        <>
        {
        educationGroup.map((_, index) =>
        <Card
        key={index}
        mt='3'
        maxW='600px'
        border='solid 0.2px black'
        >
        <Heading size='md' fontWeight='500' margin='20px 0px 0px 20px'>Education {index+1}</Heading>
        <CardBody>
            <Button
            fontSize='12px'
            color='gray'
            size='xs'
            float='right'
            variant='ghost'
            fontWeight='500'
            onClick={()=> {
                const updatedEducationGroup = educationGroup.filter((_, i) => i !== index);
                setEducationGroup(updatedEducationGroup);
            }}
            >
                <DeleteOutlined />&nbsp;
                Delete Education</Button>
            <Stack spacing='3'>
            <Box>
                <Text fontSize='xs' color='gray'>University/Institution</Text>
                <Input
                maxW='350px'
                size='sm'
                border='solid 0.2px black'
                value={educationGroup[index].university}
                onChange={(e) => {
                    const updatedEducationGroup = [...educationGroup]
                    updatedEducationGroup[index].university = e.target.value;
                    setEducationGroup(updatedEducationGroup);
                }}
                ></Input>
            </Box>
            <Box>
                <Text fontSize='xs' color='gray'>
                Degree Program
                </Text>
                <Input
                maxW='350px'
                size='sm'
                border='solid 0.2px black'
                value={educationGroup[index].degreeProgram}
                onChange={(e) => {
                    const updatedEducationGroup = [...educationGroup]
                    updatedEducationGroup[index].degreeProgram = e.target.value;
                    setEducationGroup(updatedEducationGroup);
                }}
                ></Input>
            </Box>
            <Box>
                <Box fontSize='xs' color='gray'>
                Date finished / Projected Finish date
                </Box>
                <Input
                maxW='350px'
                size='sm'
                placeholder='format: MM/YYYY'
                border='solid 0.2px black'
                onChange={(e) => {
                    const updatedEducationGroup = [...educationGroup]
                    updatedEducationGroup[index].finishDate = e.target.value;
                    setEducationGroup(updatedEducationGroup);
                }}
                ></Input>
            </Box>
            </Stack>
        </CardBody>
        </Card>
        
         )}
         <Flex justify='end' mt='4' maxW='600px'>
          <Button
            variant='solid'
            bg='#FFFDD0'
            borderRadius='0px'
            border='solid 0.2px black'
            colorScheme="yellow"
            fontWeight='500'
            size='sm'
            mb='20px'
            onClick={addEducation}
            >+ Add Education</Button>
        </Flex>
        </>
    )
}


export default PersonalInformation;