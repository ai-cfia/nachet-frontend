import { ButtonWrap, ControlContainer, TitleHeader } from "./indexElements";
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
  return (
    <ControlContainer>
      <TitleHeader>CAPTURE TOOLS</TitleHeader>
      <ButtonWrap></ButtonWrap>
    </ControlContainer>
  );
};

export default FeedControl;
