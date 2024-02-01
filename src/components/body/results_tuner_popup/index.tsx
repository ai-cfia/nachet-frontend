// Result Tuner Popup
// \src\components\body\results_tuner_popup\index.tsx
import React from "react";
import { Overlay, InfoContainer } from "./indexElements";
import { Box, CardHeader, IconButton, Slider } from "@mui/material";
import Radio from "@mui/material/Radio";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import { colours } from "../../../styles/colours";
import testData from "../../../static_data/static_model_data.json";

interface params {
  setResultsTunerOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setScoreThreshold: React.Dispatch<React.SetStateAction<number>>;
  scoreThreshold: number;
  selectedModel: string;
  setSelectedModel: React.Dispatch<React.SetStateAction<string>>;
  realData: any[]; // Type should be adjusted to match the actual data structure
}

const ResultsTunerPopup: React.FC<params> = (props): JSX.Element => {
  const handleClose = (): void => {
    props.setResultsTunerOpen(false);
  };

  const handleSliderChange = (event: any, value: any): void => {
    props.setScoreThreshold(value);
  };

  const selectModel = (model: string): void => {
    console.log("Model selected:", model);
    props.setSelectedModel(model);
  };

  const dataToDisplay =
    process.env.REACT_APP_MODE === "test" ? testData : props.realData;

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
        <InfoContainer>
          <Typography variant="subtitle1" sx={{ marginTop: 3 }}>
            Minimum Confidence Threshold ({props.scoreThreshold}%)
          </Typography>
          <Slider
            sx={{ color: colours.CFIA_Background_Blue, marginBottom: 2 }}
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
          <Typography
            variant="subtitle1"
            sx={{ marginTop: 1, marginBottom: 2 }}
          >
            Model Selection:
          </Typography>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: 1,
              maxHeight: "30vh",
              overflowY: "auto",
            }}
          >
            {dataToDisplay.map((data, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  border: "1px solid lightgrey",
                  borderRadius: "4px",
                  padding: "1vh",
                  cursor: "pointer",
                  backgroundColor:
                    props.selectedModel === data.model_name
                      ? "#f0f0f0"
                      : "#fff",
                  "&:hover": {
                    backgroundColor: "#e0e0e0",
                  },
                  width: "34vh",
                  height: "16vh",
                  maxWidth: "350px",
                  maxHeight: "200px",
                }}
                onClick={() => {
                  selectModel(data.model_name);
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    width: "34vh",
                    height: "16vh",
                    maxWidth: "350px",
                    maxHeight: "200px",
                  }}
                >
                  <Typography fontSize={20} variant="h6">
                    {data.model_name}
                  </Typography>
                  <Radio
                    checked={props.selectedModel === data.model_name}
                    onChange={() => {
                      selectModel(data.model_name);
                    }}
                    value={data.model_name}
                  />
                </Box>
                <Typography
                  variant="body2"
                  sx={{ fontWeight: "bold", marginTop: 1, marginBottom: 1 }}
                >
                  {data.description}
                </Typography>
                <Typography variant="body2" sx={{ marginBottom: 1 }}>
                  Date: {data.creation_date}
                </Typography>
                <Typography variant="body2" sx={{ marginBottom: 1 }}>
                  Version: {data.version}
                </Typography>
                {/* Add more details as needed */}
              </Box>
            ))}
          </Box>
        </InfoContainer>
      </Box>
    </Overlay>
  );
};

export default ResultsTunerPopup;
