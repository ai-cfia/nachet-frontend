import { Box, CardHeader } from "@mui/material";
import { Canvas } from "./indexElements";
import { colours } from "../../../styles/colours";

interface params {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  windowSize: {
    width: number;
    height: number;
  };
}

const FeedCapture: React.FC<params> = (props) => {
  const width = props.windowSize.width * 0.262;
  const height = props.windowSize.height * 0.4515;
  return (
    <Box
      sx={{
        width: width,
        height: height + 48.7,
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
          fontSize: "1.1rem",
          color: colours.CFIA_Font_Black,
        }}
        sx={{ padding: "10px 10px 10px 10px" }}
      />
      <Canvas ref={props.canvasRef} width={width} height={height + 0.27} />
    </Box>
  );
};

export default FeedCapture;
