import { Box, CardHeader, Button } from "@mui/material";
import { Canvas } from "./indexElements";
import { colours } from "../../../styles/colours";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import DownloadIcon from "@mui/icons-material/Download";
import CropFreeIcon from "@mui/icons-material/CropFree";
import SwitchLeftIcon from "@mui/icons-material/SwitchLeft";

interface params {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  setSaveOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setUploadOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSwitchModelOpen: React.Dispatch<React.SetStateAction<boolean>>;
  imageCache: any[];
  handleInference: () => void;
  imageIndex: number;
  windowSize: {
    width: number;
    height: number;
  };
}

const FeedCapture: React.FC<params> = (props) => {
  const width = props.windowSize.width * 0.405;
  const height = props.windowSize.height * 0.65;
  return (
    <Box
      sx={{
        width: width - 3.2,
        height: height + 51,
        borderRadius: 1,
        border: `0.05vw solid ${colours.CFIA_Font_Black}`,
        borderBottom: 0,
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
        action={
          <div>
            <Button
              color="inherit"
              variant="outlined"
              onClick={() => {
                props.setUploadOpen(true);
              }}
              sx={{ marginRight: "0.4vw", borderRadius: 1 }}
            >
              <UploadFileIcon
                color="inherit"
                style={{
                  fontSize: "1.7vh",
                  paddingRight: "0.2vw",
                  marginTop: 0,
                  marginBottom: 0,
                  paddingTop: 0,
                  paddingBottom: 0,
                }}
              />
              LOAD
            </Button>
            <Button
              color="inherit"
              variant="outlined"
              onClick={() => {
                props.setSaveOpen(true);
              }}
              sx={{ marginRight: "0.4vw", borderRadius: 1 }}
            >
              <DownloadIcon
                color="inherit"
                style={{
                  fontSize: "1.7vh",
                  paddingRight: "0.2vw",
                  marginTop: 0,
                  marginBottom: 0,
                  paddingTop: 0,
                  paddingBottom: 0,
                }}
              />
              SAVE
            </Button>
            <Button
              color="inherit"
              variant="outlined"
              onClick={() => {
                props.handleInference();
              }}
              sx={{ marginRight: "0.4vw", borderRadius: 1 }}
            >
              <CropFreeIcon
                color="inherit"
                style={{
                  fontSize: "1.7vh",
                  paddingRight: "0.2vw",
                  marginTop: 0,
                  marginBottom: 0,
                  paddingTop: 0,
                  paddingBottom: 0,
                }}
              />
              CLASSIFY
            </Button>
            <Button
              color="inherit"
              variant="outlined"
              onClick={() => {
                props.setSwitchModelOpen(true);
              }}
              sx={{ marginRight: "0.4vw", borderRadius: 1 }}
            >
              <SwitchLeftIcon
                color="inherit"
                style={{
                  fontSize: "1.7vh",
                  paddingRight: "0.2vw",
                  marginTop: 0,
                  marginBottom: 0,
                  paddingTop: 0,
                  paddingBottom: 0,
                }}
              />
              SWITCH MODEL
            </Button>
          </div>
        }
      />
      <Canvas ref={props.canvasRef} />
    </Box>
  );
};

export default FeedCapture;
