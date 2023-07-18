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
      <InfoWrap></InfoWrap>
    </ResultContainer>
  );
};

export default Results;
