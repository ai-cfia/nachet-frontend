import { Box, Button, CardHeader } from "@mui/material";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import CameraswitchIcon from "@mui/icons-material/Cameraswitch";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import DownloadIcon from "@mui/icons-material/Download";
import CropFreeIcon from "@mui/icons-material/CropFree";
import ClearAllIcon from "@mui/icons-material/ClearAll";
import SwitchLeftIcon from "@mui/icons-material/SwitchLeft";
import ZoomOutMapIcon from "@mui/icons-material/ZoomOutMap";
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
    padding: "0.2vh",
    color: colours.CFIA_Font_Black,
    border: `0.05vw solid ${colours.CFIA_Font_Black}`,
  };

  const iconStyling = {
    paddingBottom: "0.4vh",
    paddingLeft: "0.2vh",
    paddingRight: "0.2vh",
    paddingTop: "0.2vh",
    fontSize: "2.5vh",
  };
  return (
    <Box
      sx={{
        width: "67%",
        height: props.windowSize.height * 0.125,
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
          <CameraswitchIcon sx={iconStyling} />
          SWITCH
        </Button>
        <Button
          variant="outlined"
          size="large"
          sx={buttonStyling}
          onClick={props.capture}
        >
          <AddAPhotoIcon sx={iconStyling} />
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
          <UploadFileIcon sx={iconStyling} />
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
          <DownloadIcon sx={iconStyling} />
          SAVE
        </Button>
        <Button
          variant="outlined"
          size="large"
          sx={buttonStyling}
          onClick={props.clearImageCache}
        >
          <ClearAllIcon sx={iconStyling} />
          CLEAR
        </Button>
        <Button
          variant="outlined"
          size="large"
          sx={buttonStyling}
          onClick={props.handleInference}
        >
          <CropFreeIcon sx={iconStyling} />
          CLASSIFY
        </Button>
        <Button variant="outlined" size="large" sx={buttonStyling}>
          <ZoomOutMapIcon sx={iconStyling} />
          Zoom
        </Button>
        <Button
          variant="outlined"
          size="large"
          sx={buttonStyling}
          onClick={() => {
            props.setSwitchModelOpen(true);
          }}
        >
          <SwitchLeftIcon sx={iconStyling} />
          MODEL
        </Button>
      </div>
    </Box>
  );
};

export default ToolBar;
