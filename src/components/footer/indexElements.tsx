import styled from "styled-components";
import { colours } from "../../styles/colours";

export const FooterContainer = styled.footer`
  background-color: ${colours.CFIA_Background_White};
  width: 100%;
  height: 70px;
  margin-top: 100px;
`;

export const FooterWrap = styled.div`
  padding: 24px 24px 24px 24px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: space-between;
  max-width: 1700px;
  height: 70px;
  margin: auto;
  position: relative;
  z-index: 0;
`;

export const InfoSection = styled.section`
  max-width: 1700px;
  width: 100%;
  height: 70px;
  justfiy-content: space-between;
  z-index: 0;
`;

export const InfoWrap = styled.div`
  display: flex;
  flex-direction: row;
  justfiy-content: space-between;
  align-items: center;
  height: 70px;
  max-width: 1500px;
  margin: auto;
  z-index: 0;

  @media screen and (max-width: 820px) {
    flex-direction: column;
  }
`;

export const FooterLogo = styled.img`
  width: 120px;
  z-index: 0;
  align-self: center;
  height: fit-content;
  @media screen and (max-width: 768px) {
    width: 100px;
    height: fit-content;
  }
  @media screen and (max-width: 480px) {
    width: 80x;
    height: fit-content;
  }
`;

export const FooterText = styled.a`
  color: ${colours.CFIA_Font_Black};
  font-size: 0.8rem;
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
