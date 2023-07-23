import styled from "styled-components";
import { colours } from "../../../styles/colours";

export const Nav = styled.nav`
  background-color: ${colours.CFIA_Background_White};
  color: ${colours.CFIA_Background_White};
  height: 50px;
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 0;
  @media screen and (max-width: 960px) {
    transition: 0.4s all ease-in-out;
  }
`;

export const NavbarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  height: 50px;
  z-index: 0;
  width: 100%;
  padding: 0 24px;
  max-width: 1700px;
`;

export const NavLogo = styled.img`
  width: 300px;
  height: fit-content;
  margin: auto;
  margin-left: 0;
  margin-right: 0;
  @media screen and (max-width: 768px) {
    width: 260px;
    height: fit-content;
  }
  @media screen and (max-width: 480px) {
    width: 230px;
    height: fit-content;
  }
`;
