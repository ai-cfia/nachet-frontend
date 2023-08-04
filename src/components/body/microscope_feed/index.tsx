import Webcam from "react-webcam";
import React from "react";
import { Box, CardHeader, IconButton } from "@mui/material";
import { colours } from "../../../styles/colours";
import CameraswitchIcon from "@mui/icons-material/Cameraswitch";
// import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";

interface params {
  webcamRef: React.RefObject<Webcam>;
  imageFormat: any;
  capture: () => void;
  activeDeviceId: string | undefined;
  windowSize: {
    width: number;
    height: number;
  };
}

const MicroscopeFeed: React.FC<params> = (props) => {
  const width = props.windowSize.width * 0.4034;
  const height = props.windowSize.height * 0.65;
  return (
    <Box
      sx={{
        width: "99.79%",
        height: "fit-content",
        border: `0.05vw solid ${colours.CFIA_Font_Black}`,
        borderRadius: 1,
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
          <IconButton
            sx={{ padding: 0, marginTop: "0.27vh", marginRight: "0.4vh" }}
            onClick={() => {
              console.log("test");
            }}
          >
            <CameraswitchIcon
              color="inherit"
              style={{
                fontSize: "2.4vh",
                marginTop: 0,
                marginBottom: 0,
                paddingTop: 0,
                paddingBottom: 0,
              }}
            />
          </IconButton>
        }
      />
      <Webcam
        ref={props.webcamRef}
        mirrored={false}
        width={width}
        height={height}
        style={{ objectFit: "cover" }}
        videoConstraints={{
          width: width,
          height: height,
          deviceId: props.activeDeviceId,
        }}
        screenshotFormat={"image/png"}
        screenshotQuality={0}
      />
    </Box>
  );
};

export default MicroscopeFeed;
