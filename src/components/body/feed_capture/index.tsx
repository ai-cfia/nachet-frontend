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
  const width = props.windowSize.width * 0.405; // 0.2999 is the ratio of the width to height of the microscope feed
  const height = props.windowSize.height * 0.65; // 0.5218 is the ratio of the height to width of the microscope feed
  return (
    <Box
      sx={{
        width: "99.79%",
        height: "fit-content",
        borderRadius: 1,
        border: `0.05vw solid ${colours.CFIA_Font_Black}`,
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
        sx={{ padding: "0.8vh 0.8vh 0.8vh 0.8vh" }}
      />
      <Canvas ref={props.canvasRef} width={width} height={height} />
    </Box>
  );
};

export default FeedCapture;
