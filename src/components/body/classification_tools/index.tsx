import {
  Button,
  ButtonWrap,
  ControlContainer,
  TitleHeader,
} from "./indexElements";
import { colours } from "../../../styles/colours";
import SavePopup from "../save_popup";

type params = {
  captureEmpty: boolean;
  annotationEmpty: boolean;
  saveOpen: boolean;
  setSaveOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setAnnotationOpen: React.Dispatch<React.SetStateAction<boolean>>;
  annotationOpen: boolean;
};

const ClassificationTools: React.FC<params> = (props) => {
  const handleOpen = () => {
    props.setSaveOpen!(true);
  };

  const handleAnnotationOpen = () => {
    props.setAnnotationOpen!(true);
  };

  return (
    <ControlContainer>
      <TitleHeader>CLASSIFICATION TOOLS</TitleHeader>
      <ButtonWrap>
        <Button
          disabled={props.captureEmpty}
          color={colours.CFIA_Background_Blue}
        >
          Run Classification
        </Button>
        <Button
          disabled={props.captureEmpty}
          color={colours.CFIA_Background_Blue}
          onClick={handleAnnotationOpen}
        >
          Annotate Capture
        </Button>
        <Button
          disabled={props.annotationEmpty}
          color={colours.CFIA_Background_Blue}
        >
          Save Annotations
        </Button>
        <Button
          disabled={props.captureEmpty}
          onClick={handleOpen}
          color={colours.CFIA_Background_Blue}
        >
          Save Capture
        </Button>
      </ButtonWrap>
    </ControlContainer>
  );
};

export default ClassificationTools;
