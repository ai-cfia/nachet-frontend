import styled from "styled-components";
import { colours } from '../../../styles/colours';

export const TitleHeader = styled.h2`
    font-size: 1rem;
    padding: 1px;
    color: ${colours.CFIA_Font_black};
    margin-right: auto;
    margin-bottom: 5px;
    margin-top: 5px;
`

export const ControlContainer = styled.div`
    background: ${colours.CFIA_Background_White};
    color: ${colours.CFIA_Font_white};
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: start;
    width: 700px;
    height: fit-content;
    z-index: 0;
    max-width: 700px;
    max-height: fit-content;
    position: relative;
    padding: 5px 5px 5px 5px;
    border: 1px solid ${colours.CFIA_Font_black};
    border-radius: 10px;
    @media screen and (max-width: 720px) {
        width: 90%;
    }
`

export const ButtonWrap = styled.div`
    display flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
    margin-top: 5px;
    margin-bottom: 20px;
`

export const Button = styled.button`
    background: ${props => !props.disabled ? colours.CFIA_Background_Blue : colours.disabled};
    color: ${colours.CFIA_Font_white};
    pointer-events: ${props => props.disabled ? 'none' : 'auto'};
    font-size: 0.9rem;
    margin-left: 15px;
    margin-right: 15px;
    border-radius: 10px;
    padding: 0.5rem 1rem;
    align-self: center;
    align-text: center;

    &:hover {
        cursor: pointer;
    }
`