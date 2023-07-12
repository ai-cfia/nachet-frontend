import styled from 'styled-components';
import { colours } from '../../../styles/colours';

export const Nav = styled.nav`
    background-color: ${colours.CFIA_Background_Blue};
    height: 60px;
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
    position: sticky;
    top: 0;
    z-index: 999;
    @media screen and (max-width: 960px) {
        transition: 0.4s all ease-in-out;
    }
`;


export const NavbarContainer = styled.div`
    display: flex;
    justify-content: space-between;
    height: 60px;
    z-index: 1;
    width: 100%;
    padding: 0 24px;
    max-width: 1100px;
`

export const NavLogo = styled.img`
    width: 400px;
    height: fit-content;
    margin: auto;
    @media screen and (max-width: 768px) {
        width: 155px;
        height: fit-content;
    }
    @media screen and (max-width: 480px) {
        width: 120px;
        height: fit-content;
    }
`