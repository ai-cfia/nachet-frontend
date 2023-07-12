import React from 'react';
import { FooterContainer, FooterWrap, InfoSection, InfoWrap, FooterLogo } from './indexElements'

const Footer = () => {
    return (
        <FooterContainer>
            <FooterWrap>
                <InfoSection>
                    <InfoWrap>
                    </InfoWrap>
                </InfoSection>
                <FooterLogo src={require('../../../assets/CFIA_blackfont.png')} />
            </FooterWrap>
        </FooterContainer>
    )
}

export default Footer