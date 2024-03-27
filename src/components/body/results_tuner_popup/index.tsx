// Result Tuner Popup
// \src\components\body\results_tuner_popup\index.tsx
import React from "react";
import { Overlay, InfoContainer } from "./indexElements";
import { Box, CardHeader, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { colours } from "../../../styles/colours";

interface params {
  setResultsTunerOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setScoreThreshold: React.Dispatch<React.SetStateAction<number>>;
  scoreThreshold: number;
}

const ResultsTunerPopup: React.FC<params> = (props): JSX.Element => {
  const handleClose = (): void => {
    props.setResultsTunerOpen(false);
  };

  return (
    <Overlay>
      <Box
        sx={{
          position: "relative",
          width: "50vw",
          height: "65vh",
          zIndex: 30,
          border: `0.01vh solid LightGrey`,
          borderRadius: 1,
          background: colours.CFIA_Background_White,
        }}
        boxShadow={1}
      >
        <CardHeader
          title="Configuration"
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
        <InfoContainer></InfoContainer>
      </Box>
    </Overlay>
  );
};

export default ResultsTunerPopup;
