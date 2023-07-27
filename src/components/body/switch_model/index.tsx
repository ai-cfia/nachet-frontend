import React from "react";
import { Overlay, InfoContainer } from "./indexElements";
import { Box, CardHeader, IconButton, TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { colours } from "../../../styles/colours";

interface params {
  setSwitchModelOpen: React.Dispatch<React.SetStateAction<boolean>>;
  switchModelOpen: boolean;
  setApiKey: React.Dispatch<React.SetStateAction<string>>;
  setApiURL: React.Dispatch<React.SetStateAction<string>>;
  apiKey: string;
  apiURL: string;
}

const SwitchModel: React.FC<params> = (props): JSX.Element => {
  const handleClose = (): void => {
    props.setSwitchModelOpen(false);
  };
  const handleApiURL = (event: any): void => {
    if (props.setApiURL === undefined) {
      return;
    }
    props.setApiURL(event.target.value);
  };
  const handleApiKey = (event: any): void => {
    if (props.setApiKey === undefined) {
      return;
    }
    props.setApiKey(event.target.value);
  };

  return (
    <Overlay>
      <Box
        sx={{
          width: "15vw",
          height: "20vh",
          zIndex: 30,
          border: `0.05vw solid ${colours.CFIA_Font_Black}`,
          borderRadius: 1,
          background: colours.CFIA_Background_White,
        }}
      >
        <CardHeader
          title="Switch Model"
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
          <TextField
            id="outlined-basic"
            label="API URL"
            variant="outlined"
            onChange={handleApiURL}
            value={props.apiURL}
            size="small"
            sx={{ marginBottom: "1vh" }}
          />
          <TextField
            id="outlined-basic"
            label="API Key"
            variant="outlined"
            onChange={handleApiKey}
            value={props.apiKey}
            size="small"
          />
        </InfoContainer>
      </Box>
    </Overlay>
  );
};

export default SwitchModel;
