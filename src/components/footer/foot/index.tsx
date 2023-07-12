import React from 'react';
import { FooterContainer, FooterWrap, InfoSection, InfoWrap, FooterLogo } from './indexElements'

const Footer = () => {
    return (
        <FooterContainer>
            <FooterWrap>
                <InfoSection>
                    <InfoWrap>
                        <FooterLogo src={require('../../../assets/Canada_logo.png')} />
                    </InfoWrap>
                </InfoSection>
            </FooterWrap>
        </FooterContainer>
    )
}

export default Footer