import React from "react";
import {
  Overlay,
  ModalWrapper,
  Icon,
  ModalBody,
  CloseIcon,
  ModalTitle,
  ModalRow,
  ButtonWrap,
  Button,
  Select,
  Option,
  LabelInput,
  InfoContainer,
} from "./indexElements";

interface params {
  saveOpen: boolean;
  setSaveOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  imageSrc?: string;
  saveImage?: () => void;
  imageFormat?: string;
  imageLabel?: string;
  setImageFormat?: React.Dispatch<React.SetStateAction<string>>;
  setImageLabel?: React.Dispatch<React.SetStateAction<string>>;
  handleFormat?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  handleLabel?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  captureEmpty?: boolean;
}

const SavePopup: React.FC<params> = (props): JSX.Element => {
  const handleClose = (): void => {
    if (props.setSaveOpen === undefined) {
      return;
    }
    props.setSaveOpen(false);
  };

  return (
    <Overlay>
      <ModalWrapper>
        <ModalBody>
          <ModalRow>
            <ModalTitle>Save Capture</ModalTitle>
            <Icon onClick={handleClose}>
              <CloseIcon />
            </Icon>
          </ModalRow>
          <InfoContainer>
            <LabelInput
              placeholder="Capture label"
              onChange={props.handleLabel}
              disabled={props.captureEmpty}
              value={props.imageLabel}
            />
            <Select value={props.imageFormat} onChange={props.handleFormat}>
              <Option value="image/png">Capture Format: PNG</Option>
              <Option value="image/jpeg">Capture Format: JPEG</Option>
            </Select>
          </InfoContainer>
          <ButtonWrap>
            <Button onClick={props.saveImage}>Download Capture</Button>
          </ButtonWrap>
        </ModalBody>
      </ModalWrapper>
    </Overlay>
  );
};

export default SavePopup;
