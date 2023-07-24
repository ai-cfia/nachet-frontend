import styled from "styled-components";
import { colours } from "../../styles/colours";

export const FooterContainer = styled.footer<{ height: number }>`
  background-color: ${colours.CFIA_Background_White};
  width: 100%;
  height: ${(props) => props.height * 0.035}px;
`;

export const FooterWrap = styled.div<{ width: number; height: number }>`
  padding: 0.8vh 0.8vh 0.8vh 0.8vh;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: space-between;
  width: ${(props) => props.width * 0.71}px;
  height: ${(props) => props.height * 0.035}px;
  margin: auto;
  position: relative;
  z-index: 0;
`;

export const InfoSection = styled.section`
  width: 100%;
  justfiy-content: space-between;
  z-index: 0;
`;

export const InfoWrap = styled.div`
  display: flex;
  flex-direction: row;
  justfiy-content: space-between;
  align-items: center;
  max-width: 1700px;
  margin: auto;
  z-index: 0;

  @media screen and (max-width: 820px) {
    flex-direction: column;
  }
`;

export const FooterLogo = styled.img<{ width: number; height: number }>`
  width: ${(props) => props.width * 0.05}px;
  z-index: 0;
  align-self: center;
  height: fit-content;
`;

export const FooterLink = styled.a`
  color: ${colours.CFIA_Font_Black};
  font-size: 1vh;
  text-decoration: none;
  cursor: pointer;
  margin-bottom: auto;
  margin-top: auto;
  align-self: flex-start;
  z-index: 0;

  @media screen and (max-width: 768px) {
    font-size: 0.8rem;
  }
  @media screen and (max-width: 480px) {
    font-size: 0.41rem;
  }
`;
