import { Box, Button, Card, CardBody, CardFooter, CardHeader, Flex, Grid, Image, Text } from "@chakra-ui/react";
import React from "react";
import AuthHeader from "../../auth/AuthHeader";
import { useLocation, useNavigate } from "react-router-dom";
import tcsLogo from '../../tcs-dark-logo.png'

function InterviewIntroduction() {
  const navigate = useNavigate()
  const location = useLocation();
  const applicantData = location.state.applicantData
  const token = location.state.token

   return(
    <>
      <Box
        height='100vh'
        width='100vw'
        bg='tcs.dirtywhite'
        position='fixed'
        margin='0px'
        >
       

        <AuthHeader/>
        <Flex
        justify='center'
        height='100%'
        pb='10%'
        >
          <Card
          width='100%'
          maxW='560px'
          minH='500px'
          mt='100px'
          borderRadius='0px'
          height='100%'
          maxH='500px'
          pt='50px'

          >
            <Flex justify='center' mb='20px'>
              <Image src={tcsLogo} width='80px'></Image>
            </Flex>
            
           
            <CardBody fontSize='14px' textAlign='justify'>
               <Text
               fontWeight='800'
               mb='2'
                >Hello, {applicantData.firstNameM}, {applicantData.lastNameM}!</Text>
                <Text>Welcome to the next step, your <strong>Video Interview.</strong></Text>
                <br></br>
                <Text>
                  We understand the importance of this process, so we have created a quick, convenient experience designed to help you introduce yourself and your skill set to us here at The Coding School.
                </Text>
                <br></br>
                <Text>
                  To get started, you will need a <strong>front-facing camera and microphone.</strong>
                </Text>
                <Flex
                justify='center'
                >
                  <Button
                mt='70px'
                size='md'
                width='170px'
                bg='tcs.main'
                borderRadius='0px'
                color='white'
                colorScheme='facebook'
                onClick={() => {
                  navigate('/video-interview/what-to-expect', {state: {applicantData: applicantData, token: token}})
                }}
                >Continue</Button>

                </Flex>
                
            </CardBody>
              
          </Card>
        </Flex>
       </Box>
        
      
    </>
   ) 
}


export default InterviewIntroduction;