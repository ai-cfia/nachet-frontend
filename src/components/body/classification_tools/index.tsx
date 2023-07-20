import {
  Button,
  ButtonWrap,
  ControlContainer,
  TitleHeader,
} from "./indexElements";
import { colours } from "../../../styles/colours";

interface params {
  captureEmpty: boolean;
  annotationEmpty: boolean;
  handleInference: () => void;
}

const ClassificationTools: React.FC<params> = (props) => {
  return (
    <ControlContainer>
      <TitleHeader>CLASSIFICATION TOOLS</TitleHeader>
      <ButtonWrap>
        <Button
          disabled={props.captureEmpty}
          color={colours.CFIA_Background_Blue}
          onClick={props.handleInference}
        >
          Classify Capture
        </Button>
        <Button
          disabled={props.captureEmpty}
          color={colours.CFIA_Background_Blue}
        >
          Change Model
        </Button>
      </ButtonWrap>
    </ControlContainer>
  );
};

export default ClassificationTools;
