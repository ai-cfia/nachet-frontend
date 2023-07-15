import { CaptureContainer, TitleHeader, CaptureImage, Select, Option } from "./indexElements";
import { useState } from "react";

type params = {
    imageSrc: string;
    imageFormat: string;
    setImageFormat: React.Dispatch<React.SetStateAction<string>>;
}

const FeedCapture: React.FC<params> = (props) => {

    const handleFormat = (event: React.ChangeEvent<HTMLSelectElement>) => {
        props.setImageFormat(event.target.value);
    };

    return (
        <CaptureContainer>
            <TitleHeader>FEED CAPTURE</TitleHeader>
            <CaptureImage src={props.imageSrc} alt="placeholder" />
            <Select value={props.imageFormat} onChange={handleFormat}>
                <Option value="image/png">Image Format: PNG</Option>
                <Option value="image/jpeg">Image Format: JPEG</Option>
            </Select>
        </CaptureContainer>
    );
}

export default FeedCapture;