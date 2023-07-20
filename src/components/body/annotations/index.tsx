import React from "react";
import {
  ResultContainer,
  TitleHeader,
  InfoContainer,
  ImageLabel,
  RemoveImage,
  LabelWrapper,
} from "./indexElements";

interface params {
  savedImages: any[];
  loadImage: (event: any) => void;
  removeImage: (event: any) => void;
}

const Annotations: React.FC<params> = (props) => {
  return (
    <ResultContainer>
      <TitleHeader>CAPTURE CACHE</TitleHeader>
      <InfoContainer>
        {props.savedImages.map((item: any, index) => (
          <LabelWrapper key={index}>
            <ImageLabel
              key={index}
              data-value={item.src}
              onClick={props.loadImage}
            >
              {item.label}
            </ImageLabel>
            <RemoveImage
              key={`r-${index}`}
              data-value={item.src}
              onClick={props.removeImage}
            >
              X
            </RemoveImage>
          </LabelWrapper>
        ))}
      </InfoContainer>
    </ResultContainer>
  );
};

export default Annotations;
