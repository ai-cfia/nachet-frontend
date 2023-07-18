import React, { useState } from "react";
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
  InfoContainer,
  Input,
} from "./indexElements";

type params = {
  capture: () => void;
  uploadOpen: boolean;
  setUploadOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setImageSrc: React.Dispatch<React.SetStateAction<string>>;
  uploadImage: (event: any) => void;
};

const UploadPopup: React.FC<params> = (props) => {
  if (props.uploadOpen === false) {
    return null;
  }

  const handleClose = () => {
    props.setUploadOpen!(false);
  };

  return (
    <Overlay uploadOpen={props.uploadOpen}>
      <ModalWrapper uploadOpen={props.uploadOpen}>
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
