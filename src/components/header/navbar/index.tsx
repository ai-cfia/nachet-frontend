import { Nav, NavbarContainer, NavLogo } from "./indexElements";
import React from "react";

const Navbar = (): JSX.Element => {
  return (
    <Nav>
      <NavbarContainer>
        <NavLogo
          src={require("../../../assets/CFIA_blackfont.png")}
          alt="CFIA Logo"
        />
      </NavbarContainer>
    </Nav>
  );
};

export default Navbar;
