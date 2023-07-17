import React, { useEffect } from "react";
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
  // update this to display the saved images
  useEffect(() => {
    console.log("saved images: ", props.savedImages);
  }, [props.savedImages]);
  return (
    <ResultContainer>
      <TitleHeader>ANNOTATED IMAGES</TitleHeader>
      <InfoContainer>
        {Object.keys(props.savedImages).map((key) => (
          <ImageLabel>{key}</ImageLabel>
        ))}
      </InfoContainer>
    </ResultContainer>
  );
};

export default Annotations;
