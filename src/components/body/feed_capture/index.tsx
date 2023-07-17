import { CaptureContainer, TitleHeader, CaptureImage } from "./indexElements";

type params = {
  imageSrc: string;
  imageFormat: string;
  setImageFormat: React.Dispatch<React.SetStateAction<string>>;
  imageLabel: string;
  setImageLabel: React.Dispatch<React.SetStateAction<string>>;
  captureEmpty: boolean;
};

const FeedCapture: React.FC<params> = (props) => {
  return (
    <CaptureContainer>
      <TitleHeader>FEED CAPTURE</TitleHeader>
      <CaptureImage src={props.imageSrc} alt="placeholder" />
    </CaptureContainer>
  );
};

export default FeedCapture;
