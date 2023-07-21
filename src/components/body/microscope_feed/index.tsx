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
  // const [videoDevices, setVideoDevices] = useState<
  //   { deviceId: string; label: string }[]
  // >([]);

  // useEffect(() => {
  //   const getVideoDevices = async () => {
  //     try {
  //       const devices = await navigator.mediaDevices.enumerateDevices();
  //       const videoInputDevices = devices.filter(
  //         (device) => device.kind === "videoinput",
  //       );
  //       setVideoDevices(videoInputDevices);
  //     } catch (error) {
  //       console.error("Error enumerating video devices:", error);
  //     }
  //   };

  //   getVideoDevices();
  // }, []);

  // const handleDevices = (event: React.ChangeEvent<HTMLSelectElement>) => {
  //   setSelectedDevice(event.target.value);
  // };

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
        title="FEED"
        titleTypographyProps={{
          variant: "h6",
          align: "left",
          fontWeight: 800,
          color: colours.CFIA_Font_black,
        }}
      />
      <Webcam
        ref={props.webcamRef}
        mirrored={false}
        width={600}
        height={600}
        videoConstraints={{
          width: 600,
          height: 600,
          facingMode: { ideal: "environment" },
        }}
        screenshotFormat={props.imageFormat}
      />
      {/* <Select value={selectedDevice} onChange={handleDevices}>
            <Option value="">Select feed input</Option>
            { videoDevices.map((device) => (
               <Option key={device.deviceId} value={device.deviceId}>
                  {device.label}
               </Option>
            ))}
         </Select> */}
    </Box>
  );
};

export default MicroscopeFeed;
