import styled from "styled-components";
import { colours } from "../../styles/colours";

export const HomeContainer = styled.div`
  background: ${colours.CFIA_Background_White};
  color: ${colours.CFIA_Font_black};
  display: flex;
  flex-direction: row;
  align-items: start;
  height: fit-content;
  max-width: fit-content;
  position: relative;
  padding: 24px 24px 24px 24px;
  z-index: 0;
  margin: auto;
  margin-top: 24px;
  margin-bottom: 24px;
  position: relative;

  @media screen and (max-width: 720px) {
    flex-direction: column;
    justify-content: start;
  }
`;

export const LeftContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: start;
  width: fit-content;
  height: fit-content;
  padding: 0px 5px 0px 0px;
  z-index: 0;
  max-width: 100%;
  max-height: fit-content;
  position: relative;
`;

export const RightContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: start;
  width: fit-content;
  height: fit-content;
  padding: 0px 0px 0px 5px;
  z-index: 0;
  max-width: 100%;
  max-height: fit-content;
  position: relative;
`;

export const BottomContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: start;
  justify-content: start;
  width: fit-content;
  height: fit-content;
`;
