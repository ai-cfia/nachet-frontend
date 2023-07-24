import { Nav, NavbarContainer, NavLogo } from "./indexElements";
import React from "react";

interface params {
  windowSize: {
    width: number;
    height: number;
  };
}

const Navbar: React.FC<params> = (props) => {
  return (
    <Nav width={props.windowSize.width} height={props.windowSize.height}>
      <NavbarContainer
        width={props.windowSize.width}
        height={props.windowSize.height}
      >
        <NavLogo
          src={require("../../../assets/CFIA_blackfont.png")}
          alt="CFIA Logo"
        />
      </NavbarContainer>
    </Nav>
  );
};

export default Navbar;
