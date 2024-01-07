import { Input, Text, InputGroup, InputLeftAddon, RadioGroup, Stack, Radio } from "@chakra-ui/react";
import { DatePicker, Flex } from "antd";
import React, { useEffect, useState } from "react";
import { Formik, Form, useFormikContext } from "formik";
import { FormControl } from "@chakra-ui/react";


function PersonalInformation({applicantData, getFieldProps}) {
    const [value, setValue] = useState('1')
    const [contactNumberInput, setContactNumberInput] = useState('1');


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
         <Input
         {...getFieldProps('birthday')}
        size='sm'
        border='solid 0.2px black'
        width='300px'
        placeholder='YYYY-MM-DD'
        ></Input>
        
        <Text color='gray'>Contact Number</Text>
        <Input
         {...getFieldProps('contactNumber')}
        size='sm'
        border='solid 0.2px black'
        width='300px'
        ></Input>

       
        </>
    )
}


export default PersonalInformation;