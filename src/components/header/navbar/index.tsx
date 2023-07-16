import { Nav, NavbarContainer, NavLogo } from './indexElements';
import React, { useState, useEffect } from 'react';

const Navbar = () => {
     const [windowSize, setWindowSize] = useState(getWindowSize());

     function getWindowSize() {
          const { innerWidth, innerHeight } = window;
          return { innerWidth, innerHeight };
     }

     useEffect(() => {

          function handleWindowResize() {
               setWindowSize(getWindowSize());
          }

          window.addEventListener('resize', handleWindowResize);
          return () => {
               window.removeEventListener('resize', handleWindowResize);
          };

      }, []);
      

     return (
          <Nav>
               <NavbarContainer>
                    <NavLogo src={require('../../../assets/CFIA_blackfont.png')} alt="CFIA Logo" />
               </NavbarContainer>
           </Nav>
   );
};

export default Navbar;