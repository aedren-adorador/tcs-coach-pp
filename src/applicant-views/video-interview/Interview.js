import { Box, Button, Card, CardBody, CardFooter, Flex, Grid, GridItem, HStack, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Progress, Select, Text, useDisclosure } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import AuthHeader from "../../auth/AuthHeader";
import { useLocation, useNavigate } from "react-router-dom";
import { RepeatClockIcon, TimeIcon } from "@chakra-ui/icons";
import { QuestionCircleOutlined, RedoOutlined, SettingOutlined, StopFilled } from "@ant-design/icons";
import { useRecordWebcam } from 'react-record-webcam';
import { useRecording } from "react-record-webcam/dist/useRecording";

function Interview() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const location = useLocation();
    const applicantData = location.state.applicantData
    const token = location.state.token
    const navigate = useNavigate();

    const [prepTimer, setPrepTimer] = useState('00:00');
    const [prepTime, setPrepTime] = useState(41);
    const [prepTimerProgress, setPrepTimerProgress] = useState(0)

    const [answerTimer, setAnswerTimer] = useState('00:00')
    const [answerTime, setAnswerTime] = useState(180);
    const [answerTimerProgress, setAnswerTimerProgress] = useState(0)

    const target = 41;
    const answerTimeTarget = 180;
    
    const [questions, setQuestions] = useState({
        'Tell us about yourself.': 2,
        'Why did you apply to TCS?': 2,
        'What are your strenghts?': 2,
        'Tell about a time where you had a conflict with a group.': 2,
        'How would you explain a complex topic to an audience?': 2,
        'What do you think is the future of technology?': 2,
        'In a collaborative environment, who are you in the group?': 2,
        'State one important mistake that has shaped you for the better.': 2,
        })

    const [questionCounter, setQuestionCounter] = useState(0);

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

    const [videoDeviceId, setVideoDeviceId] = useState('');
    const [audioDeviceId, setAudioDeviceId] = useState('');

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
                    {activeRecordings?.map((recording) => (
                    <GridItem>
                        <Text
                        fontWeight='700'
                        fontSize='18px'
                        >Video Response</Text>

                        <Flex
                        gap='5'
                        justify='space-between'
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
                            display={recording.status === 'STOPPED' && questions[Object.keys(questions)[questionCounter]] > 0 ? '' : 'none'}
                            onClick={() => {
                                startRecording(recording.id)
                                setAnswerTime(180)
                                setAnswerTimer('00:00')
                                setAnswerTimerProgress(0)
                                setQuestions(prevQs => {
                                    const currentQuestion = Object.keys(prevQs)[questionCounter]
                                    const updatedQuestions = { ...prevQs }
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
                                setPrepTime(0)
                                setPrepTimer('00:00')
                                setPrepTimerProgress(0)
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
                                <video ref={recording.webcamRef} loop autoPlay playsInline style={{width:'100%', height:'100%', minWidth: '400px', minHeight: '300px'}}/>
                            </Flex>

                            <Box
                            key={recording.id}
                            display={recording.status === 'STOPPED' ? '' : 'none'}
                            >
                                <video ref={recording.previewRef} loop autoPlay playsInline style={{width:'100%', height:'100%', minWidth: '400px', minHeight: '300px'}}/>
                            </Box>
                        </Box>

                            <Button
                            onClick={() => download(recording.id)}
                            bg='tcs.mongo'
                            color='white'
                            colorScheme='green'
                            borderRadius='0px'
                            display={recording.status === 'STOPPED' ? '' : 'none'}
                            >Download</Button>
                    </GridItem>
                    ))}
                    
                    <GridItem
                    minW='400px'
                    >
                         <Text
                         fontWeight='700'
                         fontSize='18px'
                         >Question 1 of {Object.keys(questions).length}</Text>
                         <Flex
                         gap='10'
                         fontSize='12px'
                         >
                            <Box>
                                <RepeatClockIcon/>
                                &nbsp;
                                <strong>{Object.values(questions)[questionCounter]}</strong> Tries
                            </Box>
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
                            {Object.keys(questions)[questionCounter]}
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
                    onClick={onOpen}
                    ><SettingOutlined/> Settings</Text>

                     <Modal 
                     isOpen={isOpen}
                     onClose={onClose}
                     
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
                            <Button colorScheme='tcs' borderRadius='0px' size='sm' mr={3} onClick={onClose}>
                            Save Settings
                            </Button>
                        </ModalFooter>
                        </ModalContent>
                    </Modal>
                </Flex>
            </CardFooter>
          </Card>
        </Flex>
       </Box>

        </>
    )
}

export default Interview;