import { HomeContainer, CaptureContainer, VideoFeed, TitleHeader, Button, LeftContent, RightContent, CaptureImage, ControlContainer, ButtonWrap, ResultContainer, CanvasFeed } from './indexElements';
import Webcam from 'react-webcam';
import  { useState, useRef, useCallback } from 'react';
import { saveAs } from 'file-saver';
import { DrawBBox } from '../../API/modelInference';
import { colours } from '../../styles/colours';

const Home = () => {
    const [captureEmpty, setCaptureEmpty] = useState(true);
    const [imageSrc, setImageSrc] = useState("https://roadmap-tech.com/wp-content/uploads/2019/04/placeholder-image.jpg");

    const webcamRef = useRef<Webcam>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const seedClassifier = async () => {
        console.log("seeding classifier active");
        // activate interval when live inference is active
        setInterval(() => {
            detect("test");
        }
        , 100);
    }

    const detect = async (net: any) => {
        if (typeof webcamRef.current !== "undefined" && webcamRef.current !== null && webcamRef.current.video!.readyState === 4) {
            const video = webcamRef.current.video!;

            const videoWidth = webcamRef.current.video!.videoWidth;
            const videoHeight = webcamRef.current.video!.videoHeight;

            webcamRef.current.video!.width = videoWidth;
            webcamRef.current.video!.height = videoHeight;

            canvasRef.current!.width = videoWidth;
            canvasRef.current!.height = videoHeight;

            // draw bounding box on canvas
            const ctx = canvasRef.current!.getContext('2d')!;

        }

    }


    const capture = useCallback(() => {
        const src = webcamRef.current!.getScreenshot();
        setImageSrc(src!);
        setCaptureEmpty(false);
      }, [webcamRef]);

    const clear = () => {
        setImageSrc("https://roadmap-tech.com/wp-content/uploads/2019/04/placeholder-image.jpg");
        setCaptureEmpty(true);
    }

    const saveImage = () => {
        saveAs(imageSrc, "test.png")
    }

    return (
        <HomeContainer>
                <LeftContent>
                    <CaptureContainer>
                        <TitleHeader>FEED CAPTURE</TitleHeader>
                        <CaptureImage src={imageSrc} alt="placeholder" />
                    </CaptureContainer>
                    <ResultContainer>
                        <TitleHeader>CLASSIFICATION RESULTS</TitleHeader>
                    </ResultContainer>
                </LeftContent>
                <RightContent>
                    <VideoFeed>
                        <TitleHeader>MICROSCOPE FEED</TitleHeader>
                        <Webcam ref={webcamRef} mirrored={false} videoConstraints={{ width: 700, height: 700, facingMode: 'environment' }} screenshotFormat='image/png'/>
                        <CanvasFeed ref={canvasRef} />
                    </VideoFeed>
                    <ControlContainer>
                        <TitleHeader>FEED CONTROL</TitleHeader>
                        <ButtonWrap>
                            <Button disabled={false} color={colours.CFIA_Background_Blue}>Switch Feed</Button>
                            <Button disabled={false} color={colours.CFIA_Background_Blue} onClick={capture}>Capture Image</Button>
                            <Button disabled={captureEmpty} color={colours.CFIA_Background_Blue} onClick={clear}>Clear Image</Button>
                        </ButtonWrap>
                    </ControlContainer>
                    <ControlContainer>
                        <TitleHeader>ClASSIFICATION TOOLS</TitleHeader>   
                        <ButtonWrap>
                            <Button disabled={captureEmpty} color={colours.CFIA_Background_Blue}>Run Classification</Button>
                            <Button disabled={captureEmpty} color={colours.CFIA_Background_Blue}>Annotate Image</Button>
                            <Button disabled={captureEmpty} color={colours.CFIA_Background_Blue} onClick={saveImage}>Save Image</Button>
                        </ButtonWrap>
                    </ControlContainer>
                </RightContent>
        </HomeContainer>

         
    );
}

export default Home;