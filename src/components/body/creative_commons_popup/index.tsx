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

interface params {
  setCreativeCommonsPopupOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleCreativeCommonsAgreement: (agree: boolean) => void;
}

const CreativeCommonsPopup: React.FC<params> = (props): JSX.Element => {
  const introduction = `
By uploading your images to Seed Classification Interface, you agree to license your work under a Creative Commons Attribution-ShareAlike (CC BY-SA) License. This agreement outlines the terms and conditions of the license and other considerations.`;
  const termsAndConditions = `
Attribution: You allow others to copy, distribute, display, and perform your copyrighted work—and derivative works based upon it—but only if they give you the proper credit by citing your name and the source.
Share Alike: You allow others to distribute derivative works only under a license identical to the license that governs your work.
Machine Learning: You grant the CFIA the right to use your images to train machine learning models. These models may be used for various purposes, including research, analysis, and commercial activities.
Warranty: You represent and warrant that you are the legal owner of the content you are uploading and that it does not infringe on any copyright, trademark, or other rights of third parties.
Consent: If your image includes identifiable individuals, you affirm that you have obtained their consent for the image to be shared and used under these terms.
Waiver: The image is provided "as-is." You waive all warranties, including any regarding the image's accuracy or fitness for a particular purpose.`;
  const acknowledgment = `
By clicking "I Agree," you confirm that you have read and understood this agreement, and you will be legally bound by its terms and conditions.`;
  const handleClose = (): void => {
    props.setCreativeCommonsPopupOpen(false);
  };

  return (
    <Overlay>
      <Box
        sx={{
          width: "23vw",
          zIndex: 30,
          border: `0.05vw solid ${colours.CFIA_Font_Black}`,
          borderRadius: 1,
          background: colours.CFIA_Background_White,
        }}
      >
        <CardHeader
          title="Use of Creative Commons Images"
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
            <Header>Introduction</Header>
            <Paragraph>{introduction.trim().replace(/\n/g, " ")}</Paragraph>
            <Header>Terms and Conditions</Header>
            <Paragraph>
              {termsAndConditions.trim().replace(/\n/g, " ")}
            </Paragraph>
            <Header>Acknowledgement</Header>
            <Paragraph>{acknowledgment.trim().replace(/\n/g, " ")}</Paragraph>
          </TextArea>
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
                marginRight: "1vw",
                color: colours.CFIA_Font_Black,
                borderColor: colours.CFIA_Font_Black,
              }}
              onClick={() => {
                props.handleCreativeCommonsAgreement(true);
              }}
            >
              I Agree
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
              onClick={() => {
                props.handleCreativeCommonsAgreement(false);
              }}
            >
              I Disagree
            </Button>
          </ButtonWrap>
        </InfoContainer>
      </Box>
    </Overlay>
  );
};

export default CreativeCommonsPopup;
