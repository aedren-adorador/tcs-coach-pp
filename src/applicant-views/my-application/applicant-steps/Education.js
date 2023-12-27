import { DeleteOutlined } from "@ant-design/icons";
import { Input, Text, Stack, Card, CardHeader, CardBody, StackDivider, Box, Heading, ButtonGroup, Button, Flex} from "@chakra-ui/react";
import { getValue } from "@testing-library/user-event/dist/utils";
import React, { useEffect, useState } from "react";


function PersonalInformation({applicantData}) {
    const [educationGroup, setEducationGroup] = useState([{university: '', degreeProgram: '', finishDate: ''}]);
    const addEducation = () => {
        setEducationGroup([...educationGroup, { university: '', degreeProgram: '', finishDate: '' }])
    }
    
    useEffect(() => {
        console.log(educationGroup)
    }, [educationGroup])
    
    return(
        <>
        {
        educationGroup.map((_, index) =>
        <Card key={index} mt='3'>
        <Heading size='md' fontWeight='500' margin='20px 0px 0px 20px'>Education {index}</Heading>
        <CardBody>
            <Button
            size='sm'
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
                <Text color='gray'>University/Institution</Text>
                <Input
                maxW='350px'
                size='sm'
                borderColor='black.500'
                value={educationGroup[index].university}
                onChange={(e) => {
                    const updatedEducationGroup = [...educationGroup]
                    updatedEducationGroup[index].university = e.target.value;
                    setEducationGroup(updatedEducationGroup);
                }}
                ></Input>
            </Box>
            <Box>
                <Text size='xs' color='gray'>
                Degree Program
                </Text>
                <Input
                maxW='350px'
                size='sm'
                borderColor='black.500'
                value={educationGroup[index].degreeProgram}
                onChange={(e) => {
                    const updatedEducationGroup = [...educationGroup]
                    updatedEducationGroup[index].degreeProgram = e.target.value;
                    setEducationGroup(updatedEducationGroup);
                }}
                ></Input>
            </Box>
            <Box>
                <Box size='xs' color='gray'>
                Date finished / Projected Finish date
                </Box>
                <Input
                maxW='350px'
                size='sm'
                placeholder='MM/YYYY'
                borderColor='black.500'
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
         <Flex justify='center' mt='4'>
          <Button
            variant='solid'
            colorScheme="yellow"
            fontWeight='500'
            size='sm'
            float='right'
            onClick={addEducation}
            >+ Add Education</Button>
        </Flex>
        </>
    )
}


export default PersonalInformation;