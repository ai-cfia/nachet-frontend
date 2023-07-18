import {
  CaptureContainer,
  TitleHeader,
  CaptureImage,
  Canvas,
} from "./indexElements";

type params = {
  imageSrc: string;
  imageFormat: string;
  setImageFormat: React.Dispatch<React.SetStateAction<string>>;
  imageLabel: string;
  setImageLabel: React.Dispatch<React.SetStateAction<string>>;
  captureEmpty: boolean;
  canvasRef: React.RefObject<HTMLCanvasElement>;
};

const FeedCapture: React.FC<params> = (props) => {
  return (
    <CaptureContainer>
      <TitleHeader>FEED CAPTURE</TitleHeader>
      {/* <CaptureImage src={props.imageSrc} alt="placeholder" /> */}
      <Canvas ref={props.canvasRef} />
    </CaptureContainer>
  );
};

export default FeedCapture;
