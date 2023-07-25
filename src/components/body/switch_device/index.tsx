import React from "react";
import { Overlay, InfoContainer } from "./indexElements";
import { Box, CardHeader, IconButton, Select, MenuItem } from "@mui/material";
import type { SelectChangeEvent } from "@mui/material/Select";
import CloseIcon from "@mui/icons-material/Close";
import { colours } from "../../../styles/colours";

interface params {
  setSwitchDeviceOpen: React.Dispatch<React.SetStateAction<boolean>>;
  devices: MediaDeviceInfo[];
  setDeviceId: React.Dispatch<React.SetStateAction<string | undefined>>;
  activeDeviceId: string | undefined;
}

const SwitchDevice: React.FC<params> = (props): JSX.Element => {
  const handleClose = (): void => {
    props.setSwitchDeviceOpen(false);
  };

  const handleSwitch = (event: SelectChangeEvent): void => {
    if (props.setDeviceId === undefined) {
      return;
    }
    props.setDeviceId(event.target.value);
  };

  return (
    <Overlay>
      <Box
        sx={{
          width: "20vw",
          height: "20vh",
          zIndex: 30,
          border: `0.05vw solid ${colours.CFIA_Font_Black}`,
          borderRadius: 1,
          background: colours.CFIA_Background_White,
        }}
      >
        <CardHeader
          title="Switch Media Device"
          titleTypographyProps={{
            variant: "h6",
            align: "left",
            fontWeight: 600,
            fontSize: "1.3vh",
            color: colours.CFIA_Font_Black,
            zIndex: 30,
          }}
          action={
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          }
          sx={{ padding: "0.8vh 0.8vh 0.8vh 0.8vh" }}
        />
        <InfoContainer>
          <Select
            value={props.activeDeviceId}
            onChange={handleSwitch}
            placeholder="Capture Format"
            sx={{ width: "100%", marginTop: "1vh" }}
            size="small"
          >
            {props.devices.map((d) => (
              <MenuItem key={d.deviceId} value={d.deviceId}>
                {d.label}
              </MenuItem>
            ))}
          </Select>
        </InfoContainer>
      </Box>
    </Overlay>
  );
};

export default SwitchDevice;
