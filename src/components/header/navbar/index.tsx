import { Nav, NavbarContainer, NavLogo, SmallNavLogo } from './indexElements';
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
                    {windowSize.innerWidth > 768 && <NavLogo src={require('../../../assets/CFIA_blackfont.png')} alt="CFIA Logo" />}
                    {windowSize.innerWidth <= 768 && <SmallNavLogo src={require('../../../assets/CFIA_small_black_logo.png')} alt="CFIA Logo" />}
               </NavbarContainer>
           </Nav>
   );
};

export default Navbar;