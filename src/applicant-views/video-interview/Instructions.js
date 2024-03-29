import { Box, Button, Card, CardBody, CardFooter, CardHeader, Flex, Grid, Image, Text } from "@chakra-ui/react";
import React, { useEffect } from "react";
import AuthHeader from "../../auth/AuthHeader";
import { useLocation, useNavigate } from "react-router-dom";
import { CheckCircleIcon } from "@chakra-ui/icons";
import { QuestionCircleOutlined, SettingOutlined } from "@ant-design/icons";

function Instructions() {
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
          maxH='500px'

          >
            <Flex
            pt='25px'
            pr='25px'
            textAlign='right'
            justify='flex-end'
            >
               <Box textAlign='center'>
                <Button
                bg='tcs.main'
                color='white'
                colorScheme="blue"
                fontWeight='300'
                width='150px'
                fontSize='14px'
                size='sm'
                onClick={() => {
                  navigate('/video-interview/interview', {state: {applicantData: applicantData, token: token, submittedJobApplicationDetails: submittedJobApplicationDetails}})
                }}
                >
                    Begin
                </Button>
                <Text
                fontWeight='300'
                fontSize='14px'
                >Questions: <strong>{submittedJobApplicationDetails[0][0].interviewQuestionsM.length}&nbsp;</strong></Text>
                </Box>
            </Flex>

            <CardBody fontSize='14px' textAlign='justify' mt='40px'>
               <Text
               fontSize='20px'
               fontWeight='800'
               mb='2'
               >Instructions</Text>

               <Text>
                In this section are {submittedJobApplicationDetails[0][0].interviewQuestionsM.length}&nbsp;questions for you to answer and you will record your responses using video. These questions are similar to ones you will likely encounter when interviewing for an actual role with a company. You will have <strong>30 seconds to read the question and 3 minutes to give your answer.</strong> You can re-record your response<strong>&nbsp;unlimited times before moving to the next question</strong>.
               </Text>
            </CardBody>
          </Card>
        </Flex>
       </Box>

        </>
    )
}

export default Instructions;