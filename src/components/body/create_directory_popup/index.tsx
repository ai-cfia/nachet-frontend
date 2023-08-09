import React from "react";
import { Overlay, InfoContainer, ButtonWrap } from "./indexElements";
import { Box, CardHeader, IconButton, TextField, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { colours } from "../../../styles/colours";

interface params {
  setCreateDirectoryOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handeDirChange: (dir: string) => void;
  curDir: string;
  addToDirectory: () => void;
}

const CreateFolder: React.FC<params> = (props): JSX.Element => {
  const handleClose = (): void => {
    props.setCreateDirectoryOpen(false);
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
          title="Create New Directory"
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
            label="Directory Name"
            variant="outlined"
            onChange={(event) => {
              props.handeDirChange(event.target.value);
            }}
            value={props.curDir}
            sx={{ width: "10vw", fontSize: "1.2vh" }}
            size="small"
          />
          <ButtonWrap>
            <Button
              variant="outlined"
              size="medium"
              sx={{
                alignContent: "center",
                alignItems: "center",
                paddingLeft: "0.8vw",
                paddingRight: "0.8vw",
                fontSize: "1.1vh",
                color: colours.CFIA_Font_Black,
                borderColor: colours.CFIA_Font_Black,
              }}
              onClick={() => {
                props.addToDirectory();
              }}
            >
              Create
            </Button>
          </ButtonWrap>
        </InfoContainer>
      </Box>
    </Overlay>
  );
};

export default CreateFolder;
