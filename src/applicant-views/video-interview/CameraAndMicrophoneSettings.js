import { Box, Button, Card, CardBody, CardFooter, CardHeader, Flex, Grid, Image, Text } from "@chakra-ui/react";
import React, { useEffect } from "react";
import AuthHeader from "../../auth/AuthHeader";
import { useLocation, useNavigate } from "react-router-dom";
import tcsLogo from '../../tcs-dark-logo.png'
import interviewIcon from '../../admin-views/admin-view-imgs/review-application.png'
import { CameraFilled, VideoCameraFilled } from "@ant-design/icons";
import { CheckCircleIcon } from "@chakra-ui/icons";

function CameraAndMicrophoneSettings() {
    const location = useLocation();
    const applicantData = location.state.applicantData
    const token = location.state.token
    const navigate = useNavigate();

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
          pt='50px'
          maxH='500px'

          >
            <CardBody fontSize='14px' textAlign='justify'>
               <Text
               fontSize='20px'
               fontWeight='800'
               mb='2'
               textAlign='center'
                >Camera and Microphone Settings</Text>
                <Flex
                padding='0px 20px'
                align='center'
                gap='10'
                direction='column'
                mt='60px'
                >
                  <Flex
                  width='100%'
                  justify='space-around'>
                    <Box color='green'><CheckCircleIcon color='green'/> Good!</Box>
                    <Text  fontWeight='700'>Video</Text>
                  </Flex>

                  <Flex
                  width='100%'
                  justify='space-around'>
                    <Box color='green'><CheckCircleIcon color='green'/> Good!</Box>
                    <Text fontWeight='700'>Audio</Text>
                  </Flex>
                 
                </Flex>
                
                <br></br>
              
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
                  navigate('/video-interview/instructions', {state: {applicantData: applicantData, token: token}})
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

export default CameraAndMicrophoneSettings;