import React from 'react';
import { FooterContainer, FooterWrap, InfoSection, InfoWrap, FooterLogo, FooterText } from './indexElements'

const Footer = () => {
    return (
        <FooterContainer>
            <FooterWrap>
                <FooterText>Terms and Conditions</FooterText>
                <FooterLogo src={require('../../../assets/Canada_logo.png')} />
            </FooterWrap>
        </FooterContainer>
    )
}

export default Footer