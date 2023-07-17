import styled from "styled-components";
import { colours } from "../../../styles/colours";

export const AppbarWrap = styled.div`
  background-color: ${colours.CFIA_Background_Blue};
  color: ${colours.CFIA_Font_white};
  height: 50px;
  display: flex;
  width: 100%;
  font-size: 1rem;
  justify-content: center;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 3;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.5);
  @media screen and (max-width: 960px) {
    transition: 0.4s all ease-in-out;
  }
`;

export const AppbarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  height: 50px;
  z-index: 3;
  width: 100%;
  padding: 0 24px;
  max-width: 1700px;
`;

export const AppbarHeader = styled.h2`
  color: ${colours.CFIA_Font_white};
  font-size: 1.3rem;
  font-weight: bold;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-self: flex-start;
  z-index: 3;

  @media screen and (max-width: 768px) {
    font-size: 1.3rem;
  }
  @media screen and (max-width: 480px) {
    font-size: 1rem;
  }
`;
