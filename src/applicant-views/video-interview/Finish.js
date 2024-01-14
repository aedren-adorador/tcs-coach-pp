import { Box, Button, Card, CardBody, CardFooter, CardHeader, Flex, Grid, Image, Text } from "@chakra-ui/react";
import React, { useEffect } from "react";
import AuthHeader from "../../auth/AuthHeader";
import { CameraFilled, QuestionCircleOutlined, SettingOutlined, VideoCameraFilled } from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

function Finish() {
    const navigate = useNavigate()
    const location = useLocation()
    const applicantData = location.state.applicantData
    const submittedJobApplicationDetails = location.state.submittedJobApplicationDetails
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
          >
            <CardBody fontSize='14px' textAlign='justify'>
            <Flex
            mt='90px'
            direction='column'
            justify='center'
            align='center'
            gap='5'
            >
                <Text
                fontSize='22px'
              textAlign='center'
              fontWeight='700'
              >Thank you!</Text>
              <Text
              textAlign='center'
              fontWeight='400'
              >
                The Coding School has <strong>received your submission.</strong>There is no further action needed from you.
              </Text>

               <Text
               fontSize='22px'
              textAlign='center'
              fontWeight='700'
              >Next Steps & Questions </Text>
              <Text
              textAlign='center'
              fontWeight='400'
              >
               You'll be contacted after your submission has been reviewed. If you have any questions, contact The Coding School.
              </Text>
              <Button
              mt='10px'
              bg='tcs.main'
              colorScheme='facebook'
              color='white'
              width='160px'
              fontSize='14px'
              fontWeight='600'
              borderRadius='0px'
              onClick={() => {
                axios.post('http://localhost:3001/api/update-interview-to-finished', submittedJobApplicationDetails)
                navigate(`/applicant-home/${applicantData._id}`)
              }}
              >Done</Button>
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

export default Finish;