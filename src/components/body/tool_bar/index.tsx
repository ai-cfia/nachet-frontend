import { Box, Button, CardHeader } from "@mui/material";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
// import CloudUploadIcon from "@mui/icons-material/CloudUpload";
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
  setAzureOpen: React.Dispatch<React.SetStateAction<boolean>>;
  windowSize: { width: number; height: number };
}

const ToolBar: React.FC<params> = (props) => {
  const buttonStyling = {
    alignContent: "center",
    alignItems: "center",
    padding: "0.5vh",
    marginTop: "1vh",
    display: "flex",
    flexDirection: "column",
    fontSize: "1.1vh",
    width: props.windowSize.width * 0.05,
    color: colours.CFIA_Font_Black,
    borderColor: colours.CFIA_Font_Black,
  };
  return (
    <Box
      sx={{
        width: props.windowSize.width * 0.708,
        height: 160,
        border: 1,
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
        sx={{ padding: "0.5vh 0.5vh 0px 0.5vh" }}
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
          sx={buttonStyling}
          onClick={props.capture}
        >
          <AddAPhotoIcon fontSize="large" sx={{ paddingBottom: 0.5 }} />
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
          <UploadFileIcon fontSize="large" sx={{ paddingBottom: 0.5 }} />
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
          <DownloadIcon fontSize="large" sx={{ paddingBottom: 0.5 }} />
          SAVE
        </Button>
        <Button
          variant="outlined"
          size="large"
          sx={buttonStyling}
          onClick={props.clearImageCache}
        >
          <ClearAllIcon fontSize="large" sx={{ paddingBottom: 0.5 }} />
          CLEAR
        </Button>
        <Button
          variant="outlined"
          size="large"
          sx={buttonStyling}
          onClick={props.handleInference}
        >
          <CropFreeIcon fontSize="large" sx={{ paddingBottom: 0.5 }} />
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
          <SwitchLeftIcon fontSize="large" sx={{ paddingBottom: 0.5 }} />
          MODEL
        </Button>
      </div>
    </Box>
  );
};

export default ToolBar;
