import React from "react";
import { Overlay, InfoContainer, Text } from "./indexElements";
import { Box, CardHeader, IconButton, Slider } from "@mui/material";
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

  const handleSliderChange = (event: any, value: any): void => {
    props.setScoreThreshold(value);
  };

  return (
    <Overlay>
      <Box
        sx={{
          width: "20vw",
          height: "22vh",
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
        <InfoContainer>
          <Text> Minimum Confidence Threshhold ({props.scoreThreshold}%) </Text>
          <Slider
            sx={{ color: colours.CFIA_Background_Blue }}
            key={`slider-${props.scoreThreshold}`}
            aria-label="Confidence Threshold"
            defaultValue={props.scoreThreshold}
            valueLabelDisplay="auto"
            onChangeCommitted={handleSliderChange}
            step={10}
            marks
            min={10}
            max={90}
          />
        </InfoContainer>
      </Box>
    </Overlay>
  );
};

export default ResultsTunerPopup;
