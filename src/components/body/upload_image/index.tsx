import React from "react";
import { Overlay, ModalBody, InfoContainer } from "./indexElements";
import { Box, CardHeader, IconButton, Button, Input } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { colours } from "../../../styles/colours";

interface params {
  capture: () => void;
  uploadOpen: boolean;
  setUploadOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setImageSrc: React.Dispatch<React.SetStateAction<string>>;
  uploadImage: (event: any) => void;
}

const UploadPopup: React.FC<params> = (props): JSX.Element => {
  const handleClose = (): void => {
    props.setUploadOpen(false);
  };

  return (
    <Overlay>
      <Box
        sx={{
          width: 400,
          height: 300,
          zIndex: 30,
          border: 1,
          borderRadius: 1,
          background: colours.CFIA_Background_White,
        }}
      >
        <CardHeader
          title="Tools"
          titleTypographyProps={{
            variant: "h6",
            align: "left",
            fontWeight: 800,
            color: colours.CFIA_Font_black,
            zIndex: 30,
          }}
          action={
            <IconButton onClick={handleClose}>
              <CloseIcon color="primary" />
            </IconButton>
          }
          sx={{
            paddingBottom: 0,
          }}
        />
        <ModalBody>
          <InfoContainer>
            <Button
              variant="contained"
              size="large"
              sx={{
                alignContent: "center",
                alignItems: "center",
                padding: 2,
                display: "flex",
                flexDirection: "column",
                fontSize: "0.9rem",
                backgroundColor: colours.CFIA_Background_White,
                cursor: "pointer",
              }}
            >
              <Input type="file" onChange={props.uploadImage} />
            </Button>
          </InfoContainer>
        </ModalBody>
      </Box>
    </Overlay>
  );
};

export default UploadPopup;
