import { Box, CardHeader, Button } from "@mui/material";
import { Canvas } from "./indexElements";
import { colours } from "../../../styles/colours";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import DownloadIcon from "@mui/icons-material/Download";
import CropFreeIcon from "@mui/icons-material/CropFree";
import InfoIcon from "@mui/icons-material/Info";

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
  // const height = props.windowSize.height * 0.65;
  const buttonStyle = {
    marginRight: "0.9vh",
    marginLeft: 0,
    borderRadius: "0.4vh",
    paddingTop: "0.3vh",
    paddingBottom: "0.3vh",
    paddingLeft: "0.7vh",
    paddingRight: "0.7vh",
    fontSize: "1.16vh",
    width: "fit-content",
    border: `0.01vh solid ${colours.CFIA_Font_Black}`,
  };
  const iconStyle = {
    fontSize: "1.6vh",
    paddingRight: "0.4vh",
    marginTop: 0,
    marginBottom: 0,
    marginRight: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 0,
  };
  return (
    <Box
      sx={{
        width: width - 3.2,
        height: "fit-content",
        border: `0.01vh solid ${colours.CFIA_Font_Black}`,
        borderRadius: "0.4vh",
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
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
              sx={buttonStyle}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  flexWrap: "wrap",
                }}
              >
                <UploadFileIcon color="inherit" style={iconStyle} />
                <span>LOAD</span>
              </div>
            </Button>
            <Button
              color="inherit"
              variant="outlined"
              onClick={() => {
                props.setSaveOpen(true);
              }}
              sx={buttonStyle}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  flexWrap: "wrap",
                }}
              >
                <DownloadIcon color="inherit" style={iconStyle} />
                <span>SAVE</span>
              </div>
            </Button>
            <Button
              color="inherit"
              variant="outlined"
              onClick={() => {
                props.handleInference();
              }}
              sx={buttonStyle}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  flexWrap: "wrap",
                }}
              >
                <CropFreeIcon color="inherit" style={iconStyle} />
                <span>CLASSIFY</span>
              </div>
            </Button>
            <Button
              color="inherit"
              variant="outlined"
              onClick={() => {
                props.setSwitchModelOpen(true);
              }}
              sx={buttonStyle}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  flexWrap: "wrap",
                }}
              >
                <InfoIcon color="inherit" style={iconStyle} />
                <span>MODEL</span>
              </div>
            </Button>
          </div>
        }
      />
      <div>
        <Canvas ref={props.canvasRef} />
      </div>
    </Box>
  );
};

export default FeedCapture;
