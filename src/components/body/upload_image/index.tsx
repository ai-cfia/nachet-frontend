import React from "react";
import { Overlay, InfoContainer } from "./indexElements";
import { Box, CardHeader, IconButton, Input } from "@mui/material";
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
          height: 250,
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
            fontWeight: 600,
            color: colours.CFIA_Font_Black,
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
        <InfoContainer>
          <Input
            type="file"
            onChange={props.uploadImage}
            sx={{
              fontSize: 17,
            }}
          />
        </InfoContainer>
      </Box>
    </Overlay>
  );
};

export default UploadPopup;
