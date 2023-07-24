import Webcam from "react-webcam";
import React from "react";
import { Box, CardHeader } from "@mui/material";
import { colours } from "../../../styles/colours";

interface params {
  webcamRef: React.RefObject<Webcam>;
  imageFormat: any;
  capture: () => void;
  windowSize: {
    width: number;
    height: number;
  };
}

const MicroscopeFeed: React.FC<params> = (props) => {
  const width = props.windowSize.width * 0.262;
  const height = props.windowSize.height * 0.4515;
  return (
    <Box
      sx={{
        width: width,
        height: height + 48.3,
        border: 1,
        borderRadius: 1,
        padding: 0,
      }}
    >
      <CardHeader
        title="MICROSCOPE FEED"
        titleTypographyProps={{
          variant: "h6",
          align: "left",
          fontWeight: 600,
          fontSize: "1.1rem",
          color: colours.CFIA_Font_Black,
        }}
        sx={{ padding: "10px 10px 10px 10px" }}
      />
      <Webcam
        ref={props.webcamRef}
        mirrored={false}
        width={width} // 600
        height={height} // 606.5
        videoConstraints={{
          width: width,
          height: height,
          facingMode: { ideal: "environment" },
        }}
        screenshotFormat={props.imageFormat}
      />
    </Box>
  );
};

export default MicroscopeFeed;
