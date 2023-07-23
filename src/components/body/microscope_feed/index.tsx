import Webcam from "react-webcam";
import React from "react";
import { Box, CardHeader } from "@mui/material";
import { colours } from "../../../styles/colours";

interface params {
  webcamRef: React.RefObject<Webcam>;
  imageFormat: any;
  capture: () => void;
}

const MicroscopeFeed: React.FC<params> = (props) => {
  return (
    <Box
      sx={{
        width: 600,
        height: 664,
        border: 1,
        borderRadius: 1,
      }}
    >
      <CardHeader
        title="MICROSCOPE FEED"
        titleTypographyProps={{
          variant: "h6",
          align: "left",
          fontWeight: 600,
          fontSize: "18px",
          color: colours.CFIA_Font_Black,
        }}
      />
      <Webcam
        ref={props.webcamRef}
        mirrored={false}
        width={600}
        height={606.5}
        videoConstraints={{
          width: 600,
          height: 600,
          facingMode: { ideal: "environment" },
        }}
        screenshotFormat={props.imageFormat}
      />
    </Box>
  );
};

export default MicroscopeFeed;
