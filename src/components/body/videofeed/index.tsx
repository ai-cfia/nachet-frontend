import { VideoFeedContainer, PrimaryButton, VideoFeedWrap } from './indexElements';
import Webcam from "react-webcam";
import React, { useRef, useEffect } from 'react';

interface FeedSize {
   frameWidth: number;
   frameHeight: number;
}

function VideoFeed({frameWidth, frameHeight}:FeedSize){
   // const webcamRef = useRef<Webcam>(null);
   // const canvasRef = useRef<HTMLCanvasElement>(null);
   // useEffect(() => {
   //    const video = webcamRef.current;
   //    const canvas = canvasRef.current;
   //    if (video && canvas) {
   //       const ctx = canvas.getContext('2d');
   //       canvas.width = width;
   //       canvas.height = height;
   //       ctx!.drawImage(video.video!, 500, 500, canvas.width, canvas.height);
   //    }
   //  }, []);

   return (
      <VideoFeedWrap>
         <VideoFeedContainer>
            <Webcam videoConstraints={{ width: frameWidth, height: frameHeight }} screenshotFormat='image/png' />
         </VideoFeedContainer>
         <PrimaryButton>Capture Image</PrimaryButton>
      </VideoFeedWrap>
   );
};

export default VideoFeed;