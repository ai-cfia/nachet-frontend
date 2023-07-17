import { ReactPictureAnnotation } from "react-picture-annotation";
import React, { useEffect, useState } from "react";
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
} from "./indexElements";

type params = {
  imageSrc?: string;
  annotationOpen?: boolean;
  setAnnotationOpen?: React.Dispatch<React.SetStateAction<boolean>>;
};

const ImageAnnotation: React.FC<params> = (props) => {
  const onSelect = (selectedId: any) => console.log(selectedId);
  const onChange = (data: any) => console.log(data);

  if (props.annotationOpen === false) {
    return null;
  }

  const handleClose = () => {
    props.setAnnotationOpen!(false);
  };

  return (
    <Overlay isOpen={props.annotationOpen}>
      <ModalWrapper isOpen={props.annotationOpen}>
        <ModalBody>
          <ModalRow>
            <ModalTitle>Annotation Tool</ModalTitle>
            <Icon onClick={handleClose}>
              <CloseIcon />
            </Icon>
          </ModalRow>
          <ReactPictureAnnotation
            image={props.imageSrc!}
            onSelect={onSelect}
            onChange={onChange}
            width={500}
            height={500}
          />
          <ButtonWrap>
            <Button>Annotate Capture</Button>
          </ButtonWrap>
        </ModalBody>
      </ModalWrapper>
    </Overlay>
  );
};

export default ImageAnnotation;
