import styled from "styled-components";
import { colours } from "../../styles/colours";

export const HomeContainer = styled.div`
  background: ${colours.CFIA_Background_White};
  color: ${colours.CFIA_Font_black};
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: start;
  width: 100%;
  height: fit-content;
  position: relative;
  padding: 24px 24px 24px 24px;
  z-index: 0;
  margin-top: 24px;
  margin-bottom: 24px;

  @media screen and (max-width: 720px) {
    flex-direction: column;
    justify-content: start;
  }
`;

export const InfoContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: start;
  width: fit-content;
  height: fit-content;
  padding: 0px 0px 0px 5px;
  z-index: 0;
  position: relative;
`;

export const ControlContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: start;
  width: fit-content;
  height: fit-content;
  padding: 0px 10px 0px 0px;
  z-index: 0;
  position: relative;
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
  position: relative;
`;

export const BottomContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: start;
  justify-content: center;
  margin-top: 10px;
  width: 610px;
  height: fit-content;
`;
