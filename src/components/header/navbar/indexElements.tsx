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
`;

export const NavbarContainer = styled.div<{ width: number; height: number }>`
  display: flex;
  justify-content: space-between;
  height: 50px;
  z-index: 0;
  width: 100%;
  max-width: ${(props) => props.width * 0.71}px;
`;

export const NavLogo = styled.img<{ width: number }>`
  width: ${(props) => props.width * 0.13}px;
  height: fit-content;
  cover: contain;
  margin: auto;
  margin-left: 0;
  margin-right: 0;
`;
