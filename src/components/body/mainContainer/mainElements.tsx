import styled from 'styled-components';

export const Nav = styled.nav`
    background-color: "blue";
    height: 70px;
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
    position: sticky;
    margin-top: -70px;
    top: 0;
    z-index: 1;
    font-family: "";
    margin-bottom: 70px;
    @media screen and (max-width: 960px) {
        transition: 0.4s all ease-in-out;
    }
`;