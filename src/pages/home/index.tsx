import { HomeContainer, CaptureContainer, VideoFeed, TitleHeader, Button, LeftContent, RightContent, CaptureImage, ControlContainer, ButtonWrap } from './indexElements';
import Webcam from 'react-webcam';
import  { useState, useRef, useCallback } from 'react';
import { colours } from '../../styles/colours';

const Home = () => {
    const [captureEmpty, setCaptureEmpty] = useState(true);
    const [imageSrc, setImageSrc] = useState("https://via.placeholder.com/150");
    const webcamRef = useRef<Webcam>(null);

    const capture = useCallback(() => {
        const src = webcamRef.current!.getScreenshot();
        setImageSrc(src!);
        console.log(src);
        setCaptureEmpty(false);
      }, [webcamRef]);

    const clear = () => {
        setImageSrc("https://via.placeholder.com/150");
        setCaptureEmpty(true);
    }

    return (
         <HomeContainer>
            <LeftContent>
                <CaptureContainer>
                    <TitleHeader>CAPTURE</TitleHeader>
                    <CaptureImage src={imageSrc} alt="placeholder" />
                </CaptureContainer>
                <ControlContainer>
                    <TitleHeader>CAPTURE CONTROL</TitleHeader>
                    <ButtonWrap>
                        <Button disabled={false} color={colours.sucess} onClick={capture}>Capture Image</Button>
                        <Button disabled={captureEmpty} color={colours.error} onClick={clear}>Clear Capture</Button>
                    </ButtonWrap>
                </ControlContainer>
                <ControlContainer>
                    <TitleHeader>TOOLS</TitleHeader>   
                    <ButtonWrap>
                        <Button disabled={captureEmpty} color={colours.CFIA_Background_Blue}>Annotate Image</Button>
                        <Button disabled={captureEmpty} color={colours.CFIA_Background_Blue}>Run Inference</Button>
                    </ButtonWrap>
                </ControlContainer>
            </LeftContent>
            <RightContent>
                <VideoFeed>
                    <TitleHeader>MICROSCOPE FEED</TitleHeader>
                    <Webcam ref={webcamRef} videoConstraints={{ width: 700, height: 700, facingMode: 'environment' }} screenshotFormat='image/png' />
                </VideoFeed>
            </RightContent>
         </HomeContainer>
    );
    }

export default Home;