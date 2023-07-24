import { AppbarWrap, AppbarContainer, AppbarHeader } from "./indexElements";
import React from "react";

interface params {
  windowSize: {
    width: number;
    height: number;
  };
}

const Appbar: React.FC<params> = (props) => {
  return (
    <AppbarWrap width={props.windowSize.width} height={props.windowSize.height}>
      <AppbarContainer
        width={props.windowSize.width}
        height={props.windowSize.height}
      >
        <AppbarHeader>Seed Classification Interface</AppbarHeader>
      </AppbarContainer>
    </AppbarWrap>
  );
};

export default Appbar;
