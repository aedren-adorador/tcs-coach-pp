import React, { useEffect, useState, useRef } from "react";
import Webcam from "react-webcam";

function Video() {
    const webcamRef = useRef(null);
    const stop = () => {
        if (webcamRef.current && webcamRef.current.video.srcObject) {
        let stream = webcamRef.current.video.srcObject;
        const tracks = stream.getTracks();
        tracks.forEach((track) => track.stop());
        webcamRef.current.video.srcObject = null;
        }
    }
    const start = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            webcamRef.current.video.srcObject = stream;
        } catch (error) {
            console.error("Error starting webcam:", error);
        }
    };

    const [mirrorSetting, setMirrorSetting] = useState('');
    const [mirrorLabel, setMirrorLabel] = useState('Mirror Video')

    const [isWebcamOpen, setIsWebcamOpen] = useState(true)
    const [isWebcamOpenLabel, setIsWebcamOpenLabel] = useState('Close Camera')

    const handleMirror = () => {
        setMirrorSetting(!mirrorSetting);
    }

    const handleIsWebcamOpen = () => {
        setIsWebcamOpen(!isWebcamOpen)
    }

    useEffect(() => {
        if (mirrorSetting === true) {
            setMirrorLabel('UnMirror Video');
        } else {
            setMirrorLabel('Mirror Video');
        }
    }, [mirrorSetting]);

    useEffect(() => {
        if (isWebcamOpen===false) {
            stop()
            setIsWebcamOpenLabel("Open Camera")
        } else {
            start();
            setIsWebcamOpenLabel("Close Camera")
        }
    }, [isWebcamOpen])
    
    return (
        <>
            <h1>HOME PAGE!</h1>
            <div
            style={{
            margin: '0px',
            padding: '0px',
            width: "500px",
            height: "500px",
            border: 'solid red',
            backgroundColor: isWebcamOpen ? "transparent" : "black",
            display: isWebcamOpen ? "none" : "inline-block"
            }}>
            </div>
            <Webcam mirrored={mirrorSetting} ref={webcamRef} width={'500px'} height={'500px'} style={{border: 'solid', display: isWebcamOpen ? 'inline-block' : 'none'}}/>
            <button onClick={handleMirror}>{mirrorLabel}</button>
            <button onClick={handleIsWebcamOpen}>{isWebcamOpenLabel}</button>
        </>
    )
}

export default Video;