import { HomeContainer, CaptureContainer, VideoFeed, TitleHeader, CaptureButton, LeftContent, RightContent } from './indexElements';
import Webcam from 'react-webcam';

const Home = () => {
    return (
         <HomeContainer>
            <LeftContent>
                <CaptureContainer>
                    <TitleHeader>CAPTURE</TitleHeader>
                    <CaptureButton>Capture Image</CaptureButton>
                </CaptureContainer>
            </LeftContent>
            <RightContent>
                <VideoFeed>
                    <TitleHeader>MICROSCOPE FEED</TitleHeader>
                    <Webcam videoConstraints={{ width: 700, height: 700 }} screenshotFormat='image/png' />
                </VideoFeed>
            </RightContent>
         </HomeContainer>
    );
    }

export default Home;