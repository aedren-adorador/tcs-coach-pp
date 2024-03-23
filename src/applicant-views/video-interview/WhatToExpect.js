import { Box, Button, Card, CardBody, CardFooter, CardHeader, Flex, Grid, Image, Text } from "@chakra-ui/react";
import React, { useEffect } from "react";
import AuthHeader from "../../auth/AuthHeader";
import { useLocation, useNavigate } from "react-router-dom";
import tcsLogo from '../../tcs-dark-logo.png'
import interviewIcon from '../../admin-views/admin-view-imgs/review-application.png'
import { CameraFilled, VideoCameraFilled } from "@ant-design/icons";

function WhatToExpect() {
    const location = useLocation();
    const applicantData = location.state.applicantData
    const token = location.state.token
    const submittedJobApplicationDetails = location.state.submittedJobApplicationDetails
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
           height='100%'
          pt='50px'
          maxH='500px'

          >
            <CardBody fontSize='14px' textAlign='justify'>
               <Text
               fontSize='20px'
               fontWeight='800'
               mb='2'
                >What you can expect:</Text>
                <Flex
                padding='0px 20px'
                justify='space-between'
                align='center'
                gap='10'
                >
                  <Image
                  margin='20px'
                  src={interviewIcon}
                  width='350px'
                  ></Image>
                  <Box
                  align='center'
                  width='100%'
                  >
                    
                    <Flex fontSize='15px' align='center'>
                      <VideoCameraFilled style={{fontSize: '30px'}}/>
                      &nbsp;&nbsp;{submittedJobApplicationDetails[0][0].interviewQuestionsM.length}&nbsp;Video Questions
                    </Flex>

                  </Box>
                </Flex>
                
                <br></br>
                <Text
                mt='20px'
                textAlign='center'
                >
                  This should be approximately <strong>50 minutes</strong> to complete.
                </Text>
                <br></br>
                <Flex
                justify='center'
                >
                  <Button
                mt='70px'
                size='md'
                width='170px'
                bg='tcs.main'
                color='white'
                colorScheme='facebook'
                onClick={() => {
                  navigate('/video-interview/camera-and-microphone-settings', {state: {applicantData: applicantData, token: token, submittedJobApplicationDetails: submittedJobApplicationDetails}})
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

export default WhatToExpect;