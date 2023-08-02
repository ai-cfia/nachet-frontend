import styled from "styled-components";
import { colours } from "../../styles/colours";

export const RowContainer = styled.div`
  background: ${colours.CFIA_Background_White};
  color: ${colours.CFIA_Font_Black};
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: start;
  width: 100%;
  height: fit-content;
  position: relative;
  z-index: 0;
`;
// changed width
export const ColumnContainer = styled.div`
  background: ${colours.CFIA_Background_White};
  color: ${colours.CFIA_Font_Black};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 90vw;
  height: fit-content;
  position: relative;
`;

export const InfoContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: start;
  width: 22.1%;
  height: fit-content;
  padding: 0px 0px 0px 0.5vw;
  z-index: 0;
  position: relative;
`;

export const TopContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: start;
  justify-content: start;
  width: 100%;
  padding: 0px 0px 0.83vh 0px;
`;

export const LeftContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 33.33%;
  height: fit-content;
  padding: 0px 0.25vw 0px 0px;
  z-index: 0;
  position: relative;
`;

export const RightContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 33.33%;
  height: fit-content;
  padding: 0px 0px 0px 0.25vw;
  z-index: 0;
  position: relative;
`;
