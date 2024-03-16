import { CheckIcon, CloseIcon, DragHandleIcon, EditIcon } from "@chakra-ui/icons";
import { Box, Button, Card, CardBody, CardHeader, Flex, Grid, GridItem, Input, Text, useToast } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";

function AdminAccount({adminData}) {
    const toast = useToast();
    const [firstName, setFirstName] = useState(adminData.firstNameM);
    const [lastName, setLastName] = useState(adminData.lastNameM);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isChangePasswordClicked, setIsChangePasswordClicked] = useState(false);
    const [isSettingNewPassword, setIsSettingNewPassword] = useState(false);
    const [isEditingFirstName, setIsEditingFirstName] = useState(false);
    const [isEditingLastName, setIsEditingLastName] = useState(false);
    const [isEditingEmail, setIsEditingEmail] = useState(false);
    const [isSettingNewEmail, setIsSettingNewEmail] =useState(false);

    const setNewPassword = (newPassword) => {
        setIsSettingNewPassword(true)
        const details = {newPassword: newPassword, applicantEmail: adminData.emailM, applicantID: adminData._id, applicantFirstName: adminData.firstNameM}
        axios.post(`${process.env.REACT_APP_SYS_URL}/api/general-request/set-new-password`, details)
            .then(response => {
                console.log(response)
                setIsSettingNewPassword(false)
                setIsChangePasswordClicked(current => !current)
                setTimeout(() => {
                    toast({
                    title: 'Password verification email sent.',
                    description: "We've sent a link in your email address.",
                    status: 'success',
                    duration: 9000,
                    isClosable: true,
                    position: 'top',
                    containerStyle: {
                        fontWeight: '400px'
                    }
                    })

                }, 500)
                
            })
    }

    const handleFirstNameChange = (firstName) => {
        const details = {applicantID: adminData._id, applicantFirstName: firstName}
        axios.post(`${process.env.REACT_APP_SYS_URL}/api/general-request/set-new-first-name-admin`, details)
            .then(response => {
                setTimeout(() => {
                    setIsEditingFirstName(false)
                }, 1000)
                    window.location.reload() 
            })
    }

    const handleLastNameChange = (lastName) => {
        const details = {applicantID: adminData._id, applicantLastName: lastName}
        axios.post(`${process.env.REACT_APP_SYS_URL}/api/general-request/set-new-last-name-admin`, details)
            .then(response => {
                setTimeout(() => {
                    setIsEditingLastName(false)
                }, 1000)
                    window.location.reload()                
            })
    }

    const handleEmailChange = (email) => {
        setIsSettingNewEmail(true)
        const details = {applicantID: adminData._id, applicantEmail: email, applicantFirstName: adminData.firstNameM}
        axios.post(`${process.env.REACT_APP_SYS_URL}/api/general-request/set-new-email`, details)
            .then(response => {
                setIsEditingEmail(false)
                toast({
                    title: 'Verification link sent to new email.',
                    description: "Check email to activate your new email.",
                    status: 'success',
                    duration: 9000,
                    isClosable: true,
                    position: 'top',
                    containerStyle: {
                        fontWeight: '400px'
                    }
                    })
                setIsSettingNewEmail(false)
                           
            })
    }

    useEffect(() => {
        console.log(email)
    }, [firstName, lastName, adminData, email])

    return(
        <>
        <Card margin='40px' maxW='600px' minW='600px'>
            <CardHeader>Account Information</CardHeader>
            <CardBody>
                <Grid
                mb='3'
                gap='2'
                maxW='600px'
                templateColumns='repeat(2, 1fr)'
                >
                    <GridItem>
                        <Text color='gray'>First Name</Text>
                    </GridItem>
                        

                    <GridItem>
                        {isEditingFirstName ?
                        <>
                        <Flex gap='1'>
                        <Input size='xs' placeholder={firstName} onKeyUp={(e) => setFirstName(e.target.value)}></Input>
                        <Button
                        _hover={{backgroundColor: 'darkgray'}}
                        bg='gray'
                        color='white'
                        size='xs'
                        borderRadius='0px'
                        width='30px'
                        onClick={()=>setIsEditingFirstName(current => !current)}
                        ><CloseIcon/></Button>

                        <Button
                        onClick={()=>handleFirstNameChange(firstName)}
                        bg='tcs.mongo'
                        color='white'
                        colorScheme='green'
                        size='xs'
                        borderRadius='0px'
                        width='30px'
                        ><CheckIcon/></Button>
                        </Flex>
                        
                        </>:
                        <Text>{adminData.firstNameM} <EditIcon fontSize='12px' onClick={()=>setIsEditingFirstName(current => !current)}/></Text>
                        }
                    </GridItem>


                    <GridItem>
                        <Text color='gray'>Last Name </Text>
                    </GridItem>
                        

                    <GridItem>
                        {isEditingLastName ?
                        <>
                        <Flex gap='1'>
                        <Input size='xs' placeholder={lastName} onKeyUp={(e) => setLastName(e.target.value)}></Input>
                        <Button
                        _hover={{backgroundColor: 'darkgray'}}
                        bg='gray'
                        color='white'
                        size='xs'
                        borderRadius='0px'
                        width='30px'
                        onClick={()=>setIsEditingLastName(current => !current)}
                        ><CloseIcon/></Button>
                        <Button
                        onClick={()=>handleLastNameChange(lastName)}
                        bg='tcs.mongo'
                        color='white'
                        colorScheme='green'
                        size='xs'
                        borderRadius='0px'
                        width='30px'
                        ><CheckIcon/></Button>
                        </Flex>
                        
                        </>
                        :
                        <Text>{adminData.lastNameM} <EditIcon fontSize='12px' onClick={()=>setIsEditingLastName(current => !current)}/></Text>
                        }
                        
                    </GridItem>

                     <GridItem>
                        <Text color='gray'>Email</Text>
                    </GridItem>
                        
                    
                    <GridItem>
                        {isSettingNewEmail ?
                        <Button
                        isLoading
                        loadingText='sending confirmation link'
                        bg='tcs.mongo'
                        color='white'
                        colorScheme='green'
                        size='xs'
                        borderRadius='0px'
                        ><CheckIcon/></Button>
                        :
                        <>
                             {isEditingEmail ? 
                        <>
                        <Flex gap='1'>
                        <Input size='xs' onKeyUp={(e) => setEmail(e.target.value)} placeholder='Set new email'></Input>
                        <Button
                        _hover={{backgroundColor: 'darkgray'}}
                        bg='gray'
                        color='white'
                        size='xs'
                        borderRadius='0px'
                        width='30px'
                        onClick={()=>setIsEditingEmail(current => !current)}
                        ><CloseIcon/></Button>
                        {email && (email.slice(-10) === "@gmail.com" || email.slice(-10) === '@coding.ph')?
                        <Button
                        onClick={()=>handleEmailChange(email)}
                        bg='tcs.mongo'
                        color='white'
                        colorScheme='green'
                        size='xs'
                        borderRadius='0px'
                        width='30px'
                        ><CheckIcon/></Button>
                        :
                         <Button
                        isDisabled
                        bg='tcs.mongo'
                        color='white'
                        colorScheme='green'
                        size='xs'
                        borderRadius='0px'
                        width='30px'
                        ><CheckIcon/></Button>
                        }
                        
                       
                        </Flex>
                        
                        </>
                        :
                        <Text>{adminData.emailM} <EditIcon fontSize='12px' onClick={()=>setIsEditingEmail(current => !current)}/></Text>
                        }
                        </>
                        }
                    </GridItem>
                    
                    {isChangePasswordClicked ? 
                    <>
                    <GridItem>
                        <Text color='gray'>New password</Text>
                    </GridItem>
                        

                    <GridItem>
                        <Input
                        type='password'
                        onKeyUp={(e) => setPassword(e.target.value)}
                        size='xs'
                        borderRadius='0px'
                        border='solid 0.2px'></Input>
                    </GridItem>

                    <GridItem>
                        <Text color='gray'>Confirm new password</Text>
                    </GridItem>
                        

                    <GridItem>
                        <Input
                        type='password'
                        onKeyUp={(e) => setConfirmPassword(e.target.value)}
                        size='xs'
                        borderRadius='0px'
                        border='solid 0.2px'
                        ></Input>
                    </GridItem>

                    <GridItem>
                    </GridItem>
                        

                    <GridItem>
                                {password.length >= 12 || confirmPassword.length >=12 ? 
                        <Text fontSize='10px' color='green' id='5' > <CheckIcon h='2'/>&nbsp;12 characters minimum</Text>
                        :
                        <Text fontSize='10px' color='red' id='5'> <CloseIcon h='2'/>&nbsp;12 characters minimum</Text>
                        }

                        {/[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(password) || /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(confirmPassword) ? 
                        <Text fontSize='10px' color='green' id='5'> <CheckIcon h='2'/>&nbsp;1 special character</Text>
                        :
                        <Text fontSize='10px' color='red' id='5'> <CloseIcon h='2'/>&nbsp;1 special character</Text>
                        }

                        {/[A-Z]/.test(password) || /[A-Z]/.test(confirmPassword) ? 
                        <Text fontSize='10px' color='green' id='5'> <CheckIcon h='2'/>&nbsp;1 uppercase character</Text>
                        :
                        <Text fontSize='10px' color='red' id='5'> <CloseIcon h='2'/>&nbsp;1 uppercase character</Text>
                        }

                        {/[a-z]/.test(password) || /[a-z]/.test(confirmPassword) ? 
                        <Text fontSize='10px' color='green' id='5'> <CheckIcon h='2'/>&nbsp;1 lowercase character</Text>
                        :
                        <Text fontSize='10px' color='red' id='5'> <CloseIcon h='2'/>&nbsp;1 lowercase character</Text>
                        }

                        {password === confirmPassword && password !== '' ? 
                        <Text fontSize='10px' color='green' id='5'> <CheckIcon h='2'/>&nbsp;passwords match</Text>
                        :
                        <Text fontSize='10px' color='red' id='5'> <CloseIcon h='2'/>&nbsp;passwords do not match</Text>
                        }
                    </GridItem>
                    </>
                    :
                    ''
                    }
                </Grid>

                {isChangePasswordClicked &&
                <>
                
                <Button
                isDisabled
                display={(password.length >= 12 || confirmPassword.length >=12) &&
                        (/[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(password) || /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(confirmPassword)) &&
                        (/[A-Z]/.test(password) || /[A-Z]/.test(confirmPassword)) &&
                        (/[a-z]/.test(password) || /[a-z]/.test(confirmPassword)) &&
                        (password === confirmPassword && password !== '') ? 'none' : 'inline-block'}
                bg='tcs.mongo'
                color='white'
                colorScheme='green'
                mt='10px'
                size='xs'
                borderRadius='0px'
                float='right'
                >Save new password</Button>

                {isSettingNewPassword === true &&
                 <Button
                    isLoading
                    loadingText='Saving password'
                    colorScheme='green'
                    variant='outline'
                    size='xs'
                    borderRadius='0px'
                    float='right'
                    mt='10px'
                ></Button>
                }

                <Button
                onClick={() => setNewPassword(password)}
                display={(password.length >= 12 || confirmPassword.length >=12) &&
                        (/[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(password) || /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(confirmPassword)) &&
                        (/[A-Z]/.test(password) || /[A-Z]/.test(confirmPassword)) &&
                        (/[a-z]/.test(password) || /[a-z]/.test(confirmPassword)) &&
                        (isSettingNewPassword === false) &&
                        (password === confirmPassword && password !== '') ? 'inline-block' : 'none'}
                bg='tcs.mongo'
                color='white'
                colorScheme='green'
                mt='10px'
                size='xs'
                borderRadius='0px'
                float='right'
                >Save new password</Button>
                </>
                }

                <Button
                border='solid 0.2px'
                mr={isChangePasswordClicked ? '2' : ''}
                onClick={() => {
                    setIsChangePasswordClicked(current => !current)
                    setPassword('')
                    setConfirmPassword('')
                }}
                mt='10px'
                size='xs'
                borderRadius='0px'
                float='right'
                >{isChangePasswordClicked ? 'Cancel' : 'Change Password'}</Button>

                
            </CardBody>
        </Card>
        </>
    )
}

export default AdminAccount;