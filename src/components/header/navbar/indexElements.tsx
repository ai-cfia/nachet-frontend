import styled from "styled-components";
import { colours } from "../../../styles/colours";

export const Nav = styled.nav<{ width: number; height: number }>`
  background-color: ${colours.CFIA_Background_White};
  color: ${colours.CFIA_Background_White};
  height: 3.5vh;
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 0;
`;

export const NavbarContainer = styled.div<{ width: number; height: number }>`
  display: flex;
  justify-content: space-between;
  height: 3.5vh;
  z-index: 0;
  width: 100%;
  padding: 0 1.5vw;
`;

export const NavLogo = styled.img<{ width: number }>`
  width: 13.5vw;
  height: fit-content;
  cover: contain;
  margin: auto;
  margin-left: 0;
  margin-right: 0;
`;
