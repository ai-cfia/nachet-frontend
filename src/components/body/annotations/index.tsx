import React, { useEffect } from "react";
import {
  ResultContainer,
  TitleHeader,
  InfoContainer,
  ImageLabel,
} from "./indexElements";

type params = {
  savedImages: Array<any>;
  loadImage: (event: any) => void;
};

const Annotations: React.FC<params> = (props) => {
  return (
    <ResultContainer>
      <TitleHeader>ANNOTATED IMAGES</TitleHeader>
      <InfoContainer>
        {props.savedImages.map((item: any) => (
          <ImageLabel
            key={item.src}
            data-value={item.src}
            onClick={props.loadImage}
          >
            {item.label}
          </ImageLabel>
        ))}
      </InfoContainer>
    </ResultContainer>
  );
};

export default Annotations;
