import { Input, Text, InputGroup, InputLeftAddon, RadioGroup, Stack, Radio } from "@chakra-ui/react";
import { DatePicker } from "antd";
import React, { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import { FormControl } from "@chakra-ui/react";


function PersonalInformation({applicantData}) {
    const [value, setValue] = useState('1')
    const [contactNumberInput, setContactNumberInput] = useState('1');
    const onChange = (value, dateString) => {
    console.log('Selected Time: ', value);
    console.log('Formatted Selected Time: ', dateString);
    };
   
    useEffect(() => {
        setContactNumberInput(value);
    }, [value])
    return(
        <>
        <Text color='gray'>Email</Text>
        <Text mb='4'>{applicantData.emailM}</Text>

        <Text color='gray'>Name</Text>
        <Text mb='4'>{applicantData.firstNameM + ' ' + applicantData.lastNameM}</Text>
        
        <Text color='gray'>Contact Number</Text>

        <RadioGroup onChange={setValue} value={value}>
        <Stack direction='row'>
            <Radio value='1' size='sm'>Philippine Number</Radio>
            <Radio value='2' size='sm'>International Number</Radio>
        </Stack>
        </RadioGroup>
        {contactNumberInput === '1' ?
         <InputGroup size='md'>
            <InputLeftAddon>
            +63
            </InputLeftAddon>
            <Input mb='4' size='md' type='text' placeholder='Insert phone number' maxW='280px' borderColor='black.50'/>
        </InputGroup> :
         <InputGroup>
            <Input mb='4' size='md' type='text' placeholder='Insert phone number' maxW='340px' borderColor='black.50'/>
        </InputGroup> 
        }
       
        <Text color='gray'>Birthday</Text>
        <DatePicker onChange={onChange} size='large' style={{border: 'solid', borderWidth:'1px'}}/>
        </>
    )
}


export default PersonalInformation;