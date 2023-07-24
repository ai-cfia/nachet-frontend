import styled from "styled-components";
import { colours } from "../../../styles/colours";

export const Nav = styled.nav<{ width: number; height: number }>`
  background-color: ${colours.CFIA_Background_White};
  color: ${colours.CFIA_Background_White};
  height: ${(props) => props.height * 0.035}px;
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 0;

  @media screen and (max-width: 960px) {
    height: 40px;
  }
  @media screen and (max-width: 768px) {
    height: 40px;
  }
  @media screen and (max-width: 480px) {
    height: 40px;
  }
`;

export const NavbarContainer = styled.div<{ width: number; height: number }>`
  display: flex;
  justify-content: space-between;
  height: 50px;
  z-index: 0;
  width: 100%;
  padding: 10px 10px 10px 10px;
  max-width: ${(props) => props.width * 0.71}px;

  @media screen and (max-width: 960px) {
    height: 40px;
  }
  @media screen and (max-width: 768px) {
    height: 40px;
  }
  @media screen and (max-width: 480px) {
    height: 40px;
  }
`;

export const NavLogo = styled.img<{ width: number }>`
  width: ${(props) => props.width * 0.15}px;
  height: fit-content;
  cover: contain;
  margin: auto;
  margin-left: 0;
  margin-right: 0;

  @media screen and (max-width: 960px) {
    width: 250px;
    height: fit-content;
    cover: contain;
  }
  @media screen and (max-width: 768px) {
    width: 240px;
    height: fit-content;
    cover: contain;
  }
  @media screen and (max-width: 480px) {
    width: 240px;
    height: fit-content;
    cover: contain;
  }
`;
