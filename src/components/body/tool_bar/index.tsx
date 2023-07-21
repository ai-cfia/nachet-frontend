import { Box, Button, CardHeader } from "@mui/material";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import DownloadIcon from "@mui/icons-material/Download";
import CropFreeIcon from "@mui/icons-material/CropFree";
import ClearAllIcon from "@mui/icons-material/ClearAll";
import SwitchLeftIcon from "@mui/icons-material/SwitchLeft";
import CameraswitchIcon from "@mui/icons-material/Cameraswitch";
import type Webcam from "react-webcam";

interface params {
  imageSrc: string;
  imageFormat: string;
  setImageFormat: React.Dispatch<React.SetStateAction<string>>;
  imageLabel: string;
  setImageLabel: React.Dispatch<React.SetStateAction<string>>;
  captureEmpty: boolean;
  canvasRef: React.RefObject<HTMLCanvasElement>;
  handleInference: () => void;
  webcamRef: React.RefObject<Webcam>;
  capture: () => void;
  setUploadOpen: React.Dispatch<React.SetStateAction<boolean>>;
  clearImageCache: () => void;
  setSaveOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ToolBar: React.FC<params> = (props) => {
  return (
    <Box
      sx={{
        width: 1625,
        height: 170,
        border: 1,
        borderRadius: 1,
      }}
    >
      <CardHeader
        title="Tools"
        titleTypographyProps={{ variant: "h6" }}
        sx={{
          paddingBottom: 0,
        }}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Button
          variant="outlined"
          size="large"
          sx={{
            alignContent: "center",
            alignItems: "center",
            padding: 3,
            marginTop: 2,
            marginBottom: 2,
          }}
          onClick={() => {
            console.log("switch");
          }}
        >
          <CameraswitchIcon fontSize="medium" />
        </Button>
        <Button
          variant="outlined"
          size="large"
          sx={{
            alignContent: "center",
            alignItems: "center",
            padding: 3,
            marginTop: 2,
            marginBottom: 2,
          }}
          onClick={props.capture}
        >
          <AddAPhotoIcon fontSize="medium" />
        </Button>
        <Button
          variant="outlined"
          size="large"
          sx={{
            alignContent: "center",
            alignItems: "center",
            padding: 3,
            marginTop: 2,
            marginBottom: 2,
          }}
          onClick={() => {
            props.setUploadOpen(true);
          }}
        >
          <UploadFileIcon fontSize="medium" />
        </Button>
        <Button
          variant="outlined"
          size="large"
          sx={{
            alignContent: "center",
            alignItems: "center",
            padding: 3,
            marginTop: 2,
            marginBottom: 2,
          }}
          onClick={props.clearImageCache}
        >
          <ClearAllIcon fontSize="medium" />
        </Button>
        <Button
          variant="outlined"
          size="large"
          sx={{
            alignContent: "center",
            alignItems: "center",
            padding: 3,
            marginTop: 2,
            marginBottom: 2,
          }}
          onClick={() => {
            props.setSaveOpen(true);
          }}
        >
          <DownloadIcon fontSize="medium" />
        </Button>
        <Button
          variant="outlined"
          size="large"
          sx={{
            alignContent: "center",
            alignItems: "center",
            padding: 3,
            marginTop: 2,
            marginBottom: 2,
          }}
          onClick={() => {
            console.log("upload to azure");
          }}
        >
          <CloudUploadIcon fontSize="medium" />
        </Button>
        <Button
          variant="outlined"
          size="large"
          sx={{
            alignContent: "center",
            alignItems: "center",
            padding: 3,
            marginTop: 2,
            marginBottom: 2,
          }}
          onClick={props.handleInference}
        >
          <CropFreeIcon fontSize="medium" />
        </Button>
        <Button
          variant="outlined"
          size="large"
          sx={{
            alignContent: "center",
            alignItems: "center",
            padding: 3,
            marginTop: 2,
            marginBottom: 2,
          }}
          onClick={() => {
            console.log("switch model");
          }}
        >
          <SwitchLeftIcon fontSize="medium" />
        </Button>
      </div>
    </Box>
  );
};

export default ToolBar;
