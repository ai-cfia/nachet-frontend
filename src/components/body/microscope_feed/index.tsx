import Webcam from "react-webcam";
import React from "react";
import { Box, CardHeader, Button } from "@mui/material";
import { colours } from "../../../styles/colours";
import CameraswitchIcon from "@mui/icons-material/Cameraswitch";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";

interface params {
  webcamRef: React.RefObject<Webcam>;
  capture: () => void;
  activeDeviceId: string | undefined;
  setSwitchDeviceOpen: React.Dispatch<React.SetStateAction<boolean>>;
  windowSize: {
    width: number;
    height: number;
  };
}

const MicroscopeFeed: React.FC<params> = (props) => {
  const width = props.windowSize.width * 0.405;
  const height = props.windowSize.height * 0.65;
  return (
    <Box
      sx={{
        width: width - 0.5,
        height: height + 51,
        border: `0.05vw solid ${colours.CFIA_Font_Black}`,
        borderRadius: 1,
        borderBottom: 0,
      }}
    >
      <CardHeader
        title="MICROSCOPE FEED"
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
                props.capture();
              }}
              sx={{ marginRight: "0.4vw", borderRadius: 1 }}
            >
              <AddAPhotoIcon
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
              CAPTURE
            </Button>
            <Button
              color="inherit"
              variant="outlined"
              onClick={() => {
                props.setSwitchDeviceOpen(true);
              }}
              sx={{ marginRight: "0.4vw", borderRadius: 1 }}
            >
              <CameraswitchIcon
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
              SWITCH
            </Button>
          </div>
        }
      />
      <Webcam
        ref={props.webcamRef}
        mirrored={false}
        width={width - 1}
        height={height}
        style={{ objectFit: "cover" }}
        videoConstraints={{
          width: width - 1,
          height: height,
          deviceId: props.activeDeviceId,
        }}
        screenshotFormat={"image/png"}
        screenshotQuality={1}
      />
    </Box>
  );
};

export default MicroscopeFeed;
