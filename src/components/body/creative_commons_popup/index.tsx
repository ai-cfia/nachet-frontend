import React from "react";
import {
  Overlay,
  InfoContainer,
  ButtonWrap,
  Paragraph,
  TextArea,
  Header,
} from "./indexElements";
import { Box, CardHeader, IconButton, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { colours } from "../../../styles/colours";
import { t } from "i18next";

interface params {
  setCreativeCommonsPopupOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleCreativeCommonsAgreement: (agree: boolean) => void;
}

const CreativeCommonsPopup: React.FC<params> = (props): JSX.Element => {
  const introduction = t("creative_commons_introduction");
  const termsAndConditions = t("creative_commons_terms_and_conditions");
  const acknowledgment = t("creative_commons_acknowledgment");
  const handleClose = (): void => {
    props.setCreativeCommonsPopupOpen(false);
  };

  return (
    <Overlay>
      <Box
        sx={{
          width: "23vw",
          zIndex: 30,
          border: `0.01vh solid LightGrey`,
          borderRadius: 1,
          background: colours.CFIA_Background_White,
        }}
        boxShadow={1}
      >
        <CardHeader
          title={t("creative_commons_title")}
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
          <TextArea>
            <Header>{t("creative_commons_introduction_header")}</Header>
            <Paragraph>{introduction.trim().replace(/\n/g, " ")}</Paragraph>
            <Header>{t("creative_commons_terms_and_conditions_header")}</Header>
            <Paragraph>
              {termsAndConditions.trim().replace(/\n/g, " ")}
            </Paragraph>
            <Header>{t("creative_commons_acknowledgment_header")}</Header>
            <Paragraph>{acknowledgment.trim().replace(/\n/g, " ")}</Paragraph>
          </TextArea>
          <ButtonWrap>
            <Button
              variant="outlined"
              size="medium"
              sx={{
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
                marginRight: "1vw",
              }}
              onClick={() => {
                props.handleCreativeCommonsAgreement(true);
              }}
            >
              {t("i_agree")}
            </Button>
            <Button
              variant="outlined"
              size="medium"
              sx={{
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
              onClick={() => {
                props.handleCreativeCommonsAgreement(false);
              }}
            >
              {t("i_disagree")}
            </Button>
          </ButtonWrap>
        </InfoContainer>
      </Box>
    </Overlay>
  );
};

export default CreativeCommonsPopup;
