import { CaptureContainer, TitleHeader, Canvas } from "./indexElements";

interface params {
  imageSrc: string;
  imageFormat: string;
  setImageFormat: React.Dispatch<React.SetStateAction<string>>;
  imageLabel: string;
  setImageLabel: React.Dispatch<React.SetStateAction<string>>;
  captureEmpty: boolean;
  canvasRef: React.RefObject<HTMLCanvasElement>;
}

const FeedCapture: React.FC<params> = (props) => {
  return (
    <CaptureContainer>
      <TitleHeader>FEED CAPTURE</TitleHeader>
      <Canvas ref={props.canvasRef} width={600} height={600} />
    </CaptureContainer>
  );
};

export default FeedCapture;
