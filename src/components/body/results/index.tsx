import React from "react";
import { ResultContainer, TitleHeader, InfoWrap, Info } from "./indexElements";

type params = {
  savedImages: Array<any>;
  imageSrc: string;
};

const Results: React.FC<params> = (props) => {
  // generate info tags for each attribute of savedImages

  return (
    <ResultContainer>
      <TitleHeader>PREDICTION RESULTS</TitleHeader>
      {props.savedImages.map((image, index) => {
        if (image.src === props.imageSrc && image.annotated === true) {
          return (
            <InfoWrap key={index}>
              <Info>Prediction: {image.prediction}</Info>
              <Info>Confidence: {image.confidence}</Info>
              <Info>
                X:{image.region[0]} Y: {image.region[0]} W: {image.region[0]} H:{" "}
                {image.region[0]}
              </Info>
            </InfoWrap>
          );
        }
      })}
    </ResultContainer>
  );
};

export default Results;
