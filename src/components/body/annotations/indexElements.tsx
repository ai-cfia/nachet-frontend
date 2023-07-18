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
  max-width: 190px;
  height: 305px;
  z-index: 0;
  margin-top: 10px;
  position: relative;
  padding: 5px 5px 5px 5px;
  border: 1px solid ${colours.CFIA_Font_black};
  border-radius: 10px;
`;

export const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  width: 100%;
  height: 100%;
  max-height: 100%;
  overflow-y: scroll;
`;

export const TitleHeader = styled.h2`
  font-size: 0.95rem;
  padding: 1px;
  color: ${colours.CFIA_Font_black};
  margin: auto;
  margin-bottom: 5px;
  margin-top: 5px;
`;

export const ImageLabel = styled.a`
  font-size: 0.95rem;
  padding-left: 40px;
  padding-right: 40px;
  padding-top: 10px;
  padding-bottom: 10px;
  color: ${colours.CFIA_Font_black};
  margin: auto;
  margin-bottom: 5px;
  margin-top: 5px;
  cursor: pointer;
  text-decoration: none;
  border-left: 0px;
  border-right: 0px;

  &:hover {
    color: ${colours.CFIA_Font_white};
    transition: 0.2s ease-in-out;
    background: ${colours.CFIA_Background_Blue};
  }
`;