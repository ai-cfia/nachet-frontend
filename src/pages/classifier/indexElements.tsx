import styled from "styled-components";
import { colours } from "../../styles/colours";

export const RowContainer = styled.div`
  background: ${colours.CFIA_Background_White};
  color: ${colours.CFIA_Font_Black};
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
  width: 100%;
  height: fit-content;
  position: relative;
  z-index: 0;
  padding: 0px 0px 0px 0px;
`;

export const ColumnContainer = styled.div`
  background: ${colours.CFIA_Background_White};
  color: ${colours.CFIA_Font_Black};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 100%;
  height: fit-content;
`;

export const TopContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 0px 0px 0px 0px;
`;

export const LeftContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 44.83%;
  max-width: 44.83%;
  height: fit-content;
  padding-right: 0.5vw;
  z-index: 0;
  position: relative;
  margin-left: 17vw;
`;

export const InfoContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: start;
  width: 19%;
  max-width: 19%;
  height: 100%;
  max-height: 100%;
  padding: 0vw 0vw 0vw 0.5vw;
  z-index: 0;
  position: relative;
  margin-left: 4vw;
`;

export const RightContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 44.83%;
  max-width: 44.83%;
  height: fit-content;
  padding: 0vw;
  z-index: 0;
  position: relative;
`;
