import { VideoFeed, TitleHeader, Select, Option } from './indexElements';
import Webcam from "react-webcam";
import React, { useRef, useEffect, useState } from 'react';

type params = {
   webcamRef: React.RefObject<Webcam>;
   imageFormat: any;
}

const MicroscopeFeed: React.FC<params> = (props) => {
   const [videoDevices, setVideoDevices] = useState<{ deviceId: string; label: string }[]>([]);
   const [selectedDevice, setSelectedDevice] = useState('');
 
   useEffect(() => {
     const getVideoDevices = async () => {
       try {
         const devices = await navigator.mediaDevices.enumerateDevices();
         const videoInputDevices = devices.filter(device => device.kind === 'videoinput');
         console.log(videoInputDevices);
         setVideoDevices(videoInputDevices);
       } catch (error) {
         console.error('Error enumerating video devices:', error);
       }
     };
 
     getVideoDevices();
   }, []);

   const handleDevices = (event: React.ChangeEvent<HTMLSelectElement>) => {
      console.log(event.target.value)
      setSelectedDevice(event.target.value);
    };

   return (
      <VideoFeed>
         <TitleHeader>MICROSCOPE FEED</TitleHeader>
         <Webcam ref={props.webcamRef} mirrored={false} videoConstraints={{ width: 700, height: 700, facingMode: { exact:`${selectedDevice}` }}} screenshotFormat={props.imageFormat} />
         <Select value={selectedDevice} onChange={handleDevices}>
            <Option value="">Select feed input</Option>
            {videoDevices.map((device) => (
               <Option key={device.deviceId} value={device.deviceId}>
                  {device.label}
               </Option>
            ))}
         </Select>
      </VideoFeed>
   );
};

export default MicroscopeFeed;