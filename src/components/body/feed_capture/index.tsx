import { Box, CardHeader } from "@mui/material";
import { Canvas } from "./indexElements";
import { colours } from "../../../styles/colours";

interface params {
  canvasRef: React.RefObject<HTMLCanvasElement>;
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
          fontSize: "18px",
          color: colours.CFIA_Font_Black,
          paddingBottom: "3.5px",
        }}
      />
      <Canvas ref={props.canvasRef} width={600} height={600} />
    </Box>
  );
};

export default FeedCapture;
