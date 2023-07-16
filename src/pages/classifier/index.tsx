import { HomeContainer, LeftContent, RightContent } from './indexElements';
import Webcam from 'react-webcam';
import React , { useCallback } from 'react';
import { saveAs } from 'file-saver';
import FeedCapture from '../../components/body/feedcapture';
import MicroscopeFeed from '../../components/body/microscopefeed';
import FeedControl from '../../components/body/feedcontrol';
import ClassificationTools from '../../components/body/classificationtools';
import Results from '../../components/body/results';

type params = {
    captureEmpty: boolean;
    setCaptureEmpty: React.Dispatch<React.SetStateAction<boolean>>;
    imageSrc: string;
    setImageSrc: React.Dispatch<React.SetStateAction<string>>;
    webcamRef: React.RefObject<Webcam>;
    imageFormat: string;
    setImageFormat: React.Dispatch<React.SetStateAction<string>>;
    imageLabel: string;
    setImageLabel: React.Dispatch<React.SetStateAction<string>>;
}

const Classifier: React.FC<params> = (props) => {

        
    const capture = useCallback(() => {
        const src = props.webcamRef.current!.getScreenshot();
        props.setImageSrc(src!);
        props.setCaptureEmpty(false);
      }, [props.webcamRef]);

    const clear = () => {
        props.setImageSrc("https://roadmap-tech.com/wp-content/uploads/2019/04/placeholder-image.jpg");
        props.setCaptureEmpty(true);
        props.setImageLabel("");
    }

    const saveImage = () => {
        saveAs(props.imageSrc, `${props.imageLabel} - ${new Date().getFullYear()}-${new Date().getMonth()}-${new Date().getDay()}.${props.imageFormat.split('/')[1]}`);
    }

    

    return (
        <HomeContainer>
                <LeftContent>
                    <FeedCapture imageSrc={props.imageSrc} imageFormat={props.imageFormat} setImageFormat={props.setImageFormat} imageLabel={props.imageLabel} setImageLabel={props.setImageLabel} captureEmpty={props.captureEmpty}/>
                    <Results/>
                </LeftContent>
                <RightContent>
                    <MicroscopeFeed webcamRef={props.webcamRef} imageFormat={props.imageFormat}/>
                    <FeedControl captureEmpty={props.captureEmpty} setCaptureEmpty={props.setCaptureEmpty} imageSrc={props.imageSrc} setImageSrc={props.setImageSrc} webcamRef={props.webcamRef} capture={capture} clear={clear} />
                    <ClassificationTools captureEmpty={props.captureEmpty} saveImage={saveImage}/>
                </RightContent>
        </HomeContainer>

         
    );
}

export default Classifier;