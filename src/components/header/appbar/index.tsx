import { AppbarWrap, AppbarContainer, AppbarHeader} from './indexElements';
import React, { useState } from 'react';

const Appbar = () => {

   return (
          <AppbarWrap>
               <AppbarContainer>
                    <AppbarHeader>Tagarno Seed Classifier</AppbarHeader>
               </AppbarContainer>
           </AppbarWrap>
   );
};

export default Appbar;