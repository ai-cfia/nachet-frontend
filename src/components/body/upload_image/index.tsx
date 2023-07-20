import React from "react";
import {
  Overlay,
  ModalWrapper,
  Icon,
  ModalBody,
  CloseIcon,
  ModalTitle,
  ModalRow,
  InfoContainer,
  Input,
} from "./indexElements";

interface params {
  capture: () => void;
  uploadOpen: boolean;
  setUploadOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setImageSrc: React.Dispatch<React.SetStateAction<string>>;
  uploadImage: (event: any) => void;
}

const UploadPopup: React.FC<params> = (props): JSX.Element => {
  const handleClose = (): void => {
    props.setUploadOpen(false);
  };

  return (
    <Overlay>
      <ModalWrapper>
        <ModalBody>
          <ModalRow>
            <ModalTitle>Upload Image</ModalTitle>
            <Icon onClick={handleClose}>
              <CloseIcon />
            </Icon>
          </ModalRow>
          <InfoContainer>
            <Input type="file" onChange={props.uploadImage} />
          </InfoContainer>
        </ModalBody>
      </ModalWrapper>
    </Overlay>
  );
};

export default UploadPopup;
