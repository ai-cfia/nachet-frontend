import styled from "styled-components";
import { colours } from "../../../styles/colours";

export const ResultContainer = styled.div`
  background: ${colours.CFIA_Background_White};
  color: ${colours.CFIA_Font_white};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  width: 190px;
  height: 305px;
  z-index: 0;
  position: relative;
  padding: 5px 5px 0px 5px;
  border: 1px solid ${colours.CFIA_Font_black};
  border-radius: 10px;
`;

export const TitleHeader = styled.h2`
  font-size: 0.95rem;
  padding: 1px;
  color: ${colours.CFIA_Font_black};
  margin-right: auto;
  margin-bottom: 5px;
  margin-top: 5px;
`;

export const InfoWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: start;
  width: 100%;
`;

export const Info = styled.p`
  font-size: 0.9rem;
  padding: 5px;
  color: ${colours.CFIA_Font_black};
  margin-right: auto;
  margin-bottom: 5px;
  margin-top: 5px;
`;
