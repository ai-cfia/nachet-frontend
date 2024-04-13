// \components\body\microscope_feed\index.tsx
// MicroscopeFeed
import Webcam from "react-webcam";
import React, { useEffect } from "react";
import {
  Box,
  CardHeader,
  Button,
  Popover,
  FormControl,
  RadioGroup,
  FormLabel,
  FormControlLabel,
  Radio,
  IconButton,
  Select,
  MenuItem,
} from "@mui/material";
import { colours } from "../../../styles/colours";
import { Canvas } from "../feed_capture/indexElements";
// Import icons
import SwitchCameraIcon from "@mui/icons-material/SwitchCamera";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import DownloadIcon from "@mui/icons-material/Download";
import CropFreeIcon from "@mui/icons-material/CropFree";
import ToggleButton from "../buttons/ToggleButton";
import DonutSmallIcon from "@mui/icons-material/DonutSmall";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";

// Import a loading icon component (ensure you have this)
import CircularProgress from "@mui/material/CircularProgress";
import { Images } from "../../../common/types";
interface params {
  webcamRef: React.RefObject<Webcam>;
  capture: () => void;
  activeDeviceId: string | undefined;
  setSwitchDeviceOpen: React.Dispatch<React.SetStateAction<boolean>>;
  canvasRef: React.RefObject<HTMLCanvasElement>;
  setSaveOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setUploadOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSwitchModelOpen: React.Dispatch<React.SetStateAction<boolean>>;
  imageCache: Images[];
  handleInference: () => void;
  imageIndex: number;
  isWebcamActive: boolean;
  isLoading: boolean;
  onCaptureClick: () => void;
  windowSize: {
    width: number;
    height: number;
  };
}

const ScaledInferenceBox = (props: {
  imageWidth: number;
  imageHeight: number;
  box: Images["boxes"][0];
  canvasWidth: number;
  canvasHeight: number;
  label: string;
  color: string;
  visible: boolean;
  children?: React.ReactNode;
}): JSX.Element => {
  const {
    box,
    visible,
    color,
    imageWidth,
    imageHeight,
    canvasWidth,
    canvasHeight,
    children,
  } = props;
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null,
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const scaleFactorWidth = canvasWidth / imageWidth;
  const scaleFactorHeight = canvasHeight / imageHeight;
  const scaledWidth = (box.bottomX - box.topX) * scaleFactorWidth;
  const scaledHeight = (box.bottomY - box.topY) * scaleFactorHeight;
  const scaledTopX = box.topX * scaleFactorWidth;
  const scaledTopY = box.topY * scaleFactorHeight;
  return (
    <>
      <Button
        sx={{
          position: "absolute",
          minWidth: scaledWidth + 1,
          minHeight: scaledHeight + 1,
          maxWidth: scaledWidth + 1,
          maxHeight: scaledHeight + 1,
          left: scaledTopX,
          top: scaledTopY,
          border: `0.3vh solid ${color}`,
          borderRadius: 0,
          display: visible ? "block" : "none",
          zIndex: 10,
          "&:hover": {
            bgcolor: "rgba(175, 247, 148, 0.3)",
          },
        }}
        onClick={handleClick}
      />
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        sx={{ backgroundColor: "transparent", boxShadow: "none", zIndex: "30" }}
      >
        {children}
      </Popover>
    </>
  );
};

const FeedbackForm = (props: { children?: React.ReactNode }) => {
  const { children } = props;
  const [negative, setNegative] = React.useState<boolean>(false);
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null,
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    setNegative(true);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setNegative(false);
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const [age, setAge] = React.useState<number>(10);
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        border: `0.01vh solid LightGrey`,
      }}
    >
      <IconButton size="small">
        <CheckCircleOutlinedIcon
          sx={{
            color: "green",
          }}
        />
      </IconButton>

      <IconButton size="small" onClick={handleClick}>
        <CancelOutlinedIcon
          sx={{
            color: "red",
          }}
        />
      </IconButton>

      {negative && (
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "center",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          sx={{ zIndex: 30 }}
        >
          <FormControl>
            <FormLabel id="radio-buttons-group">Negative Feedback</FormLabel>
            <RadioGroup
              aria-labelledby="radio-buttons-group"
              defaultValue="No Seed"
              name="radio-buttons-group"
            >
              <FormControlLabel
                value="No Seed"
                control={<Radio />}
                label="No Seed"
              />
              <FormControlLabel
                value="Multi Seed"
                control={<Radio />}
                label="Multi Seed"
              />
              <FormControlLabel
                value="Wrong Seed"
                control={<Radio />}
                label={
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={age}
                    label="Age"
                    onChange={() => setAge(20)}
                  >
                    <MenuItem value={10}>Bromus Secalinus</MenuItem>
                    <MenuItem value={20}>Ambrosia Trifida</MenuItem>
                    <MenuItem value={30}>Lolium Temelentum</MenuItem>
                  </Select>
                }
              />
            </RadioGroup>
          </FormControl>
          {children}
        </Popover>
      )}
    </Box>
  );
};

const ButtonMicroscopeFeed = (props: {
  label: string;
  icon: React.ReactNode;
  disabled: boolean;
  onClick: () => void;
}): JSX.Element => {
  const { label, icon, onClick, disabled } = props;
  const buttonStyle = {
    marginRight: "0.9vh",
    marginLeft: 0,
    borderRadius: "0.4vh",
    paddingTop: "0.3vh",
    paddingBottom: "0.3vh",
    paddingLeft: "0.7vh",
    paddingRight: "0.7vh",
    fontSize: "1.17vh",
    width: "fit-content",
    border: `0.01vh solid LightGrey`,
    "&:hover": {
      backgroundColor: "#F5F5F5",
      transition: "0.1s ease-in-out all",
    },
  };
  return (
    <Button
      color="inherit"
      variant="outlined"
      disabled={disabled}
      onClick={onClick}
      sx={buttonStyle}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        {icon}
        <span>{label}</span>
      </div>
    </Button>
  );
};

const MicroscopeFeed: React.FC<params> = (props) => {
  const { imageIndex, imageCache, isLoading } = props;
  const [imageData, setImageData] = React.useState<Images | null>(null);
  const [drawBoxes, setDrawBoxes] = React.useState<boolean>(false);
  const width = props.windowSize.width * 0.519;
  const height = props.windowSize.height * 0.605;
  const iconStyle = {
    fontSize: "1.7vh",
    paddingRight: "0.4vh",
    marginTop: 0,
    marginBottom: 0,
    marginRight: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 0,
  };
  useEffect(() => {
    if (imageCache.length > 0) {
      const image = imageCache.find((image) => image.index === imageIndex);
      if (
        image &&
        image.annotated &&
        image.scores.length > 0 &&
        image.boxes.length > 0 &&
        image.classifications.length > 0 &&
        image.imageDims[0] > 0
      ) {
        setImageData(image);
        setDrawBoxes(true);
      } else {
        setImageData(null);
        setDrawBoxes(false);
      }
    }
  }, [imageIndex, imageCache]);
  return (
    <Box
      sx={{
        width: width - 0.5,
        height: "fit-content",
        border: `0.01vh solid LightGrey`,
        borderRadius: "0.4vh",
      }}
      boxShadow={0}
      data-testid="microscope-component"
    >
      <CardHeader
        titleTypographyProps={{
          variant: "h6",
          align: "left",
          fontWeight: 600,
          fontSize: "1.3vh",
          color: colours.CFIA_Font_Black,
        }}
        sx={{ padding: "0.8vh 0.8vh 0.8vh 0.8vh" }}
        action={
          <>
            <ButtonMicroscopeFeed
              label="CAPTURE"
              icon={<AddAPhotoIcon color="inherit" style={iconStyle} />}
              disabled={!props.isWebcamActive} // Disable when the webcam is active
              onClick={() => {
                props.capture();
              }}
            />
            <ButtonMicroscopeFeed
              label="SWITCH"
              icon={<SwitchCameraIcon color="inherit" style={iconStyle} />}
              disabled={!props.isWebcamActive} // Disable when the webcam is active
              onClick={() => {
                props.setSwitchDeviceOpen(true);
              }}
            />
            <ButtonMicroscopeFeed
              label="LOAD"
              icon={<UploadFileIcon color="inherit" style={iconStyle} />}
              disabled={props.isWebcamActive} // Disable when the webcam is active
              onClick={() => {
                props.setUploadOpen(true);
              }}
            />
            <ButtonMicroscopeFeed
              label="SAVE"
              icon={<DownloadIcon color="inherit" style={iconStyle} />}
              disabled={props.isWebcamActive} // Disable when the webcam is active
              onClick={() => {
                props.setSaveOpen(true);
              }}
            />
            <ButtonMicroscopeFeed
              label="MODEL SELECTION"
              icon={<DonutSmallIcon color="inherit" style={iconStyle} />}
              disabled={props.isWebcamActive} // Disable when the webcam is active
              onClick={() => {
                props.setSwitchModelOpen(true);
              }}
            />
            <ButtonMicroscopeFeed
              label="CLASSIFY"
              icon={<CropFreeIcon color="inherit" style={iconStyle} />}
              disabled={props.isWebcamActive} // Disable when the webcam is active
              onClick={() => {
                props.handleInference();
              }}
            />
          </>
        }
      />
      <div style={{ position: "relative", width: width - 1, height }}>
        {props.isWebcamActive ? (
          <Webcam
            ref={props.webcamRef}
            mirrored={false}
            width={width - 1}
            height={height}
            style={{ objectFit: "cover" }}
            videoConstraints={{
              width: width - 1,
              height,
              deviceId: props.activeDeviceId,
            }}
            screenshotFormat="image/png"
            screenshotQuality={1}
          />
        ) : (
          <>
            <Canvas ref={props.canvasRef} />
            {!isLoading && (
              <Box
                sx={{
                  height: "100%",
                  width: "100%",
                  position: "absolute",
                  top: 0,
                  left: 0,
                }}
              >
                {!isLoading &&
                  imageData &&
                  drawBoxes &&
                  imageData.boxes.map((box, index) => {
                    return (
                      <ScaledInferenceBox
                        key={index}
                        box={box}
                        label={
                          String((imageData.scores[index] * 100).toFixed(0)) +
                          "%"
                        }
                        imageWidth={imageData.imageDims[0]}
                        imageHeight={imageData.imageDims[1]}
                        canvasWidth={width}
                        canvasHeight={height}
                        color={"green"}
                        visible={true}
                      >
                        <FeedbackForm />
                      </ScaledInferenceBox>
                    );
                  })}
              </Box>
            )}
            {isLoading && (
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  background: "rgba(0, 0, 0, 0.5)", // Darkens the canvas area to make the loader visible
                }}
              >
                <CircularProgress style={{ color: "#FFFFFF" }} />{" "}
                {/* Adjust the color as needed */}
              </div>
            )}
          </>
        )}
      </div>

      <div style={{ display: "flex" }}>
        <ToggleButton
          isActive={!props.isWebcamActive}
          onClick={() => {
            if (!props.isWebcamActive) {
              props.onCaptureClick();
            }
          }}
          text="Video Feed"
        />
        <ToggleButton
          isActive={props.isWebcamActive}
          onClick={() => {
            if (props.isWebcamActive) {
              props.onCaptureClick();
            }
          }}
          text="Capture"
        />
      </div>
    </Box>
  );
};

export default MicroscopeFeed;
