import React from "react";
import { Overlay, InfoContainer } from "./indexElements";
import { Box, CardHeader, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { colours } from "../../../styles/colours";
import { t } from "i18next";
import { styled } from "@mui/material/styles";

const CustomInput = styled("input")({
  display: "none",
});

const CustomLabel = styled("label")({
  display: "inline-block",
  padding: "0.5em 1em",
  fontSize: "0.7vw",
  color: "#fff",
  backgroundColor: "#007bff",
  borderRadius: "0.4vh",
  cursor: "pointer",
  "&:hover": {
    backgroundColor: "#0056b3",
  },
});

interface params {
  setUploadOpen: React.Dispatch<React.SetStateAction<boolean>>;
  pushImageToCache: (imageUrl: string) => void;
}

const UploadPopup: React.FC<params> = (props): JSX.Element => {
  const { setUploadOpen, pushImageToCache } = props;

  const uploadImage = (event: any): void => {
    // loads image from local storage to cache when upload button is pressed
    event.preventDefault();
    const file = event.target.files[0];
    if (file !== undefined) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result !== "string") {
          return;
        }
        pushImageToCache(reader.result);
      };
      reader.readAsDataURL(file);
    }
    setUploadOpen(false);
  };

  const handleClose = (): void => {
    setUploadOpen(false);
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
          title={t("load_image")}
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
          <CustomLabel htmlFor="upload-button">{t("browse_file")}</CustomLabel>
          <CustomInput id="upload-button" type="file" onChange={uploadImage} />
        </InfoContainer>
      </Box>
    </Overlay>
  );
};

export default UploadPopup;
