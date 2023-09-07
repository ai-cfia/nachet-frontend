import { CaptureContainer, TitleHeader, CaptureImage, Select, Option, ParamsContainer, LabelInput } from "./indexElements";

type params = {
    imageSrc: string;
    imageFormat: string;
    setImageFormat: React.Dispatch<React.SetStateAction<string>>;
    imageLabel: string;
    setImageLabel: React.Dispatch<React.SetStateAction<string>>;
    captureEmpty: boolean;
}

const FeedCapture: React.FC<params> = (props) => {

    const handleFormat = (event: React.ChangeEvent<HTMLSelectElement>) => {
        props.setImageFormat(event.target.value);
    };

    const handleLabel = (event: React.ChangeEvent<HTMLInputElement>) => {
        props.setImageLabel(event.target.value);
    };

    return (
        <CaptureContainer>
            <TitleHeader>FEED CAPTURE</TitleHeader>
            <CaptureImage src={props.imageSrc} alt="placeholder" />
            <ParamsContainer>
                <LabelInput placeholder="Enter capture name" onChange={handleLabel} disabled={props.captureEmpty} value={props.imageLabel}/>
                <Select value={props.imageFormat} onChange={handleFormat}>
                    <Option value="image/png">Image Format: PNG</Option>
                    <Option value="image/jpeg">Image Format: JPEG</Option>
                </Select>
            </ParamsContainer>
        </CaptureContainer>
    );
}

export default FeedCapture;