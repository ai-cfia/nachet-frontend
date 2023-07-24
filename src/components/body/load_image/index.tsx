import React from "react";
import { Overlay, InfoContainer } from "./indexElements";
import { Box, CardHeader, IconButton, Input } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { colours } from "../../../styles/colours";

interface params {
  setUploadOpen: React.Dispatch<React.SetStateAction<boolean>>;
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
          width: "15vw",
          height: "20vh",
          zIndex: 30,
          border: `0.05vw solid ${colours.CFIA_Font_Black}`,
          borderRadius: 1,
          background: colours.CFIA_Background_White,
        }}
      >
        <CardHeader
          title="Load Image"
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
