import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import { Box, Button, Card, CardBody, CardHeader, Grid, GridItem, Input, Text } from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";

function Account({applicantData}) {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isChangePasswordClicked, setIsChangePasswordClicked] = useState(false);
    const [isSettingNewPassword, setIsSettingNewPassword] = useState(false);

    const setNewPassword = (newPassword) => {
        setIsSettingNewPassword(true)
        const details = {newPassword: newPassword, applicantEmail: applicantData.emailM, applicantID: applicantData._id, applicantFirstName: applicantData.firstNameM}
        axios.post(`${process.env.REACT_APP_SYS_URL}/api/general-request/set-new-password`, details)
            .then(response => {
                console.log(response)
                setIsSettingNewPassword(false)
                setIsChangePasswordClicked(current => !current)
            })
    }

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
                        <Text>{applicantData.firstNameM}</Text>
                    </GridItem>


                    <GridItem>
                        <Text color='gray'>Last Name</Text>
                    </GridItem>
                        

                    <GridItem>
                        <Text>{applicantData.lastNameM}</Text>
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

export default Account;