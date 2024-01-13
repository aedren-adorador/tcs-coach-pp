import { Box, Button, Flex, HStack, Select, Text } from '@chakra-ui/react';
import React, { useState, useEffect, useRef } from 'react';
import { useRecordWebcam } from 'react-record-webcam';

function Video() {
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

  const start = async () => {
    const recording = await createRecording(videoDeviceId, audioDeviceId);
    if (recording) await openCamera(recording.id);
  };

  return (
    <Box margin='20px'>
      <Flex gap={5}>
        <Box
        border='solid 0.2px'
        padding='20px'
        >
          <Text>Select video input</Text>
          <Select 
          bg='tcs.bluey'
          onChange={handleSelect}
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
          bg='tcs.bluey'
          onChange={handleSelect}
          >
            {devicesByType?.audio?.map((device) => (
              <option key={device.deviceId} data-deviceid={device.deviceId}>
                {device.label}
              </option>
            ))}
          </Select>
        </Box>
      </Flex>

      <Box
      mt='20px'
      >
        <Button
        borderRadius='0px'
        size='sm'
        color='white'
        colorScheme='green'
        bg='tcs.mongo'

        onClick={start}>Open camera</Button>
      </Box>

      <Box className="devices">
        {activeRecordings?.map((recording) => (
          <Box key={recording.id}>
            <Text>Status: {recording.status}</Text>
            <video ref={recording.webcamRef} loop autoPlay playsInline style={{width: '500px'}}/>
            
            <HStack
            mt='10px'
            width='500px'
            justify='center'
            gap='5'
            >
              <Button
                disabled={
                  recording.status === 'RECORDING' ||
                  recording.status === 'PAUSED'
                }
                onClick={() => startRecording(recording.id)}
                size='sm'
                colorScheme='red'
              >
                Record
              </Button>

              <Button
                disabled={
                  recording.status !== 'RECORDING' &&
                  recording.status !== 'PAUSED'
                }
                onClick={() =>
                  recording.status === 'PAUSED'
                    ? resumeRecording(recording.id)
                    : pauseRecording(recording.id)
                }
                size='sm'
                colorScheme='blue'
              >
                {recording.status === 'PAUSED' ? 'Resume' : 'Pause'}
              </Button>

              <Button
                onClick={() => muteRecording(recording.id)}
                size='sm'
              >
                {recording.isMuted ? 'Unmute' : 'Mute'}
              </Button>

              <Button
                disabled={recording.status !== 'RECORDING'}
                onClick={() => stopRecording(recording.id)}
                size='sm'
              >
                Stop
              </Button>

              <Button
              onClick={() => cancelRecording(recording.id)}
              size='sm'
              >
                Cancel
              </Button>
            </HStack>


            <Box
            mt='50px'
            >
              <Text>Preview</Text>
              <video ref={recording.previewRef} autoPlay loop playsInline style={{width: '500px'}}/>
              
              <HStack
              gap='5'
              >
                <Button onClick={() => download(recording.id)} colorScheme='green'>Download</Button>
                <Button onClick={() => clearPreview(recording.id)}>
                  Clear preview
                </Button>
              </HStack> 
            </Box>
            <Button
            
            >Download</Button>

            </Box>
        ))}
      </Box>
    </Box>
  );
}

export default Video;
