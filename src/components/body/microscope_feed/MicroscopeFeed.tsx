// \components\body\microscope_feed\index.tsx
// MicroscopeFeed
import Webcam from "react-webcam";
import React, { useEffect } from "react";
import { Box, CardHeader, Button } from "@mui/material";
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

// Import a loading icon component (ensure you have this)
import CircularProgress from "@mui/material/CircularProgress";
import { Images } from "../../../common/types";

import ScaledInferenceBox from "../scaled_inference_box";
import FeedbackForm from "../feedback_form";
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
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
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
          </Box>
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
