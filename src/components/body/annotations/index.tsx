import React from "react";
import {
  ResultContainer,
  TitleHeader,
  InfoContainer,
  ImageLabel,
} from "./indexElements";

type params = {
  savedImages: any;
};

const Annotations: React.FC<params> = (props) => {
  return (
    <ResultContainer>
      <TitleHeader>ANNOTATED IMAGES</TitleHeader>
      <InfoContainer>
        {Object.keys(props.savedImages).map((key) => (
          <a key={key}>{key}</a>
        ))}
      </InfoContainer>
    </ResultContainer>
  );
};

export default Annotations;
