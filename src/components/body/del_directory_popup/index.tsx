import React from "react";
import { Overlay, InfoContainer, ButtonWrap, Text } from "./indexElements";
import { Box, CardHeader, IconButton, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { colours } from "../../../styles/colours";

interface params {
  setDelDirectoryOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleDelFromDirectory: () => void;
  curDir: string;
}

const DeleteDirectoryPopup: React.FC<params> = (props): JSX.Element => {
  const handleClose = (): void => {
    props.setDelDirectoryOpen(false);
  };
  const handleYes = (): void => {
    props.handleDelFromDirectory();
    props.setDelDirectoryOpen(false);
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
          title="Delete From Directory"
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
          <Text>Are you sure you want to delete {props.curDir}?</Text>
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
                marginRight: "2vw",
              }}
              onClick={handleYes}
            >
              Delete
            </Button>
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
              onClick={handleClose}
            >
              Cancel
            </Button>
          </ButtonWrap>
        </InfoContainer>
      </Box>
    </Overlay>
  );
};

export default DeleteDirectoryPopup;
