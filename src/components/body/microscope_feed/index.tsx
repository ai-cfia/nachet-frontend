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
  const buttonStyle = {
    marginRight: "0.9vh",
    marginLeft: 0,
    borderRadius: "0.4vh",
    paddingTop: "0.3vh",
    paddingBottom: "0.3vh",
    paddingLeft: "0.7vh",
    paddingRight: "0.7vh",
    fontSize: "1.16vh",
    width: "fit-content",
    border: `0.01vh solid ${colours.CFIA_Font_Black}`,
  };
  const iconStyle = {
    fontSize: "1.7vh",
    paddingRight: "0.4vh",
    marginTop: 0,
    marginBottom: 0,
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 0,
  };
  return (
    <Box
      sx={{
        width: width - 0.5,
        height: "fit-content",
        border: `0.01vh solid ${colours.CFIA_Font_Black}`,
        borderRadius: "0.4vh",
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
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
              sx={buttonStyle}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  flexWrap: "wrap",
                }}
              >
                <AddAPhotoIcon color="inherit" style={iconStyle} />
                <span>CAPTURE</span>
              </div>
            </Button>
            <Button
              color="inherit"
              variant="outlined"
              onClick={() => {
                props.setSwitchDeviceOpen(true);
              }}
              sx={buttonStyle}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  flexWrap: "wrap",
                }}
              >
                <CameraswitchIcon color="inherit" style={iconStyle} />
                <span>SWITCH</span>
              </div>
            </Button>
          </div>
        }
      />
      <div>
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
      </div>
    </Box>
  );
};

export default MicroscopeFeed;
