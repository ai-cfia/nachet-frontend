import Webcam from "react-webcam";
import React from "react";
import { Box, CardHeader } from "@mui/material";
import { colours } from "../../../styles/colours";

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
  const width = props.windowSize.width * 0.4035; // 0.2999 is the ratio of the width to height of the microscope feed
  const height = props.windowSize.height * 0.65; // 0.5218 is the ratio of the height to width of the microscope feed
  return (
    <Box
      sx={{
        width: "100%",
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
