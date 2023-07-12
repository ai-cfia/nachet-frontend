import styled from 'styled-components';
import { colours } from '../../../styles/colours';

export const FooterContainer = styled.footer`
    background-color: ${colours.CFIA_Background_White};
`

export const FooterWrap = styled.div`
    padding: 48px 24px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    max-width: 1100px;
    margin: 0 auto;
`

export const InfoSection = styled.section`
    max-width: 1100px;
    width: 100%;
`

export const InfoWrap = styled.div`
    display: flex;
    justfiy-content: space-between;
    align-items: center;
    max-width: 1100px;
    margin: auto;

    @media screen and (max-width: 820px) {
        flex-direction: column;
    }
`

export const FooterLogo = styled.img`
    width: 150px;
    height: fit-content;
    margin-left: auto;
    @media screen and (max-width: 768px) {
        width: 155px;
        height: fit-content;
    }
    @media screen and (max-width: 480px) {
        width: 120px;
        height: fit-content;
    }
`
