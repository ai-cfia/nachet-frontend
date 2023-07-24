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
        height: "fit-content",
        border: 1,
        borderRadius: 1,
        borderBottom: 0,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
      }}
    >
      <CardHeader
        title="CAPTURE"
        titleTypographyProps={{
          variant: "h6",
          align: "left",
          fontWeight: 600,
          fontSize: "1.3vh",
          color: colours.CFIA_Font_Black,
        }}
        sx={{ padding: "10px 10px 10px 10px" }}
      />
      <Canvas ref={props.canvasRef} width={width} height={height} />
    </Box>
  );
};

export default FeedCapture;
