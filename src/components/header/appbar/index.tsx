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
    <AppbarWrap>
      <AppbarContainer width={props.windowSize.width}>
        <AppbarHeader>Seed Classification Interface</AppbarHeader>
      </AppbarContainer>
    </AppbarWrap>
  );
};

export default Appbar;
