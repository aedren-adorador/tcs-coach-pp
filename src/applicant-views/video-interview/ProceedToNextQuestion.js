import { Box, Button, Card, CardBody, CardFooter, CardHeader, Flex, Grid, Image, Text } from "@chakra-ui/react";
import React, { useEffect } from "react";
import AuthHeader from "../../auth/AuthHeader";
import { useLocation, useNavigate } from "react-router-dom";
import tcsLogo from '../../tcs-dark-logo.png'
import interviewIcon from '../../admin-views/admin-view-imgs/review-application.png'
import { CameraFilled, QuestionCircleOutlined, SettingOutlined, VideoCameraFilled } from "@ant-design/icons";

function ProceedToNextQuestion() {
    const location = useLocation();
    const applicantData = location.state.applicantData
    const token = location.state.token
    const questions = location.state.questions
    const questionCounter = location.state.questionCounter
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
              >Please click the button below when you are ready to continue to the next question.</Text>
              <Button
              bg='tcs.main'
              colorScheme='facebook'
              color='white'
              width='150px'
              fontSize='14px'
              fontWeight='600'
              borderRadius='0px'
              onClick={() => {
                navigate('/video-interview/interview',
                {state: {applicantData: applicantData, token: token, questions: questions, questionCounter: questionCounter, submittedJobApplicationDetails: submittedJobApplicationDetails}})
              }}
              >Next Question</Button>

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

export default ProceedToNextQuestion;