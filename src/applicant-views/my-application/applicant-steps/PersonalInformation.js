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
        <Text color='gray'>First Name</Text>
        <Text mb='4'>{applicantData.firstNameM}</Text>

        <Text color='gray'>Last Name</Text>
        <Text mb='4'>{applicantData.lastNameM}</Text>

        <Text color='gray'>Email Address</Text>
        <Text mb='4'>{applicantData.emailM}</Text>

        <Text color='gray'>Birthday</Text>
        <DatePicker onChange={onChange} size='large' style={{border: 'solid 0.2px black', borderRadius: '2px', marginBottom: '15px', width:'300px'}}/>
        
        <Text color='gray'>Contact Number</Text>
        <Input
        size='sm'
        border='solid 0.2px black'
        width='300px'
        ></Input>

       
        </>
    )
}


export default PersonalInformation;