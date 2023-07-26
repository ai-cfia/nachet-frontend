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
  const width = props.windowSize.width * 0.262;
  const height = props.windowSize.height * 0.4515; // 0.4515
  return (
    <Box
      sx={{
        width: width,
        height: "48.9vh",
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
        width={width + 1} // 600
        height={height + 1} // 606.5
        style={{ objectFit: "cover" }}
        videoConstraints={{
          width: width + 1,
          height: height + 1,
          deviceId: props.activeDeviceId,
          facingMode: { ideal: "environment" },
        }}
        screenshotFormat={props.imageFormat}
      />
    </Box>
  );
};

export default MicroscopeFeed;
