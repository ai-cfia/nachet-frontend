import React from "react";
import { Overlay, InfoContainer } from "./indexElements";
import { Box, CardHeader, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { colours } from "../../../styles/colours";

interface params {
  setSwitchModelOpen: React.Dispatch<React.SetStateAction<boolean>>;
  switchModelOpen: boolean;
}

const SwitchModel: React.FC<params> = (props): JSX.Element => {
  const handleClose = (): void => {
    props.setSwitchModelOpen(false);
  };

  return (
    <Overlay>
      <Box
        sx={{
          width: 400,
          height: 250,
          zIndex: 30,
          border: 1,
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
          sx={{
            paddingBottom: 0,
          }}
        />
        <InfoContainer></InfoContainer>
      </Box>
    </Overlay>
  );
};

export default SwitchModel;
