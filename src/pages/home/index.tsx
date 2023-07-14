import { HomeContainer, CaptureContainer, VideoFeed, TitleHeader, Button, LeftContent, RightContent, CaptureImage, ControlContainer, ButtonWrap, BottomContent, HomeWrap } from './indexElements';
import Webcam from 'react-webcam';
import  { useState, useRef, useCallback } from 'react';
import { colours } from '../../styles/colours';

const Home = () => {
    const [captureEmpty, setCaptureEmpty] = useState(true);
    const [imageSrc, setImageSrc] = useState("https://roadmap-tech.com/wp-content/uploads/2019/04/placeholder-image.jpg");
    const webcamRef = useRef<Webcam>(null);

    const capture = useCallback(() => {
        const src = webcamRef.current!.getScreenshot();
        setImageSrc(src!);
        setCaptureEmpty(false);
      }, [webcamRef]);

    const clear = () => {
        setImageSrc("https://roadmap-tech.com/wp-content/uploads/2019/04/placeholder-image.jpg");
        setCaptureEmpty(true);
    }

    return (
        <HomeWrap>
            <HomeContainer>
                <LeftContent>
                    <CaptureContainer>
                        <TitleHeader>CAPTURE</TitleHeader>
                        <CaptureImage src={imageSrc} alt="placeholder" />
                    </CaptureContainer>
                    <ControlContainer>
                        <TitleHeader>TOOLS</TitleHeader>   
                        <ButtonWrap>
                            <Button disabled={captureEmpty} color={colours.CFIA_Background_Blue}>Run Inference</Button>
                            <Button disabled={captureEmpty} color={colours.CFIA_Background_Blue}>Annotate Image</Button>
                            <Button disabled={captureEmpty} color={colours.CFIA_Background_Blue}>Save Image</Button>
                            <Button disabled={captureEmpty} color={colours.CFIA_Background_Blue} onClick={clear}>Clear Image</Button>
                        </ButtonWrap>
                    </ControlContainer>
                </LeftContent>
                <RightContent>
                    <VideoFeed>
                        <TitleHeader>MICROSCOPE FEED</TitleHeader>
                        <Webcam ref={webcamRef} mirrored={false} videoConstraints={{ width: 700, height: 700, facingMode: 'environment' }} screenshotFormat='image/png' />
                    </VideoFeed>
                    <ControlContainer>
                        <TitleHeader>CAPTURE CONTROL</TitleHeader>
                        <ButtonWrap>
                            <Button disabled={false} color={colours.CFIA_Background_Blue} onClick={capture}>Capture Image</Button>
                            <Button disabled={false} color={colours.CFIA_Background_Blue}>Live Inference</Button>
                            <Button disabled={false} color={colours.CFIA_Background_Blue}>Switch Feed</Button>
                        </ButtonWrap>
                    </ControlContainer>
                </RightContent>
            </HomeContainer>
            <BottomContent>
                <TitleHeader>RESULTS</TitleHeader>
            </BottomContent>
        </HomeWrap>

         
    );
}

export default Home;