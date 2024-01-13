import { Box, Button, Card, CardBody, CardFooter, Flex, Grid, GridItem, HStack, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Progress, Select, Text, useDisclosure } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import AuthHeader from "../../auth/AuthHeader";
import { useLocation, useNavigate } from "react-router-dom";
import { RepeatClockIcon, TimeIcon } from "@chakra-ui/icons";
import { QuestionCircleOutlined, SettingOutlined, StopFilled } from "@ant-design/icons";
import { useRecordWebcam } from 'react-record-webcam';
import { useRecording } from "react-record-webcam/dist/useRecording";

function Interview() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const location = useLocation();
    const applicantData = location.state.applicantData
    const token = location.state.token
    const navigate = useNavigate();
    const [prepTimer, setPrepTimer] = useState('00:00');
    const [prepTimerProgress, setPrepTimerProgress] = useState(0)
    const [prepTime, setPrepTime] = useState(41);
    const target = 41;

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

  const {
    getRecording, updateRecording
  } = useRecording();

    const [videoDeviceId, setVideoDeviceId] = useState('');
    const [audioDeviceId, setAudioDeviceId] = useState('');

    const handleSelect = async (event) => {
        console.log("CHANGED")
        const { deviceid: deviceId }= event.target.options[event.target.selectedIndex].dataset;
        
        if (devicesById[deviceId].type === 'videoinput') {
        setVideoDeviceId(deviceId);
        }
        if (devicesById[deviceId].type === 'audioinput') {
        setAudioDeviceId(deviceId);
        }
    };

    const start = async () => {
        const recording = await createRecording(videoDeviceId, audioDeviceId);
        if (recording) await openCamera(recording.id);
    };

    const mute = async (recordingId) => {
    return new Promise((resolve, reject) => {
        const recording = getRecording(recordingId);

        recording.isMuted = !recording.isMuted;

        const updatedRecording = updateRecording(recordingId, recording);

        resolve(updatedRecording);
    });
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
                        >
                            <Card
                            borderRadius='0px'
                            padding='5px'
                            pt='0px 5'
                            width='150px'>
                                <Flex
                                mb='1'
                                align='center'
                                justify='space-between'
                                >
                                    <Text
                                    fontSize='12px'
                                    fontWeight='600'
                                    >Prep time</Text>
                                    <Text
                                    fontSize='12px'
                                    >
                                        {prepTimer}
                                    </Text>

                                </Flex>
                                
                                <Progress
                                borderRadius='20px'
                                width='95%'
                                value={prepTimerProgress}
                                size='sm'
                                colorScheme='tcs'
                                />
                            </Card>
                            <Button
                            bg='tcs.main'
                            borderRadius='0px'
                            size='md'
                            fontWeight='300'
                            color='white'
                            colorScheme='facebook'
                            fontSize='12px'
                             onClick={() => startRecording(recording.id)}
                            >{recording.status === 'RECORDING' ? 'Recording...' : 'Start Recording'}</Button>
                            <Button
                            display={recording.status === 'RECORDING'?'':'none'}
                            bg='red'
                            borderRadius='0px'
                            size='md'
                            fontWeight='300'
                            color='white'
                            colorScheme='red'
                            fontSize='12px'
                             onClick={() => stopRecording(recording.id)}
                            >Stop</Button>
                        </Flex>
                        <Box
                        mt='10px'
                        >
                            <Box key={recording.id}>
                                <video ref={recording.webcamRef} loop autoPlay playsInline style={{ width: '400px', height:'300px' }} mirrored='false' />
                            </Box>
                            <Button
                            onClick={() => download(recording.id)}
                            bg='tcs.mongo'
                            color='white'
                            colorScheme='green'
                            borderRadius='0px'
                            display={recording.status === 'STOPPED' ? '' : 'none'}
                            >Download</Button>

                           
                        </Box>
                    </GridItem>
                    ))}
                    
                    <GridItem
                    minW='400px'
                    >
                         <Text
                         fontWeight='700'
                         fontSize='18px'
                         >Question 1 of 8</Text>
                         <Flex
                         gap='10'
                         fontSize='12px'
                         >
                            <Box>
                                <RepeatClockIcon/>
                                &nbsp;
                                <strong>2</strong> Tries
                            </Box>
                             <Box>
                                <TimeIcon></TimeIcon>
                                &nbsp;
                                Maximum Response Time: <strong>3</strong> minutes
                            </Box>
                            
                         </Flex>
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