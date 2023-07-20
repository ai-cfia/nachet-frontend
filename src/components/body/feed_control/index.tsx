import {
  Button,
  ButtonWrap,
  ControlContainer,
  TitleHeader,
} from "./indexElements";
import { colours } from "../../../styles/colours";
import React from "react";

interface params {
  captureEmpty: boolean;
  capture: () => void;
  setSaveOpen: React.Dispatch<React.SetStateAction<boolean>>;
  clearImageCache: () => void;
  uploadOpen: boolean;
  setUploadOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const FeedControl: React.FC<params> = (props) => {
  const handleSaveOpen = (): void => {
    props.setSaveOpen(true);
  };

  const handleUploadOpen = (): void => {
    props.setUploadOpen(true);
  };

  return (
    <ControlContainer>
      <TitleHeader>CAPTURE TOOLS</TitleHeader>
      <ButtonWrap>
        <Button
          disabled={false}
          color={colours.CFIA_Background_Blue}
          onClick={props.capture}
        >
          Capture Feed
        </Button>
        <Button
          disabled={false}
          color={colours.CFIA_Background_Blue}
          onClick={handleUploadOpen}
        >
          Upload Image
        </Button>
        <Button
          disabled={props.captureEmpty}
          onClick={handleSaveOpen}
          color={colours.CFIA_Background_Blue}
        >
          Save Capture
        </Button>
        <Button
          disabled={props.captureEmpty}
          color={colours.CFIA_Background_Blue}
          onClick={handleSaveOpen}
        >
          Save Cache
        </Button>
        <Button
          color={colours.CFIA_Background_Blue}
          onClick={props.clearImageCache}
        >
          Clear Cache
        </Button>
      </ButtonWrap>
    </ControlContainer>
  );
};

export default FeedControl;
