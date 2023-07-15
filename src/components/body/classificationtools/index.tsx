import { Button, ButtonWrap, ControlContainer, TitleHeader } from './indexElements';
import { colours } from '../../../styles/colours';

type params = {
    saveImage: () => void;
    captureEmpty: boolean;
}

const ClassificationTools: React.FC<params> = (props) => {

    return (

        <ControlContainer>
            <TitleHeader>CLASSIFICATION TOOLS</TitleHeader>   
            <ButtonWrap>
                <Button disabled={props.captureEmpty} color={colours.CFIA_Background_Blue}>Run Classification</Button>
                <Button disabled={props.captureEmpty} color={colours.CFIA_Background_Blue}>Annotate Capture</Button>
                <Button disabled={props.captureEmpty} color={colours.CFIA_Background_Blue} onClick={props.saveImage}>Save Capture</Button>
            </ButtonWrap>
        </ControlContainer>
    );


}

export default ClassificationTools;