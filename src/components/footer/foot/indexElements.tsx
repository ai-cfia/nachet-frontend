import styled from 'styled-components';
import { colours } from '../../../styles/colours';

export const FooterContainer = styled.footer`
    background-color: ${colours.CFIA_White};
`

export const FooterWrap = styled.div`
    padding: 24px 24px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    max-width: 1400px;
    margin: 0 auto;
`

export const InfoSection = styled.section`
    max-width: 1400px;
    width: 100%;
    justfiy-content: space-between;
`

export const InfoWrap = styled.div`
    display: flex;
    justfiy-content: space-between;
    align-items: center;
    max-width: 1400px;
    margin: auto;

    @media screen and (max-width: 820px) {
        flex-direction: column;
    }
`

export const FooterLogo = styled.img`
    width: 350px;
    height: fit-content;
    margin-left: auto;
    @media screen and (max-width: 768px) {
        width: 250px;
        height: fit-content;
    }
    @media screen and (max-width: 480px) {
        width: 200px;
        height: fit-content;
    }
`
