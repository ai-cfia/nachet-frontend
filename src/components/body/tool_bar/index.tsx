import { Box, Button, CardHeader } from "@mui/material";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import CameraswitchIcon from "@mui/icons-material/Cameraswitch";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import DownloadIcon from "@mui/icons-material/Download";
import CropFreeIcon from "@mui/icons-material/CropFree";
import ClearAllIcon from "@mui/icons-material/ClearAll";
import SwitchLeftIcon from "@mui/icons-material/SwitchLeft";
import { colours } from "../../../styles/colours";

interface params {
  handleInference: () => void;
  capture: () => void;
  setUploadOpen: React.Dispatch<React.SetStateAction<boolean>>;
  clearImageCache: () => void;
  setSaveOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSwitchModelOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSwitchDeviceOpen: React.Dispatch<React.SetStateAction<boolean>>;
  windowSize: { width: number; height: number };
}

const ToolBar: React.FC<params> = (props) => {
  const buttonStyling = {
    alignContent: "center",
    alignItems: "center",
    marginTop: "1vh",
    display: "flex",
    flexDirection: "column",
    fontSize: "0.6vw",
    fontWeight: 600,
    width: "5vw",
    height: "6.5vh",
    color: colours.CFIA_Font_Black,
    border: `0.05vw solid ${colours.CFIA_Font_Black}`,
  };
  return (
    <Box
      sx={{
        width: "100%",
        height: props.windowSize.height * 0.12,
        border: `0.05vw solid ${colours.CFIA_Font_Black}`,
        borderRadius: 1,
      }}
    >
      <CardHeader
        title="TOOLS"
        titleTypographyProps={{
          variant: "h6",
          align: "left",
          fontWeight: 600,
          fontSize: "1.3vh",
          color: colours.CFIA_Font_Black,
        }}
        sx={{ padding: "0.5vh 0.5vh 0 0.5vh" }}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        <Button
          variant="outlined"
          size="large"
          sx={buttonStyling}
          onClick={() => {
            props.setSwitchDeviceOpen(true);
          }}
        >
          <CameraswitchIcon
            sx={{ paddingBottom: "0.5vh", fontSize: "2.5vh" }}
          />
          SWITCH
        </Button>
        <Button
          variant="outlined"
          size="large"
          sx={buttonStyling}
          onClick={props.capture}
        >
          <AddAPhotoIcon sx={{ paddingBottom: "0.5vh", fontSize: "2.5vh" }} />
          CAPTURE
        </Button>
        <Button
          variant="outlined"
          size="large"
          sx={buttonStyling}
          onClick={() => {
            props.setUploadOpen(true);
          }}
        >
          <UploadFileIcon sx={{ paddingBottom: "0.5vh", fontSize: "2.5vh" }} />
          LOAD
        </Button>
        <Button
          variant="outlined"
          size="large"
          sx={buttonStyling}
          onClick={() => {
            props.setSaveOpen(true);
          }}
        >
          <DownloadIcon sx={{ paddingBottom: "0.5vh", fontSize: "2.5vh" }} />
          SAVE
        </Button>
        <Button
          variant="outlined"
          size="large"
          sx={buttonStyling}
          onClick={props.clearImageCache}
        >
          <ClearAllIcon sx={{ paddingBottom: "0.5vh", fontSize: "2.5vh" }} />
          CLEAR
        </Button>
        <Button
          variant="outlined"
          size="large"
          sx={buttonStyling}
          onClick={props.handleInference}
        >
          <CropFreeIcon sx={{ paddingBottom: "0.5vh", fontSize: "2.5vh" }} />
          CLASSIFY
        </Button>
        <Button
          variant="outlined"
          size="large"
          sx={buttonStyling}
          onClick={() => {
            props.setSwitchModelOpen(true);
          }}
        >
          <SwitchLeftIcon sx={{ paddingBottom: "0.5vh", fontSize: "2.5vh" }} />
          MODEL
        </Button>
      </div>
    </Box>
  );
};

export default ToolBar;
