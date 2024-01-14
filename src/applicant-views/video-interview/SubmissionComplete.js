import { Box, Button, Card, CardBody, CardFooter, CardHeader, Flex, Grid, Image, Text } from "@chakra-ui/react";
import React, { useEffect } from "react";
import AuthHeader from "../../auth/AuthHeader";
import { CameraFilled, QuestionCircleOutlined, SettingOutlined, VideoCameraFilled } from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";

function SubmissionComplete() {
    const navigate = useNavigate()
    const location = useLocation()
    const applicantData = location.state.applicantData
    const submittedJobApplicationDetails = location.state.submittedJobApplicationDetails
    console.log(submittedJobApplicationDetails)
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
            <Flex
            mt='100px'
            direction='column'
            justify='center'
            align='center'
            gap='20'
            >
                <Text
              textAlign='center'
              >Your answers have been submitted. Please click the button below to continue.</Text>
              <Button
              bg='tcs.main'
              colorScheme='facebook'
              color='white'
              width='150px'
              fontSize='14px'
              fontWeight='600'
              borderRadius='0px'
              onClick={() => {
                navigate('/video-interview/finish', 
                 {state: {applicantData: applicantData, submittedJobApplicationDetails: submittedJobApplicationDetails}, })
              }}
              >Continue</Button>
            </Flex>
              
            </CardBody>
              <CardFooter
            bg='tcs.dirtywhite'
            fontSize='12px'
            >
                <Flex gap='10' ml='20px'>
                    <Text
                    color='tcs.linky'
                    textDecoration='underline'
                    ><QuestionCircleOutlined/> Help</Text>
                    <Text
                    color='tcs.linky'
                    textDecoration='underline'
                    ><SettingOutlined/> Settings</Text>
                </Flex>
            </CardFooter>
          </Card>
        </Flex>
       </Box>

        </>
    )
}

export default SubmissionComplete;