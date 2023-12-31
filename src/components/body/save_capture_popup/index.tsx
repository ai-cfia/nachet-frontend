import React from "react";
import { Overlay, ButtonWrap, InfoContainer } from "./indexElements";
import {
  Box,
  CardHeader,
  IconButton,
  Button,
  TextField,
  MenuItem,
  Select,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import type { SelectChangeEvent } from "@mui/material/Select";
import CloseIcon from "@mui/icons-material/Close";
import { colours } from "../../../styles/colours";

interface params {
  setSaveOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  saveImage?: () => void;
  imageFormat?: string;
  imageLabel?: string;
  setImageFormat?: React.Dispatch<React.SetStateAction<string>>;
  setImageLabel?: React.Dispatch<React.SetStateAction<string>>;
  setSaveIndividualImage?: React.Dispatch<React.SetStateAction<string>>;
  saveIndividualImage?: string;
}

const SavePopup: React.FC<params> = (props): JSX.Element => {
  const handleClose = (): void => {
    if (props.setSaveOpen === undefined) {
      return;
    }
    props.setSaveOpen(false);
  };

  const handleFormat = (event: SelectChangeEvent): void => {
    if (props.setImageFormat === undefined) {
      return;
    }
    props.setImageFormat(event.target.value);
  };

  const handleLabel = (event: any): void => {
    if (props.setImageLabel === undefined) {
      return;
    }
    props.setImageLabel(event.target.value);
  };

  const handleToggle = (): void => {
    if (props.setSaveIndividualImage === undefined) {
      return;
    }
    if (props.saveIndividualImage === "0") {
      props.setSaveIndividualImage("1");
    } else {
      props.setSaveIndividualImage("0");
    }
  };

  return (
    <Overlay>
      <Box
        sx={{
          width: "20vw",
          height: "fit-content",
          zIndex: 30,
          border: `0.01vh solid LightGrey`,
          borderRadius: 1,
          background: colours.CFIA_Background_White,
        }}
        boxShadow={1}
      >
        <CardHeader
          title="Save Capture"
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
          <div style={{ marginBottom: "2vh", marginTop: "1vh" }}>
            <ToggleButtonGroup
              sx={{
                color: colours.CFIA_Font_Black,
                fontSize: "1.0vh",
                height: "2vh",
              }}
              fullWidth
              exclusive
              onChange={handleToggle}
              value={props.saveIndividualImage}
              aria-label="Platform"
            >
              <ToggleButton
                value="0"
                fullWidth
                sx={{ color: colours.CFIA_Font_Black }}
              >
                CAPTURE
              </ToggleButton>
              <ToggleButton
                value="1"
                fullWidth
                sx={{ color: colours.CFIA_Font_Black }}
              >
                CACHE
              </ToggleButton>
            </ToggleButtonGroup>
          </div>
          {props.saveIndividualImage === "0" && (
            <>
              <>
                <TextField
                  id="outlined-basic"
                  label="Capture Name"
                  variant="outlined"
                  onChange={handleLabel}
                  value={props.imageLabel}
                  size="small"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  sx={{
                    height: "2vh",
                    marginBottom: "2vh",
                    fontSize: "1.2vh",
                  }}
                />
              </>
              <Select
                value={props.imageFormat}
                onChange={handleFormat}
                fullWidth
                sx={{ fontSize: "1.2vh", height: "3vh" }}
              >
                <MenuItem value="image/png">Format: PNG</MenuItem>
                <MenuItem value="image/jpeg">Format: JPEG</MenuItem>
              </Select>
            </>
          )}
          {props.saveIndividualImage === "1" && (
            <>
              <Select
                fullWidth
                value={props.imageFormat}
                onChange={handleFormat}
                sx={{ fontSize: "1.2vh", height: "3vh" }}
              >
                <MenuItem value="image/png">Format: PNG</MenuItem>
                <MenuItem value="image/jpeg">Format: JPEG</MenuItem>
              </Select>
            </>
          )}
          <ButtonWrap>
            <Button
              variant="outlined"
              size="medium"
              sx={{
                marginRight: 0,
                marginLeft: 0,
                borderRadius: "0.4vh",
                paddingTop: "0.3vh",
                paddingBottom: "0.3vh",
                paddingLeft: "0.7vh",
                paddingRight: "0.7vh",
                fontSize: "1.17vh",
                width: "fit-content",
                border: `0.01vh solid LightGrey`,
                color: colours.CFIA_Font_Black,
                "&:hover": {
                  backgroundColor: "#F5F5F5",
                  transition: "0.1s ease-in-out all",
                  border: `0.01vh solid LightGrey`,
                },
              }}
              onClick={props.saveImage}
            >
              SAVE
            </Button>
          </ButtonWrap>
        </InfoContainer>
      </Box>
    </Overlay>
  );
};

export default SavePopup;
