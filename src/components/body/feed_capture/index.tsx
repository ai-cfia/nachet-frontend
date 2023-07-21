import { Box, CardHeader } from "@mui/material";
import { Canvas } from "./indexElements";
import { colours } from "../../../styles/colours";

interface params {
  imageSrc: string;
  imageFormat: string;
  setImageFormat: React.Dispatch<React.SetStateAction<string>>;
  imageLabel: string;
  setImageLabel: React.Dispatch<React.SetStateAction<string>>;
  captureEmpty: boolean;
  canvasRef: React.RefObject<HTMLCanvasElement>;
  handleInference: () => void;
}

const FeedCapture: React.FC<params> = (props) => {
  return (
    <Box
      sx={{
        width: 600,
        height: 664,
        border: 1,
        borderRadius: 1,
      }}
    >
      <CardHeader
        title="CAPTURE"
        titleTypographyProps={{
          variant: "h6",
          align: "left",
          fontWeight: 600,
          color: colours.CFIA_Font_black,
        }}
      />
      <Canvas ref={props.canvasRef} width={600} height={600} />
    </Box>
  );
};

export default FeedCapture;
