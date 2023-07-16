import { HomeContainer } from './indexElements';
import Classifier from '../classifier';
import { useState, useRef } from 'react';
import Webcam from 'react-webcam';

const Home = () => {

    const [captureEmpty, setCaptureEmpty] = useState(true);
    const [imageSrc, setImageSrc] = useState("https://roadmap-tech.com/wp-content/uploads/2019/04/placeholder-image.jpg");
    const [imageFormat, setImageFormat] = useState("image/png");
    const [imageLabel, setImageLabel] = useState<string>("");
    const webcamRef = useRef<Webcam>(null);

    return (
        <HomeContainer>
            <Classifier captureEmpty={captureEmpty} setCaptureEmpty={setCaptureEmpty} imageSrc={imageSrc} setImageSrc={setImageSrc} webcamRef={webcamRef} imageFormat={imageFormat} setImageFormat={setImageFormat} imageLabel={imageLabel} setImageLabel={setImageLabel}/>
        </HomeContainer>
    );
}

export default Home;