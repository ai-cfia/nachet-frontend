import { Button, ButtonWrap, ControlContainer, TitleHeader } from './indexElements';
import { colours } from '../../../styles/colours';
import React from "react";
import Webcam from 'react-webcam';

type params = {
    captureEmpty: boolean;
    setCaptureEmpty: React.Dispatch<React.SetStateAction<boolean>>;
    imageSrc: string;
    setImageSrc: React.Dispatch<React.SetStateAction<string>>;
    webcamRef: React.RefObject<Webcam>;
    capture: () => void;
    clear: () => void;
}

const FeedControl: React.FC<params> = (props) => {

    return (
        <ControlContainer>
            <TitleHeader>CAPTURE TOOL</TitleHeader>
            <ButtonWrap>
                <Button disabled={false} color={colours.CFIA_Background_Blue} onClick={props.capture}>Capture Feed</Button>
                <Button disabled={props.captureEmpty} color={colours.CFIA_Background_Blue} onClick={props.clear}>Clear Capture</Button>
            </ButtonWrap>
        </ControlContainer>
    );

}

export default FeedControl;