import {
  Button,
  ButtonWrap,
  ControlContainer,
  TitleHeader,
} from "./indexElements";
import { colours } from "../../../styles/colours";
import React from "react";
import Webcam from "react-webcam";

type params = {
  captureEmpty: boolean;
  capture: () => void;
  clear: () => void;
  setSaveOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const FeedControl: React.FC<params> = (props) => {
  const handleOpen = () => {
    props.setSaveOpen!(true);
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
          onClick={props.capture}
        >
          Upload Image
        </Button>
        <Button
          disabled={props.captureEmpty}
          onClick={handleOpen}
          color={colours.CFIA_Background_Blue}
        >
          Save Capture
        </Button>
        <Button
          disabled={props.captureEmpty}
          color={colours.CFIA_Background_Blue}
          onClick={props.clear}
        >
          Clear Capture
        </Button>
        <Button
          disabled={props.captureEmpty}
          color={colours.CFIA_Background_Blue}
          onClick={props.clear}
        >
          Clear Cache
        </Button>
      </ButtonWrap>
    </ControlContainer>
  );
};

export default FeedControl;
