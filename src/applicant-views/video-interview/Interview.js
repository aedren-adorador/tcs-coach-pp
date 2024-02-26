import { Box, Button, Card, CardBody, CardFooter, Flex, Grid, GridItem, HStack, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Progress, Select, Text, useDisclosure } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import AuthHeader from "../../auth/AuthHeader";
import { useLocation, useNavigate } from "react-router-dom";
import { RepeatClockIcon, TimeIcon } from "@chakra-ui/icons";
import { QuestionCircleOutlined, RedoOutlined, SettingOutlined } from "@ant-design/icons";
import { useRecordWebcam } from 'react-record-webcam';
import axios from "axios";

function Interview() {
    const { isOpen: isSettingsOpen , onOpen: onSettingsOpen, onClose: onSettingsClose } = useDisclosure()
    const { isOpen: isConfirmationOpen , onOpen: onConfirmationOpen, onClose: onConfirmationClose } = useDisclosure()
    
    const location = useLocation();
    const navigate = useNavigate();
    
    const applicantData = location.state.applicantData
    const token = location.state.token
    const submittedJobApplicationDetails = location.state.submittedJobApplicationDetails

    const [videoDeviceId, setVideoDeviceId] = useState('');
    const [audioDeviceId, setAudioDeviceId] = useState('');

    const [prepTimer, setPrepTimer] = useState('00:00');
    const [prepTime, setPrepTime] = useState(41);
    const [prepTimerProgress, setPrepTimerProgress] = useState(0)
    const target = 41;

    const [answerTimer, setAnswerTimer] = useState('00:00')
    const [answerTime, setAnswerTime] = useState(180);
    const [answerTimerProgress, setAnswerTimerProgress] = useState(0)
    const answerTimeTarget = 180;
    
    const [questionCounter, setQuestionCounter] = useState(location.state.questionCounter+1||0)

    const [questions, setQuestions] = useState(submittedJobApplicationDetails.interviewQuestionsM)

    const {
    activeRecordings,
    cancelRecording,
    clearPreview,
    closeCamera,
    createRecording,
    devicesByType,
    devicesById,
    download,
    muteRecording,
    openCamera,
    pauseRecording,
    resumeRecording,
    startRecording,
    stopRecording,
    } = useRecordWebcam();


    const submitInterviewResponse = (recordingSource) => {
        let xhr = new XMLHttpRequest();
        xhr.open("GET", recordingSource, true);
        xhr.responseType = "blob";
        
        xhr.onload = function() {
        const blobData = xhr.response;
        const interviewResponse = new FormData()
        interviewResponse.append('applicantFirstName', applicantData.firstNameM)
        interviewResponse.append('applicantLastName', applicantData.lastNameM)
        interviewResponse.append('applicantID', applicantData._id)
        interviewResponse.append('questionNumber', questionCounter+1)
        interviewResponse.append('interview', blobData, {type: 'video/webm'})
        axios.post(`${process.env.REACT_APP_SYS_URL}/api/applicant/video-interview-request/submit-interview`, interviewResponse)
            .then(response => console.log(response.data.success))
        }
        xhr.send()
    }

    const handleSelect = async (event) => {
        const { deviceid: deviceId }= event.target.options[event.target.selectedIndex].dataset;
        if (devicesById[deviceId].type === 'videoinput') {
        setVideoDeviceId(deviceId);
        }
        if (devicesById[deviceId].type === 'audioinput') {
        setAudioDeviceId(deviceId);
        }
    };

    useEffect(() => {
        if (answerTime !== 0) {
        const intervalId = setInterval(() => {
            setAnswerTime(prevTime => {
                const minutes = Math.floor(prevTime / 60);
                const seconds = prevTime % 60;
                const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
                setAnswerTimer(formattedTime);
                setAnswerTimerProgress(Math.floor(((answerTimeTarget - prevTime) / answerTimeTarget) * 100));
                return prevTime - 1;
            });
        }, 1000);
        return () => {
            clearInterval(intervalId);
            };
        } else {
            setTimeout(() => {
                document.getElementById('recordingEnder').click()
            }, 1000)     
        }
    }, [answerTime])

    const start = async () => {
        try {
            const recording = await createRecording(videoDeviceId, audioDeviceId);
            if (recording) await openCamera(recording.id);
        } catch (error) {
            console.error("Error during start:", error);
        }
    };

    useEffect(() => {
    if (prepTime !== 0) {
        const intervalId = setInterval(() => {
            setPrepTime(prevTime => {
                const newTime = prevTime - 1;
                setPrepTimer(`00:${newTime < 10 ? '0' : ''}${newTime}`)
                setPrepTimerProgress(Math.floor(((target - newTime) / target) * 100));
                return newTime;
            })  
        }, 1000)

        return () => {
            clearInterval(intervalId);
        };
    }
    setPrepTimer('00:00');
    document.getElementById('recordingStarter').click()
    }, [prepTime]);

    useEffect(() => {
    }, [videoDeviceId, audioDeviceId])

    useEffect(() => {
        start()
    }, [])

    useEffect(() => {
        console.log(questions)
   }, [questions, questionCounter])

    return(
        <>
        {activeRecordings?.map((recording, index) => (
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
          maxW='1000px'
          minH='500px'
          mt='100px'
          borderRadius='0px'
          height='100%'
          maxH='600px'
          >

            <CardBody fontSize='14px' textAlign='justify'>
                <Grid
                padding='5px 30px'
                height='100%'
                templateColumns='repeat(2, 1fr)'
                gap='10'
                >
                    
                    <GridItem>
                        <Text
                        fontWeight='700'
                        fontSize='18px'
                        >Video Response</Text>

                        <Flex
                        gap='5'
                        justify='flex-end'
                        >
                            <Card
                            display={recording.status === 'STOPPED' ? 'none' : ''}
                            borderRadius='0px'
                            padding='5px'
                            pt='0px 5'
                            width='50%'>
                                <Flex
                                mb='1'
                                align='center'
                                justify='space-between'
                                >
                                    <Text
                                    fontSize='12px'
                                    fontWeight='600'
                                    >{recording.status === 'RECORDING'? 'Response Time' : 'Prep Time'}</Text>
                                    <Text
                                    fontSize='12px'
                                    >
                                        {recording.status === 'RECORDING' ? answerTimer :prepTimer}
                                    </Text>
                                </Flex>
                                
                                <Progress
                                borderRadius='20px'
                                width='95%'
                                value={recording.status === 'RECORDING' ? answerTimerProgress : prepTimerProgress}
                                size='sm'
                                colorScheme='tcs'
                                />
                            </Card>
                            <Button
                            width='50%'
                            fontSize='12px'
                            borderRadius='0px'
                            display={recording.status === 'STOPPED' ? '' : 'none'}
                            onClick={() => {
                                startRecording(recording.id)
                                setAnswerTime(180)
                                setAnswerTimer('00:00')
                                setAnswerTimerProgress(0)
                                setQuestions(prevQs => {
                                    const currentQuestion = prevQs[questionCounter]
                                    const updatedQuestions = [...prevQs]
                                    updatedQuestions[currentQuestion] = Math.max(0, updatedQuestions[currentQuestion] - 1)
                                    return updatedQuestions
                                })
                             }}
                            >
                                <RedoOutlined/>
                                &nbsp;Retry
                            </Button>
                            <Button
                            display={recording.status === 'RECORDING' || recording.status ==='STOPPED'?'none':''}
                            width='50%'
                            bg='tcs.main'
                            borderRadius='0px'
                            size='md'
                            fontWeight='300'
                            color='white'
                            colorScheme='facebook'
                            fontSize='12px'
                            id='recordingStarter'
                             onClick={() => {
                                startRecording(recording.id)
                                setAnswerTime(180)
                                setAnswerTimer('00:00')
                                setAnswerTimerProgress(0)
                                // setQuestions(prevQs => {
                                //     const currentQuestion = prevQs[questionCounter]
                                //     console.log(currentQuestion)
                                //     const updatedQuestions = [...prevQs]
                                //     console.log(updatedQuestions, 'nice')
                                //     console.log('hooray')
                                //     console.log(updatedQuestions[currentQuestion], 'gago')
                                //     updatedQuestions[currentQuestion] = Math.max(0, updatedQuestions[currentQuestion] - 1)
                                //     console.log(updatedQuestions)
                                //     return updatedQuestions
                                // })
                             }}
                            >Start Recording</Button>

                            <Button
                            display={recording.status === 'RECORDING'?'':'none'}
                            width='50%'
                            borderRadius='0px'
                            size='md'
                            fontWeight='300'
                            color='white'
                            colorScheme='red'
                            fontSize='12px'
                            id='recordingEnder'

                             onClick={() => {
                                stopRecording(recording.id)
                             }}
                            >Done Recording</Button>
                            <Button
                            bg='tcs.main'
                            color='white'
                            colorScheme='facebook'
                            width='50%'
                            fontSize='12px'
                            borderRadius='0px'
                            display={recording.status === 'STOPPED' ? '' : 'none'}
                            onClick={onConfirmationOpen}
                            >
                                Submit
                            </Button>
                            
                        </Flex>

                        <Box
                        mt='10px'
                        >
                            <Flex
                            width='100%'
                            key={recording.id}
                            display={recording.status === 'STOPPED' ? 'none' : ''}
                            >
                                <video ref={recording.webcamRef} playsInline
                                style={{width:'100%', height:'100%', minWidth: '400px', minHeight: '300px', transform: 'rotateY(180deg)', WebkitTransform: 'rotateY(180deg)', MozTransform: 'rotateY(180deg)'}} muted
                                />
                            </Flex>

                            <Box
                            key={recording.id}
                            display={recording.status === 'STOPPED' ? '' : 'none'}
                            >
                                <video controls ref={recording.previewRef} playsInline style={{width:'100%', height:'100%', minWidth: '400px', minHeight: '300px'}}/>
                            </Box>
                        </Box>
                    </GridItem>
                             
                    
                    <GridItem
                    minW='400px'
                    >
                         <Text
                         fontWeight='700'
                         fontSize='18px'
                         >Question {questionCounter+1} of {questions.length}</Text>
                         <Flex
                         gap='10'
                         fontSize='12px'
                         >
                             <Box>
                                <TimeIcon></TimeIcon>
                                &nbsp;
                                Maximum Response Time: <strong>3</strong> minutes
                            </Box>
                            
                         </Flex>

                         <Text
                         mt='30px'
                         fontSize='20px'
                         >
                            {questions[questionCounter]}
                         </Text>
                    </GridItem>

                </Grid>
               
            </CardBody>
            <CardFooter
            borderBottom='solid'
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
                    onClick={onSettingsOpen}
                    ><SettingOutlined/> Settings</Text>

                     <Modal 
                     isOpen={isSettingsOpen}
                     onClose={onSettingsClose}
                     
                     >
                        <ModalOverlay />
                        <ModalContent
                        maxW='500px'
                        >
                        <ModalHeader>Video & Auto Settings</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody fontSize='12px'>
                            <Flex
                            justify='center'
                            >
                                <Box
                                border='solid 0.2px'
                                height='200px'
                                width='500px'
                                >
                                </Box>
                            </Flex>
                            
                            <Box>
                            <Flex
                            gap={5}
                            justify='center'
                            
                            >
                                <Box
                                border='solid 0.2px'
                                padding='20px'
                                >
                                <Text>Select video input</Text>
                                <Select 
                                bg='tcs.bluey'
                                onChange={handleSelect}
                                size='sm'
                                >
                                    {devicesByType?.video?.map((device) => (
                                    <option key={device.deviceId} data-deviceid={device.deviceId}>
                                        {device.label}
                                    </option>
                                    ))}
                                </Select>
                                </Box>

                                <Box
                                border='solid 0.2px'
                                padding='20px'
                                >
                                <Text>Select audio input</Text>
                                <Select
                                size='sm'
                                bg='tcs.bluey'
                                onChange={handleSelect}
                                >
                                    {devicesByType?.audio?.map((device) => (

                                    audioDeviceId === device.deviceId ?
                                    <option key={device.deviceId} data-deviceid={device.deviceId} selected>
                                        {device.label}
                                    </option>:
                                    <option key={device.deviceId} data-deviceid={device.deviceId}>
                                        {device.label}
                                    </option>
                                    ))}
                                </Select>
                                </Box>
                            </Flex>
                            </Box>
                        </ModalBody>
                        <ModalFooter>
                            <Button colorScheme='tcs' borderRadius='0px' size='sm' mr={3} onClick={onSettingsClose}>
                            Save Settings
                            </Button>
                        </ModalFooter>
                        </ModalContent>
                    </Modal>

                    <Modal 
                     isOpen={isConfirmationOpen}
                     onClose={onConfirmationClose}
                     
                     >
                        <ModalOverlay />
                        <ModalContent
                        maxW='550px'
                        height='250px'
                        borderRadius='0px'
                        >
                        <ModalHeader
                        fontWeight='700'
                        bg='tcs.dirtywhite'
                        fontSize='18px'
                        >Submit your response</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody
                        mt='20px'
                        fontSize='14px'
                        >
                            Are you sure you want to submit your response? You will not be able to come back and re-record a new response later.
                            <Flex
                            mt='40px'
                            gap='5'
                            justify='flex-end'
                            >
                                <Button
                                borderRadius='0px'
                                fontWeight='400'
                                fontSize='14px'
                                width='150px'
                                >Cancel</Button>

                                <Button
                                borderRadius='0px'
                                bg='tcs.main'
                                color='white'
                                fontWeight='400'
                                fontSize='14px'
                                width='150px'
                                colorScheme='facebook'
                                onClick={()=>{
                                     console.log('questionCounter: ', questionCounter+1)
                                     console.log('questionsLength', questions.length)                                  
                                    if ( questionCounter+1 === questions.length) {
                                        submitInterviewResponse(recording.previewRef.current.currentSrc)
                                        console.log(submittedJobApplicationDetails, "AHTGAA")
                                        navigate('/video-interview/submission-complete',
                                         {state: {applicantData: applicantData, submittedJobApplicationDetails: submittedJobApplicationDetails}}
                                        )
                                    } else {
                                        navigate('/video-interview/proceed-to-next-question',
                                        {state: {applicantData: applicantData, token: token, questions: questions, questionCounter: questionCounter, submittedJobApplicationDetails: submittedJobApplicationDetails}}
                                        )
                                        submitInterviewResponse(recording.previewRef.current.currentSrc)
                                    }
                                }}
                                >Submit</Button>
                            </Flex>
                        </ModalBody>
                        </ModalContent>
                    </Modal>
                </Flex>
            </CardFooter>
          </Card>
        </Flex>
       </Box>
       ))}

        </>
    )
}

export default Interview;