import { Nav, NavbarContainer, NavLogo} from './indexElements';
import React, { useState } from 'react';

const Navbar = () => {

   return (
          <Nav>
               <NavbarContainer>
                    <NavLogo src={require('../../../assets/CFIA_white_logo.png')} alt="CFIA Logo" />
               </NavbarContainer>
           </Nav>
   );
};

export default Navbar;