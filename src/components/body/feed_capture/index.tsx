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
  return (
    <Box
      sx={{
        width: "100%",
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
      {/* <Canvas ref={props.canvasRef} width={width} height={height} /> */}
      <Canvas ref={props.canvasRef} width={800} height={800} />
    </Box>
  );
};

export default FeedCapture;
