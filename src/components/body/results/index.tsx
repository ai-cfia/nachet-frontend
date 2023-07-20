import React from "react";
import { ResultContainer, TitleHeader, InfoWrap, Info } from "./indexElements";

interface params {
  savedImages: any[];
  imageSrc: string;
}
const Results: React.FC<params> = (props) => {
  return (
    <ResultContainer>
      <TitleHeader>PREDICTION RESULTS</TitleHeader>
      {props.savedImages.map((image, index) => {
        if (image.src === props.imageSrc && image.annotated === true) {
          return (
            <InfoWrap key={index}>
              <Info>Prediction: {image.predictions} </Info>
              <Info>Confidence: {image.scores} </Info>
            </InfoWrap>
          );
        } else {
          return null;
        }
      })}
    </ResultContainer>
  );
};

export default Results;
