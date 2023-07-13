import { VideoFeedContainer } from './indexElements';
import React from 'react';
import Webcam from "react-webcam";

const VideoFeed = () => {

   return (
          <VideoFeedContainer>
            <Webcam audio={false} mirrored={false} />
           </VideoFeedContainer>
   );
};

export default VideoFeed;